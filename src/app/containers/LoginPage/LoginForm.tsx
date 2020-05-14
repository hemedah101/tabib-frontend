import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { LoginParams } from './types';
import { selectLoading } from 'app/selectors';
import { actions } from 'app/slice';

const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const onFinish = (values: any) => {
    const body = values as LoginParams;
    dispatch(actions.loginUser(body));
  };

  return (
    <Form form={form} name="login" onFinish={onFinish}>
      <Form.Item
        name="email"
        validateTrigger={false}
        rules={[
          { required: true, message: 'Email is required!' },
          {
            pattern: RegExp(/\S+@\S+\.\S+/),
            message: 'Please input a valid email!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Password is required!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item valuePropName="checked" noStyle>
          <Checkbox defaultChecked>Remember me</Checkbox>
        </Form.Item>

        <ForgotLink to="/user/forgot">Forgot password</ForgotLink>
      </Form.Item>

      <Form.Item>
        <LoginButton
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
        >
          Log in
        </LoginButton>
        Or <RegisterLink to="/auth/register">register now!</RegisterLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

const ForgotLink = styled(Link)`
  float: right;
`;
const LoginButton = styled(Button)`
  width: 100%;
`;
const RegisterLink = styled(Link)`
  font-size: 16px;
`;
