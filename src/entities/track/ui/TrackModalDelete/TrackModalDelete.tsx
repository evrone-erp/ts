import { Message } from 'entities/locale/ui/Message';
import { track } from 'entities/track/model/reducers';
import { useDeleteTrack } from 'entities/track/model/use-delete-track';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectTrackInputDelete } from 'entities/track/model/selectors';
import { Button, Modal } from 'antd';

export const TrackModalDelete = () => {
  const dispatch = useAppDispatch();
  const trackInput = useAppSelector(selectTrackInputDelete);

  const { isLoading, onDeleteButtonClick } = useDeleteTrack(trackInput);

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
          <Button disabled={isLoading} onClick={onDeleteButtonClick} danger type="primary">
            <Message id="share.yes.action" />
          </Button>
          <Button disabled={isLoading} onClick={onTrackModalClose}>
            <Message id="share.no.action" />
          </Button>
        </>
      }
    >
      <Message id="track.delete.confirm" />
    </Modal>
  );
};
