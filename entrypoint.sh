#!/bin/bash

set -e

message=$(cat << EOF
Error starting container. Missing one environment variables.

You must specify CLIENT_ID to a non-empty value.
For example, "-e CLIENT_ID=clientid" on "docker run".
EOF
)

auto_config() {
  local config_file="${CONFIG_FILE:-./public/local/api/config.json}"
  local output_file="${OUTPUT_FILE:-./temp.json}"

  defined_envs=$(printf '${%s} ' $(env | cut -d= -f1))

  ## Checking for the presence of required variables
  [ -z "$CLIENT_ID" ] && echo "$message" && exit 1

  # Replace values in file with values from variables
  jq --arg client_id "$CLIENT_ID" \
    '.auth.params.client_id = $client_id' \
    public/local/api/config.json > "$output_file"
  # Delete temporary file
  cat "$output_file" > "$config_file" && rm "$output_file"
}

auto_config

exec "$@"
