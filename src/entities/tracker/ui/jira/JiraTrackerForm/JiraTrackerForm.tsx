import { Button, Form, Input, Modal } from 'antd';
import { TJiraTrackerConfig, Tracker } from 'entities/tracker/model/types';
import { getTrackerIdFromName } from 'entities/tracker/lib/getTrackerIdFromName';
import { useEffect } from 'react';
import { getTrackerNameValidator } from 'entities/tracker/lib/getTrackerNameValidator';
import styles from 'entities/tracker/ui/jira/JiraTrackerForm/JiraTrackerForm.module.scss';
import { useMessage } from 'entities/locale/lib/hooks';

export interface IJiraTrackerFormProps {
  open: boolean;
  tracker: TJiraTrackerConfig | undefined;
  existingTrackerIds: string[];
  saveTracker(nextTracker: TJiraTrackerConfig, oldTracker: TJiraTrackerConfig | undefined): void;
  onCancel(): void;
}

export const JiraTrackerForm = ({
  open,
  tracker,
  saveTracker,
  existingTrackerIds,
  onCancel,
}: IJiraTrackerFormProps) => {
  const message = useMessage();
  const [jiraForm] = Form.useForm();

  const isEditing = !!tracker;

  const onFinishJiraTracker = (values: TJiraTrackerConfig) => {
    const name = values.name.trim();
    saveTracker(
      {
        ...values,
        id: getTrackerIdFromName(name),
        name,
      },
      tracker,
    );
  };

  useEffect(() => {
    if (tracker) {
      jiraForm.setFieldsValue(tracker);
    } else {
      jiraForm.resetFields();
    }
  }, [jiraForm, tracker]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title={
        isEditing ? message('trackers.configuration.editTracker', { name: tracker.name }) : message('tracker.jira.new')
      }
    >
      <Form form={jiraForm} onFinish={onFinishJiraTracker} layout="vertical">
        <Form.Item
          name="name"
          label={message('tracker.name')}
          rules={[
            {
              required: true,
              validator: getTrackerNameValidator({
                isEditing,
                existingTrackerIds,
                trackerId: tracker?.id,
                emptyError: message('trackers.configuration.yandex.name.error.empty'),
                uniqueError: message('trackers.configuration.yandex.name.error.unique'),
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="url" label={message('tracker.url')} rules={[{ required: true, type: 'url' }]}>
          <Input placeholder="https://example.atlassian.net/" />
        </Form.Item>
        <Form.Item name="username" label={message('tracker.username')} rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="token"
          label={message('tracker.jira.token')}
          rules={[{ required: true }]}
          extra={
            <p>
              {message('tracker.jira.token.hint')}{' '}
              <a href="https://id.atlassian.com/manage-profile/security" target="_blank" rel="noreferrer noopener">
                {message('tracker.jira.token.hint.link')}
              </a>
            </p>
          }
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item hidden name="type" initialValue={Tracker.Jira}>
          <Input />
        </Form.Item>

        <div className={styles.controls}>
          <Button onClick={onCancel}>{message('share.cancel.action')}</Button>
          <Button type="primary" htmlType="submit">
            {message('share.save.action')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
