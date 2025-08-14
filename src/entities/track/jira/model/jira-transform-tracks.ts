import { TTrack } from 'entities/track/common/model/types';
import { IADFParagraphNode, isADFParagraphNode, isADFTextNode, TJiraTrack } from 'entities/track/jira/model/types';
import { businessDurationDataToIso } from 'entities/track/common/lib/business-duration-data-to-iso';
import { msToBusinessDurationData } from 'entities/track/common/lib/ms-to-business-duration-data';

const getTextFromParagraph = (paragraphNode: IADFParagraphNode) =>
  paragraphNode.content.reduce((acc, { text }) => {
    acc += text;
    return acc;
  }, '');

export const transformJiraComment = (comment: TJiraTrack['comment']) => {
  // надо добавить проверку на отсутствие marks и attrs, иначе они потеряются при обновлении комментария
  if (
    'content' in comment &&
    Array.isArray(comment.content) &&
    comment.content.every((adfNode) => isADFParagraphNode(adfNode)) &&
    comment.content.every(({ content }) => content.every((adfNode) => isADFTextNode(adfNode)))
  ) {
    return comment.content.map((paragraphNode) => getTextFromParagraph(paragraphNode), '').join('\n');
  }
  return '';
};

export const jiraTransformTrack = (
  { id, started, timeSpentSeconds, author, comment: worklogComment }: TJiraTrack,
  issueKey: string,
): TTrack => {
  const comment = transformJiraComment(worklogComment);

  return {
    id,
    issueKey,
    comment,
    isReadOnlyComment: !comment,
    start: started,
    duration: businessDurationDataToIso(msToBusinessDurationData(timeSpentSeconds * 1000)) ?? 'PT0H',
    authorId: author.accountId,
  };
};

export const jiraTransformTracks = (tracks: TJiraTrack[], issueKey: string): TTrack[] =>
  tracks.map((track) => jiraTransformTrack(track, issueKey));
