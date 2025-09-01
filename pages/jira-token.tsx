import { JiraTokenPage } from 'pages/JiraToken/JiraTokenPage';
import { GetServerSideProps } from 'next';
import { jiraAuthEndpoints } from 'entities/auth/model/jira/endpoints';

type TServerSideProps = {
  token: string | null;
  tokenExpiresInSeconds: number;
  refreshToken: string | null;
  refreshTokenExpiresInDays: number;
};

/**
 * we have to send "client_secret" to jira auth API in order to get token. hence we send in on BE and not on FE - we should
 * not expose it
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { client_id, code, internal_redirect_uri } = query;

  try {
    const resp = await fetch(jiraAuthEndpoints.token, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id,
        client_secret: process.env.JIRA_CLIENT_SECRET,
        code,
        redirect_uri: internal_redirect_uri,
      }),
    });

    const data = await resp.json();

    return {
      props: {
        token: data.access_token ?? null,
        refreshToken: data.refresh_token ?? null,
        tokenExpiresInSeconds: data.expires_in ?? 0,
        // jira refresh token expires in 365 days
        // https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#how-do-i-get-a-new-access-token--if-my-access-token-expires-or-is-revoked-
        refreshTokenExpiresInDays: 365,
      } satisfies TServerSideProps,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        token: null,
        refreshToken: null,
        tokenExpiresInSeconds: 0,
        refreshTokenExpiresInDays: 0,
      } satisfies TServerSideProps,
    };
  }
};

export default (props: TServerSideProps) => <JiraTokenPage {...props} />;
