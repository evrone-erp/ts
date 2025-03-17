import { Button } from 'antd';
import { useMessage } from 'entities/locale/lib/hooks';
import { Message } from 'entities/locale/ui/Message';
import { useCreateTrack } from 'entities/track/model/use-create-track';
import { TCreateTrackParams, TTrackInputCreate } from 'entities/track/model/types';
import React, { FC } from 'react';
import { IssuesSearch } from 'entities/issue/ui/IssuesSearch';
import { IssueTracks } from 'entities/track/ui/IssueTracks';
import { Field, Form } from 'react-final-form';

import { DateInputField } from 'features/form/ui/DateInputField';
import { InputField } from 'features/form/ui/InputField';
import { TextareaField } from 'features/form/ui/TextareaFeild';
import { FieldItem } from 'features/form/ui/FieldItem';
import { validateHumanReadableDuration } from 'entities/track/lib/validate-human-readable-duration';
import styles from './TrackFormCreate.module.scss';

type TProps = {
  initialValues: TTrackInputCreate;
};

export const TrackFormCreate: FC<TProps> = ({ initialValues }) => {
  const message = useMessage();

  const { isLoading, onTrackFormCreateSubmit } = useCreateTrack();

  const validate = (fields: TCreateTrackParams) => ({
    duration: validateHumanReadableDuration(fields.duration) ? undefined : message('form.invalid.format'),
    issueKey: fields.issueKey ? undefined : message('form.invalid.empty'),
  });

  return (
    <Form initialValues={initialValues} onSubmit={onTrackFormCreateSubmit} validate={validate}>
      {({ handleSubmit, invalid, form }) => (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field<string> name="issueKey">
              {({ input: fieldInput, meta }) => {
                const error = meta.dirty ? meta.error || meta.submitError : undefined;
                return (
                  <FieldItem label={message('issue.issueKey.title')} error={error}>
                    <IssuesSearch
                      {...fieldInput}
                      status={error ? ('error' as const) : undefined}
                      placeholder={message('issue.issueKey.placeholder')}
                    />
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
              <Button disabled={isLoading || invalid} type="primary" htmlType="submit" loading={isLoading}>
                <Message id="share.create.action" />
              </Button>
            </div>
          </form>
          <IssueTracks
            className={styles.tracks}
            issueKey={form.getFieldState('issueKey')?.value}
            date={form.getFieldState('start')?.value}
          />
        </>
      )}
    </Form>
  );
};
