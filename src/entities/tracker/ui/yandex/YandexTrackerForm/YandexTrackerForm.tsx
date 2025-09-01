import { Button, Form, Input, Modal, Select } from 'antd';
import { Tracker, TYandexTrackerConfig } from 'entities/tracker/model/types';
import { getTrackerIdFromName } from 'entities/tracker/lib/getTrackerIdFromName';
import { useEffect } from 'react';
import { getTrackerNameValidator } from 'entities/tracker/lib/getTrackerNameValidator';
import styles from 'entities/tracker/ui/yandex/YandexTrackerForm/YandexTrackerForm.module.scss';
import { useMessage } from 'entities/locale/lib/hooks';

export interface IYandexTrackerFormProps {
  open: boolean;
  tracker: TYandexTrackerConfig | undefined;
  existingTrackerIds: string[];
  saveTracker(nextTracker: TYandexTrackerConfig, oldTracker: TYandexTrackerConfig | undefined): void;
  onCancel(): void;
}

export const YandexTrackerForm = ({
  open,
  tracker,
  saveTracker,
  existingTrackerIds,
  onCancel,
}: IYandexTrackerFormProps) => {
  const message = useMessage();
  const [yandexForm] = Form.useForm();

  const isEditing = !!tracker;

  const onFinishYandexTracker = (values: TYandexTrackerConfig) => {
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
      yandexForm.setFieldsValue(tracker);
    } else {
      yandexForm.resetFields();
    }
  }, [tracker, yandexForm]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title={
        isEditing
          ? message('trackers.configuration.editTracker', { name: tracker.name })
          : message('tracker.yandex.new')
      }
    >
      <Form form={yandexForm} onFinish={onFinishYandexTracker} layout="vertical">
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
        <Form.Item name="username" label={message('tracker.username')} rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="orgId"
          label={message('tracker.yandex.orgId')}
          rules={[{ required: true, whitespace: true }]}
          extra={
            <p>
              {message('tracker.yandex.orgId.hint')}{' '}
              <a href="https://tracker.yandex.ru/admin/orgs" target="_blank" rel="noreferrer noopener">
                {message('tracker.yandex.orgId.hint.link')}
              </a>
            </p>
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isCloud"
          label={message('tracker.yandex.orgType')}
          initialValue={false}
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { value: false, label: message('tracker.yandex.orgType.360.name') },
              { value: true, label: message('tracker.yandex.orgType.cloud.name') },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="url"
          label={message('tracker.url')}
          initialValue="https://tracker.yandex.ru/"
          rules={[{ required: true, type: 'url' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item hidden name="type" initialValue={Tracker.Yandex}>
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
