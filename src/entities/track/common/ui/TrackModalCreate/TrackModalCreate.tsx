import { track } from 'entities/track/common/model/reducers';
import { TrackFormCreate } from 'entities/track/common/ui/TrackFormCreate';
import React, { ReactNode, useCallback } from 'react';
import { AutoCompleteProps, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useMessage } from 'entities/locale/lib/hooks';

import { selectTrackInputCreate } from 'entities/track/common/model/selectors';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { TTrackFormCreateFields } from 'entities/track/common/ui/TrackFormCreate/types';
import { IIssueTracksProps } from 'entities/track/common/ui/IssueTracks/IssueTracks';
import { FieldInputProps } from 'react-final-form';
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
