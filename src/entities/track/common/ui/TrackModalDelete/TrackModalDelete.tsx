import { Message } from 'entities/locale/ui/Message';
import { track } from 'entities/track/common/model/reducers';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectTrackInputDelete } from 'entities/track/common/model/selectors';
import { Button, Modal } from 'antd';
import { TTrackInputDelete } from 'entities/track/common/model/types';

type TProps = {
  isTrackDeleteLoading: boolean;
  deleteTrack(form: TTrackInputDelete): void;
};

export const TrackModalDelete = ({ isTrackDeleteLoading, deleteTrack }: TProps) => {
  const dispatch = useAppDispatch();
  const trackInput = useAppSelector(selectTrackInputDelete);

  const onTrackModalClose = useCallback(() => {
    dispatch(track.actions.setInputDelete());
  }, [dispatch]);

  return (
    <Modal
      onCancel={onTrackModalClose}
      open={!!trackInput}
      zIndex={2000}
      title={<Message id="track.delete.title" />}
      footer={
        <>
          <Button
            disabled={isTrackDeleteLoading}
            onClick={() => trackInput && deleteTrack(trackInput)}
            danger
            type="primary"
          >
            <Message id="share.yes.action" />
          </Button>
          <Button disabled={isTrackDeleteLoading} onClick={onTrackModalClose}>
            <Message id="share.no.action" />
          </Button>
        </>
      }
    >
      <Message id="track.delete.confirm" />
    </Modal>
  );
};
