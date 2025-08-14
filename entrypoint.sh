#!/bin/bash

set -e

messageJiraSecret=$(cat << EOF
WARNING: Jira functionality will be limited.

To use Jira integration features, please specify JIRA_CLIENT_SECRET environment variable.
For example, "-e JIRA_CLIENT_SECRET=secret" on "docker run".
EOF
)

messageClientId=$(cat << EOF
WARNING: Yandex Tracker functionality will be limited.

To use Yandex Tracker integration features, please specify CLIENT_ID environment variable.
For example, "-e CLIENT_ID=clientid" on "docker run".
EOF
)

messageJiraClientId=$(cat << EOF
WARNING: Jira functionality will be limited.

To use Jira integration features, please specify JIRA_CLIENT_ID environment variable.
For example, "-e JIRA_CLIENT_ID=jiraclientid" on "docker run".
EOF
)

auto_config() {
  local config_file="${CONFIG_FILE:-./public/local/api/config.json}"
  local output_file="${OUTPUT_FILE:-./temp.json}"
  local missing_vars=0

  if [ -z "$JIRA_CLIENT_SECRET" ]; then
    echo "$messageJiraSecret"
    missing_vars=$((missing_vars+1))
  fi

  if [ -z "$CLIENT_ID" ]; then
    echo "$messageClientId"
    missing_vars=$((missing_vars+1))
  fi

  if [ -z "$JIRA_CLIENT_ID" ]; then
    echo "$messageJiraClientId"
    missing_vars=$((missing_vars+1))
  fi

  if [ "$missing_vars" -eq 3 ]; then
    echo "Error: All required environment variables are missing (JIRA_CLIENT_SECRET, CLIENT_ID, JIRA_CLIENT_ID). At least one of them must be provided for the application to work correctly."
    exit 1
  fi

  # Replace values in file with values from variables
  jq --arg client_id "$CLIENT_ID" --arg jira_client_id "$JIRA_CLIENT_ID" \
    '.auth.params.client_id = $client_id | .jiraAuth.params.client_id = $jira_client_id' \
    public/local/api/config.json > "$output_file"
  # Delete temporary file
  cat "$output_file" > "$config_file" && rm "$output_file"
}

auto_config

exec "$@"
