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

interface IAnyADFBlockNode {
  [key: string]: unknown;
  type: string;
  content: (IAnyADFBlockNode | IAnyADFInlineNode)[];
}

interface IAnyADFInlineNode {
  [key: string]: unknown;
  type: string;
  text: string;
}

export interface IADFParagraphNode extends IAnyADFBlockNode {
  type: 'paragraph';
}

interface IADFTextNode extends IAnyADFInlineNode {
  type: 'text';
  text: string;
}

export const isADFTextNode = (x: IAnyADFInlineNode | IAnyADFBlockNode): x is IADFTextNode =>
  'text' in x && x.type === 'text';
export const isADFParagraphNode = (x: IAnyADFInlineNode | IAnyADFBlockNode): x is IADFParagraphNode =>
  'content' in x && x.type === 'paragraph';

interface IADFDocument {
  version: 1;
  type: 'doc';
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
