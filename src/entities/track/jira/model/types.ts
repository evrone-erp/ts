import { TJiraTrackerConfig, TTrackerConfig } from 'entities/tracker/model/types';
import { TTrackInputEditParam } from 'entities/track/common/model/types';

export type TJiraGetTracksParams = {
  from: string;
  to: string;
  fromTimestamp: number;
  toTimestamp: number;
  issueKeyList: string[];
  userId: string;
  tracker: TJiraTrackerConfig;

  utcOffsetInMinutes: number | undefined;
};

export type TJiraTracksResponse = {
  total: number;
  maxResults: number;
  worklogs: TJiraTrack[];
};

// https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/#nodes
interface IAnyADFBlockNode {
  type: string;
  content: (IAnyADFBlockNode | IAnyADFInlineNode)[];
  marks?: void;
  attrs?: void;
  version?: void;
}

interface IAnyADFInlineNode extends Omit<IAnyADFBlockNode, 'content' | 'version'> {
  type: string;
  text: string;
}

export interface IADFParagraphNode extends IAnyADFBlockNode {
  type: 'paragraph';
  content: (IAnyADFInlineNode | IAnyADFBlockNode)[];
}

export interface IADFParagraphTextNode extends IADFParagraphNode {
  content: IADFTextNode[];
}

interface IADFTextNode extends IAnyADFInlineNode {
  type: 'text';
  text: string;
}

export const isADFPureTextNode = (x: IAnyADFInlineNode | IAnyADFBlockNode): x is IADFTextNode =>
  'text' in x && !('marks' in x) && !('attrs' in x) && x.type === 'text';

export const isADFParagraphTextNode = (x: IAnyADFInlineNode | IAnyADFBlockNode): x is IADFParagraphTextNode =>
  !('marks' in x) &&
  !('attrs' in x) &&
  'content' in x &&
  x.type === 'paragraph' &&
  Array.isArray(x.content) &&
  x.content.every((node) => isADFPureTextNode(node));

interface IADFDocument {
  version: number;
  type: string;
  content: IAnyADFBlockNode[];
}

export type TJiraTrack = {
  id: string;
  issueId: string;
  started: string;
  timeSpentSeconds: number;
  author: {
    accountId: string;
    emailAddress: string;
  };
  comment: IADFDocument;
};

export type TJiraCreateTrackParams = {
  tracker: TTrackerConfig;
  issueKey: string;
  timeSpentSeconds: number;
  start: string;
  comment?: IADFDocument;
};

export type TJiraEditTrackParams = {
  tracker: TTrackerConfig;
  form: {
    comment?: IADFDocument;
    start?: string;
    timeSpentSeconds?: number;
  };
  param: TTrackInputEditParam;
};

export type TJiraApiError = {
  status: number;
  data: {
    errorMessages: string[];
    errors: object;
  };
};
