import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, DatePicker, Radio } from 'antd';

import { selectLoading } from 'app/selectors';
import { actions } from 'app/slice';
import { RegisterParams } from './types';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const onFinish = (values: any) => {
    const { confirmPassword, birthDay, ...rest } = values;
    const dateOfBirth = new Date(birthDay).toISOString();
    const body = { dateOfBirth, ...rest } as RegisterParams;

    dispatch(actions.registerUser(body));
  };

  return (
    <Form form={form} name="login" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input placeholder="Full Name" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
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

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Password is required!' }]}
      >
        <Input.Password placeholder="Password" size="large" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
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

      <Form.Item
        name="birthDay"
        rules={[{ required: true, message: 'Please select your birthDay!' }]}
      >
        <DatePicker placeholder="Date of Birth" size="large" />
      </Form.Item>

      <Form.Item
        name="gender"
        rules={[{ required: true, message: 'Please select your gender!' }]}
      >
        <Radio.Group size="large">
          <Radio value="MALE">Male</Radio>
          <Radio value="FEMALE">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <RegisterButton
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
        >
          Register
        </RegisterButton>
        <LoginLink to="/auth/login">Already have an account?</LoginLink>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

const LoginLink = styled(Link)`
  float: right;
  line-height: 40px;
  font-size: 16px;
`;
const RegisterButton = styled(Button)`
  width: 40%;
`;
