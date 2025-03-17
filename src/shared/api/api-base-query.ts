import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query';

const getOrgHeader = () => {
  if (process.env.NEXT_PUBLIC_IS_CLOUD_ORG === 'true') {
    return 'X-Cloud-Org-ID';
  }
  return 'X-Org-ID';
};

class HeadersService {
  headers = new Headers();

  setAuthToken(token: string) {
    this.headers.set('Authorization', `OAuth ${token}`);
  }

  setCurrentOrgId(currentOrgId: string) {
    this.headers.set(getOrgHeader(), currentOrgId);
  }

  removeCurrentOrgId() {
    this.headers.delete('X-Org-ID');
    this.headers.delete('X-Cloud-Org-ID');
  }

  addHeaders(headers: HeadersInit) {
    this.headers = HeadersService.mergeHeaders(this.headers, new Headers(headers));
  }

  static mergeHeaders(h1: Headers, h2: Headers) {
    return new Headers([...Array.from(h1), ...Array.from(h2)]);
  }
}

export const apiHeaders = new HeadersService();

export const createApiBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) =>
  retry(
    fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return HeadersService.mergeHeaders(headers, apiHeaders.headers);
      },
    }),
    {
      maxRetries: 3,
    },
  );
