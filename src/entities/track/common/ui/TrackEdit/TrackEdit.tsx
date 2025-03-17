import { Spin } from 'antd';
import React from 'react';
import { Form } from 'react-final-form';
import { FormApi } from 'final-form';
import { TTrack, TTrackInputEditForm } from 'entities/track/common/model/types';
import { InputField } from 'features/form/ui/InputField';
import { useMessage } from 'entities/locale/lib/hooks';
import { useISOToHumanReadableDuration } from 'entities/track/common/lib/hooks/use-iso-to-human-readable-duration';
import { DateInputField } from 'features/form/ui/DateInputField';
import { validateHumanReadableDuration } from 'entities/track/common/lib/validate-human-readable-duration';
import { humanReadableDurationToISO } from 'entities/track/common/lib/human-readable-duration-to-iso';
import { TrackDeleteButton } from 'entities/track/common/ui/TrackInnerRows/TrackDeleteButton';

export interface ITrackEditProps {
  track: TTrack;
  issueKey: string;
  isTrackUpdateLoading: boolean;
  isEditTrackComment: boolean;
  className?: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
  spinnerClassName?(isLoading: boolean): string;
}

export const TrackEdit = ({
  track,
  issueKey,
  className,
  spinnerClassName,
  updateTrack,
  isTrackUpdateLoading,
  isEditTrackComment,
}: ITrackEditProps) => {
  const { duration, comment, start, id: trackId } = track;
  const message = useMessage();

  const durationFormat = useISOToHumanReadableDuration(duration);

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
      updateTrack(
        {
          start: fields.start,
          comment: fields.comment?.trim(),
          duration: durationISO,
        },
        issueKey,
        trackId,
      );
    }
  };

  return (
    <Form onSubmit={submit} initialValues={initialValues} validate={validate}>
      {({ handleSubmit }) => (
        <form className={className}>
          <DateInputField
            disabled={isTrackUpdateLoading}
            name="start"
            onChange={handleSubmit}
            showTime
            placeholder={message('track.start.placeholder')}
          />
          <InputField
            disabled={isTrackUpdateLoading}
            displayError={false}
            name="duration"
            onBlur={handleSubmit}
            onPressEnter={handleSubmit}
            placeholder={message('track.duration.placeholder')}
          />
          <InputField
            disabled={isTrackUpdateLoading || !isEditTrackComment}
            name="comment"
            onBlur={handleSubmit}
            onPressEnter={handleSubmit}
            placeholder={isEditTrackComment ? message('track.comment.placeholder') : undefined}
          />
          <TrackDeleteButton issueIdOrKey={issueKey} trackId={trackId} />
          <Spin size="small" spinning className={spinnerClassName?.(isTrackUpdateLoading)} />
        </form>
      )}
    </Form>
  );
};
