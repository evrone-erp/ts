import { AutoCompleteProps, Button } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { TTrackInputCreate } from 'entities/track/common/model/types';
import React, { FC, ReactNode } from 'react';
import { Field, FieldInputProps, Form } from 'react-final-form';

import { DateInputField } from 'features/form/ui/DateInputField';
import { InputField } from 'features/form/ui/InputField';
import { TextareaField } from 'features/form/ui/TextareaFeild';
import { FieldItem } from 'features/form/ui/FieldItem';
import { validateHumanReadableDuration } from 'entities/track/common/lib/validate-human-readable-duration';
import { TTrackerConfig } from 'entities/tracker/model/types';
import { TTrackFormCreateFields } from 'entities/track/common/ui/TrackFormCreate/types';
import { IIssueTracksProps } from 'entities/track/common/ui/IssueTracks/IssueTracks';
import styles from './TrackFormCreate.module.scss';

type TProps = {
  tracker: TTrackerConfig;
  initialValues: TTrackInputCreate;
  isTrackCreateLoading: boolean;
  createTrack(form: TTrackFormCreateFields): void;
  renderIssueTracksConnected(props: Pick<IIssueTracksProps, 'issueKey' | 'date' | 'className'>): ReactNode;
  renderIssuesSearchConnected(props: AutoCompleteProps<string> & FieldInputProps<string>): ReactNode;
};

export const TrackFormCreate: FC<TProps> = ({
  initialValues,
  tracker,
  createTrack,
  isTrackCreateLoading,
  renderIssueTracksConnected,
  renderIssuesSearchConnected,
}) => {
  const message = useMessage();

  const validate = (fields: TTrackFormCreateFields) => ({
    duration: validateHumanReadableDuration(fields.duration) ? undefined : message('form.invalid.format'),
    issueKey: fields.issueKey ? undefined : message('form.invalid.empty'),
  });

  return (
    <Form initialValues={initialValues} onSubmit={createTrack} validate={validate}>
      {({ handleSubmit, invalid, form }) => (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field<string> name="issueKey">
              {({ input: fieldInput, meta }) => {
                const error = meta.dirty ? meta.error || meta.submitError : undefined;
                return (
                  <FieldItem label={message('issue.issueKey.title')} error={error}>
                    {renderIssuesSearchConnected({
                      ...fieldInput,
                      tracker,
                      status: error ? ('error' as const) : undefined,
                      placeholder: message('issue.issueKey.placeholder'),
                    })}
                  </FieldItem>
                );
              }}
            </Field>
            <DateInputField
              name="start"
              showTime
              label={message('track.start.title')}
              placeholder={message('track.start.placeholder')}
            />
            <InputField
              name="duration"
              displayError="onlyDirty"
              displayErrorStatus="onlyDirty"
              label={message('track.duration.title')}
              placeholder={message('track.duration.placeholder')}
            />
            <TextareaField
              name="comment"
              label={message('track.comment.title')}
              placeholder={message('track.comment.placeholder')}
            />
            <div>
              <Button
                disabled={isTrackCreateLoading || invalid}
                type="primary"
                htmlType="submit"
                loading={isTrackCreateLoading}
              >
                <Message id="share.create.action" />
              </Button>
            </div>
          </form>
          {renderIssueTracksConnected({
            className: styles.tracks,
            issueKey: form.getFieldState('issueKey')?.value,
            date: form.getFieldState('start')?.value,
          })}
        </>
      )}
    </Form>
  );
};
