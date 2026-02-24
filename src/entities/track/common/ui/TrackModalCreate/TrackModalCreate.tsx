import { track } from 'entities/track/common/model/reducers';
import { TrackFormCreate } from 'entities/track/common/ui/TrackFormCreate';
import type { ReactNode } from 'react';
import React, { useCallback } from 'react';
import type { AutoCompleteProps } from 'antd';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useMessage } from 'entities/locale/lib/hooks';

import { selectTrackInputCreate } from 'entities/track/common/model/selectors';
import type { TTrackerConfig } from 'entities/tracker/model/types';
import type { TTrackFormCreateFields } from 'entities/track/common/ui/TrackFormCreate/types';
import type { IIssueTracksProps } from 'entities/track/common/ui/IssueTracks/IssueTracks';
import type { FieldInputProps } from 'react-final-form';
import styles from './TrackModalCreate.module.scss';

type TProps = {
  tracker: TTrackerConfig;
  isTrackCreateLoading: boolean;
  createTrack(form: TTrackFormCreateFields): void;
  renderIssueTracksConnected(props: Pick<IIssueTracksProps, 'issueKey' | 'date' | 'className'>): ReactNode;
  renderIssuesSearchConnected(props: AutoCompleteProps<string> & FieldInputProps<string>): ReactNode;
};

export const TrackModalCreate = ({
  tracker,
  createTrack,
  isTrackCreateLoading,
  renderIssueTracksConnected,
  renderIssuesSearchConnected,
}: TProps) => {
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
      <TrackFormCreate
        tracker={tracker}
        initialValues={trackInput}
        createTrack={createTrack}
        isTrackCreateLoading={isTrackCreateLoading}
        renderIssueTracksConnected={renderIssueTracksConnected}
        renderIssuesSearchConnected={renderIssuesSearchConnected}
      />
    </Modal>
  );
};
