import { TTrack } from 'entities/track/common/model/types';
import { IADFParagraphTextNode, isADFParagraphTextNode, TJiraTrack } from 'entities/track/jira/model/types';
import { businessDurationDataToIso } from 'entities/track/common/lib/business-duration-data-to-iso';
import { msToBusinessDurationData } from 'entities/track/common/lib/ms-to-business-duration-data';

const getTextFromParagraph = (paragraphNode: IADFParagraphTextNode) =>
  paragraphNode.content.reduce((acc, { text }) => {
    acc += text;
    return acc;
  }, '');

export const transformJiraComment = (comment?: TJiraTrack['comment']): string | undefined => {
  if (!comment || !comment.content.every((adfNode) => isADFParagraphTextNode(adfNode))) {
    return undefined;
  }

  return comment.content
    .reduce<string[]>((acc, adfNode) => {
      acc.push(getTextFromParagraph(adfNode));
      return acc;
    }, [])
    .join('\n');
};

export const jiraTransformTrack = (
  { id, started, timeSpentSeconds, author, comment: worklogComment }: TJiraTrack,
  issueKey: string,
): TTrack => {
  const comment = transformJiraComment(worklogComment);
  const isReadOnlyComment = comment === undefined;

  return {
    id,
    issueKey,
    comment: isReadOnlyComment ? '' : comment,
    isReadOnlyComment,
    start: started,
    duration: businessDurationDataToIso(msToBusinessDurationData(timeSpentSeconds * 1000)) ?? 'PT0H',
    authorId: author.accountId,
  };
};

export const jiraTransformTracks = (tracks: TJiraTrack[], issueKey: string): TTrack[] =>
  tracks.map((track) => jiraTransformTrack(track, issueKey));
