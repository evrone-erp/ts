import { track } from 'entities/track/model/reducers';
import { TrackFormCreate } from 'entities/track/ui/TrackFormCreate';
import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useMessage } from 'entities/locale/lib/hooks';

import { selectTrackInputCreate } from 'entities/track/model/selectors';
import styles from './TrackModalCreate.module.scss';

export const TrackModalCreate = () => {
  const message = useMessage();
  const dispatch = useAppDispatch();
  const trackInput = useAppSelector(selectTrackInputCreate);

  const onTrackModalClose = useCallback(() => {
    dispatch(track.actions.setInputCreate());
  }, [dispatch]);

  if (!trackInput) return null;

  return (
    <Modal
      className={styles.modal}
      open={!!trackInput}
      title={message('track.create.title')}
      onCancel={onTrackModalClose}
      footer={null}
      width="fit-content"
    >
      <TrackFormCreate initialValues={trackInput} />
    </Modal>
  );
};
