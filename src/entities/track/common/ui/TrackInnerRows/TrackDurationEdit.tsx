import { Form, Input } from 'antd';
import { durationValidationRules } from 'entities/track/common/lib/helpers';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { FocusEventHandler, memo, useEffect, useState } from 'react';
import { TrackCalendarSum } from 'entities/track/common/ui/TrackCalendarSum';
import { DURATION_EMPTY } from 'entities/track/common/lib/constants';
import { TTrack, TTrackInputEditForm } from 'entities/track/common/model/types';
import { useISOToHumanReadableDuration } from 'entities/track/common/lib/hooks/use-iso-to-human-readable-duration';
import { humanReadableDurationToISO } from 'entities/track/common/lib/human-readable-duration-to-iso';
import styles from './TrackDurationEdit.module.scss';

interface ITrackDurationEditProps {
  issueId: string;
  trackItem: TTrack;
  isEdit?: boolean;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const TrackDurationEdit = memo(({ trackItem, issueId, isEdit, updateTrack }: ITrackDurationEditProps) => {
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
    updateTrack(
      {
        duration: durationISO,
      },
      issueId,
      trackItem.id,
    );
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
