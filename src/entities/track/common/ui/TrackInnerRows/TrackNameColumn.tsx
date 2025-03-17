import { Form, Typography } from 'antd';
import { TextArea } from 'components';
import { FocusEventHandler, memo, useEffect } from 'react';
import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { TrackDeleteButton } from './TrackDeleteButton';
import styles from './TrackNameColumn.module.scss';

interface ITrackNameColumnProps {
  trackId: number | string;
  trackComment: string | undefined;
  issueId: string;
  isEdit?: boolean;
  isEditTrackComment?: boolean;
  trackCommentEditDisabledReason?: string;
  updateTrack(input: Partial<TTrackInputEditForm>, issueIdOrKey?: string, trackId?: number | string): void;
}

export const TrackNameColumn = memo(
  ({
    issueId,
    isEdit,
    isEditTrackComment,
    trackId,
    trackComment,
    updateTrack,
    trackCommentEditDisabledReason,
  }: ITrackNameColumnProps) => {
    const initialValues = {
      comment: trackComment ?? '',
    } as const;

    const [form] = Form.useForm<typeof initialValues>();

    useEffect(() => {
      form.setFieldValue('comment', trackComment);
    }, [trackComment, form]);

    const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
      e.target.select();
      e.target.spellcheck = true;
    };

    const handleSubmit = (values: typeof initialValues) => {
      if (!isEdit) return;
      updateTrack(values, issueId, trackId);
    };

    const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
      e.target.spellcheck = false;
      form.validateFields().then(handleSubmit).catch(console.error);
    };

    return (
      <td colSpan={2} className={styles.col}>
        <div>
          {isEdit ? (
            <>
              <TrackDeleteButton trackId={trackId} issueIdOrKey={issueId} />

              {isEditTrackComment ? (
                <Form noValidate className={styles.form} form={form} initialValues={initialValues}>
                  <Form.Item name="comment" noStyle>
                    <TextArea
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={styles.textarea}
                      spellCheck={false}
                      autoSize
                      readOnly={!isEdit}
                    />
                  </Form.Item>
                </Form>
              ) : (
                <Typography.Text disabled className={styles.commentEditDisabled}>
                  {trackCommentEditDisabledReason}
                </Typography.Text>
              )}
            </>
          ) : (
            <div>{initialValues.comment}</div>
          )}
        </div>
      </td>
    );
  },
);

TrackNameColumn.displayName = 'TrackNameColumn';
