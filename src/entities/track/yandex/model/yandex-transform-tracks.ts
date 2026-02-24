import type { TYandexTrack } from 'entities/track/yandex/model/types';
import type { TTrack } from 'entities/track/common/model/types';

export const yandexTransformTrack = ({ id, issue, comment, start, duration }: TYandexTrack): TTrack => ({
  id,
  issueKey: issue.key,
  comment,
  start,
  duration,
});

export const yandexTransformTracks = (tracks: TYandexTrack[]): TTrack[] => tracks.map(yandexTransformTrack);
