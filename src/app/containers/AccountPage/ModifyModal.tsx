import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Modal, Form, Input } from 'antd';

import { SanitizeFromSubmission } from 'utils/form/sanitize';
import { selectUser, selectLoading } from 'app/selectors';

interface Props {
  title: string;
  type: string;
}

const ModifyModal = (props: Props) => {
  const [form] = Form.useForm();
  const [visible, showModal] = React.useState<boolean>(false);

  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const toggle = () => {
    showModal(!visible);
  };

  const onFinish = (values: any) => {
    const { confirmPassword, ...rest } = values;
    const updates = SanitizeFromSubmission(rest, user);
    console.log(updates);
  };
  const onModalOk = () => {
    form
      .validateFields()
      .then(values => onFinish(values))
      .catch(); //set loading false
  };

  return (
    <>
      <Button type="link" key="modify" onClick={toggle}>
        Modify
      </Button>

      <Modal
        title={props.title}
        okText="Update"
        onOk={onModalOk}
        onCancel={toggle}
        visible={visible}
        confirmLoading={loading}
      >
        <Form form={form} name="modify form" layout="vertical" hideRequiredMark>
          {props.type === 'email' ? (
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[
                { required: true, message: 'Email is required!' },
                {
                  pattern: RegExp(/\S+@\S+\.\S+/),
                  message: 'Please input a valid email!',
                },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
          ) : (
            <Form.Item>
              <Form.Item
                name="password"
                label="New Password"
                rules={[{ required: true, message: 'Password is required!' }]}
              >
                <Input.Password placeholder="New Password" size="large" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" size="large" />
              </Form.Item>
            </Form.Item>
          )}

          <Form.Item
            name="oldPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Password is required!' }]}
          >
            <Input.Password placeholder="Current Password" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModifyModal;
