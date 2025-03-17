import { Button } from 'antd';
import { Trash } from 'components/Icons/Trash';
import { track } from 'entities/track/common/model/reducers';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks';
import styles from './TrackDeleteButton.module.scss';

interface ITrackDeleteButtonProps {
  issueIdOrKey: string;
  trackId: number | string;
}

export const TrackDeleteButton = memo(({ issueIdOrKey, trackId }: ITrackDeleteButtonProps) => {
  const dispatch = useAppDispatch();
  const onTrackDeleteButtonClick = useCallback(() => {
    if (trackId && issueIdOrKey) {
      dispatch(
        track.actions.setInputDelete({
          issueIdOrKey,
          trackId,
        }),
      );
    }
  }, [dispatch, issueIdOrKey, trackId]);

  return (
    <Button type="text" shape="circle" className={styles.btn} onClick={onTrackDeleteButtonClick}>
      <Trash />
    </Button>
  );
});
