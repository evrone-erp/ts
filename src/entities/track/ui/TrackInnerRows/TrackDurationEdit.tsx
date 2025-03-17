import { Form, Input } from 'antd';
import { durationValidationRules } from 'entities/track/lib/helpers';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { FocusEventHandler, memo, useEffect, useState } from 'react';
import { TrackCalendarSum } from 'entities/track/ui/TrackCalendarSum';
import { DURATION_EMPTY } from 'entities/track/lib/constants';
import { TTrack } from 'entities/track/model/types';
import { useUpdateTrack } from 'entities/track/model/use-update-track';
import { useISOToHumanReadableDuration } from 'entities/track/lib/hooks/use-iso-to-human-readable-duration';
import { humanReadableDurationToISO } from 'entities/track/lib/human-readable-duration-to-iso';
import styles from './TrackDurationEdit.module.scss';

interface ITrackDurationEditProps {
  issueId: string;
  trackItem: TTrack;
  isEdit?: boolean;
}

export const TrackDurationEdit = memo(({ trackItem, issueId, isEdit }: ITrackDurationEditProps) => {
  const [updateTrack] = useUpdateTrack(issueId, trackItem.id);
  const [form] = Form.useForm();
  const [durationError, setDurationError] = useState(false);
  const duration = trackItem?.duration || DURATION_EMPTY;
  const durationFormat = useISOToHumanReadableDuration(duration);

  const initialValues = {
    duration: durationFormat,
  } as const;

  useEffect(() => {
    form.setFieldValue('duration', durationFormat);
  }, [durationFormat, form]);

  const handleSubmit = (values: typeof initialValues) => {
    const durationISO = humanReadableDurationToISO(values.duration);

    if (!isEdit || !durationISO || durationISO === trackItem.duration) return;
    updateTrack({
      duration: durationISO,
    });
  };

  const submitForm = () => {
    form
      .validateFields()
      .then(handleSubmit)
      .catch((errors: ValidateErrorEntity<typeof initialValues>) => {
        const durationFieldError = errors.errorFields.find((field) => field.name.includes('duration'));
        if (durationFieldError?.errors.length) {
          setDurationError(true);
        }
      });
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    setDurationError(false);
  };

  return (
    <td className={styles.col}>
      {isEdit ? (
        <Form noValidate form={form} initialValues={initialValues}>
          <Form.Item noStyle name="duration" rules={durationValidationRules}>
            <Input
              className={styles.input}
              onBlur={submitForm}
              onPressEnter={submitForm}
              onFocus={handleFocus}
              status={durationError ? 'error' : undefined}
            />
          </Form.Item>
        </Form>
      ) : (
        <TrackCalendarSum tracksOrTrack={[trackItem]} />
      )}
    </td>
  );
});

TrackDurationEdit.displayName = 'TrackDurationEdit';
