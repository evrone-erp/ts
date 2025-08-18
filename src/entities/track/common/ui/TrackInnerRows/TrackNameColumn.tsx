import { Form } from 'antd';
import { TextArea } from 'components';
import { FocusEventHandler, memo, useEffect } from 'react';
import { TTrackInputEditForm } from 'entities/track/common/model/types';
import { useMessage } from 'entities/locale/lib/hooks';
import { TrackDeleteButton } from './TrackDeleteButton';
import styles from './TrackNameColumn.module.scss';

interface ITrackNameColumnProps {
  trackId: number | string;
  trackComment: string | undefined;
  issueId: string;
  issueUrl: string;
  isEdit?: boolean;
  isReadOnlyComment?: boolean;
  updateTrack(
    input: Partial<TTrackInputEditForm>,
    issueIdOrKey?: string,
    trackId?: number | string,
  ): Promise<string> | void;
}

export const TrackNameColumn = memo(
  ({ issueId, isEdit, isReadOnlyComment, trackId, trackComment, updateTrack, issueUrl }: ITrackNameColumnProps) => {
    const message = useMessage();
    const initialValues = {
      comment: trackComment ?? '',
    } as const;

    const commentUrl = `${issueUrl}?focusedWorklogId=${trackId}`;

    const [form] = Form.useForm<typeof initialValues>();

    useEffect(() => {
      form.setFieldValue('comment', trackComment);
    }, [trackComment, form]);

    const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
      e.target.select();
      e.target.spellcheck = true;
    };

    const handleSubmit = async (values: typeof initialValues) => {
      if (!isEdit) return undefined;
      return updateTrack(values, issueId, trackId);
    };

    const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
      e.target.spellcheck = false;
      form
        .validateFields()
        .then(handleSubmit)
        .catch((err) => {
          form.setFields([{ name: ['comment'], errors: [err.message] }]);
        });
    };

    return (
      <td colSpan={2} className={styles.col}>
        <div>
          {isEdit ? (
            <>
              <TrackDeleteButton trackId={trackId} issueIdOrKey={issueId} />
              <Form className={styles.form} form={form} initialValues={initialValues}>
                {isReadOnlyComment ? (
                  <a href={commentUrl} target="_blank" rel="noopener noreferrer">
                    {message('tracker.jira.comment.link')}
                  </a>
                ) : (
                  <Form.Item name="comment" className={styles.formItem}>
                    <TextArea
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={styles.textarea}
                      spellCheck={false}
                      autoSize
                      readOnly={!isEdit}
                    />
                  </Form.Item>
                )}
              </Form>
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
