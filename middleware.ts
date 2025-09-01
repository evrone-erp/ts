import { NextRequest } from 'next/server';
import { jiraAuthEndpoints } from 'entities/auth/model/jira/endpoints';

/**
 * refreshes token, using Jira's OAuth API
 */
export async function middleware(request: NextRequest) {
  try {
    const { clientId, refreshToken } = await request.json();

    return await fetch(jiraAuthEndpoints.token, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: process.env.JIRA_CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
    });
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}

export const config = {
  matcher: `/jira-be/refresh`,
};
