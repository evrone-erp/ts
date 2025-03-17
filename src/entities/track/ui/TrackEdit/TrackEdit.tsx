import { Spin } from 'antd';
import React from 'react';
import { Form } from 'react-final-form';
import { FormApi } from 'final-form';
import { TTrack, TTrackInputEditForm } from 'entities/track/model/types';
import { InputField } from 'features/form/ui/InputField';
import { useMessage } from 'entities/locale/lib/hooks';
import { useISOToHumanReadableDuration } from 'entities/track/lib/hooks/use-iso-to-human-readable-duration';
import { DateInputField } from 'features/form/ui/DateInputField';
import { validateHumanReadableDuration } from 'entities/track/lib/validate-human-readable-duration';
import { humanReadableDurationToISO } from 'entities/track/lib/human-readable-duration-to-iso';
import { TrackDeleteButton } from 'entities/track/ui/TrackInnerRows/TrackDeleteButton';
import { useUpdateTrack } from 'entities/track/model/use-update-track';

export interface ITrackEditProps {
  track: TTrack;
  issueKey: string;
  className?: string;
  spinnerClassName?(isLoading: boolean): string;
}

export const TrackEdit = ({ track, issueKey, className, spinnerClassName }: ITrackEditProps) => {
  const { duration, comment, start, id: trackId } = track;
  const message = useMessage();

  const durationFormat = useISOToHumanReadableDuration(duration);

  const [updateTrack, { isLoading }] = useUpdateTrack(issueKey, trackId);

  const initialValues = {
    duration: durationFormat,
    comment,
    start,
  };

  const validate = (fields: TTrackInputEditForm) => ({
    duration: validateHumanReadableDuration(fields.duration) ? undefined : message('form.invalid.format'),
  });

  const submit = (fields: TTrackInputEditForm, formApi: FormApi<TTrackInputEditForm, typeof initialValues>) => {
    const durationISO = humanReadableDurationToISO(fields.duration);

    const formHadChanges = formApi.getState().dirty;

    if (durationISO && formHadChanges) {
      updateTrack({
        start: fields.start,
        comment: fields.comment?.trim(),
        duration: durationISO,
      });
    }
  };

  return (
    <Form onSubmit={submit} initialValues={initialValues} validate={validate}>
      {({ handleSubmit }) => (
        <form className={className}>
          <DateInputField
            disabled={isLoading}
            name="start"
            onChange={handleSubmit}
            showTime
            placeholder={message('track.start.placeholder')}
          />
          <InputField
            disabled={isLoading}
            displayError={false}
            name="duration"
            onBlur={handleSubmit}
            onPressEnter={handleSubmit}
            placeholder={message('track.duration.placeholder')}
          />
          <InputField
            disabled={isLoading}
            name="comment"
            onBlur={handleSubmit}
            onPressEnter={handleSubmit}
            placeholder={message('track.comment.placeholder')}
          />
          <TrackDeleteButton issueIdOrKey={issueKey} trackId={trackId} />
          <Spin size="small" spinning className={spinnerClassName?.(isLoading)} />
        </form>
      )}
    </Form>
  );
};
