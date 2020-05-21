import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Form, Input, DatePicker, Radio, Select } from 'antd';

import { SanitizeFromSubmission } from 'utils/form/sanitize';
import { selectUser } from 'app/selectors';
import { AvatarView } from './AvatarView';
import { actions } from 'app/slice';
import { CapitalizeFirstLetter } from 'utils/form/capitalize';

export const PersonalView = () => {
  const [form] = Form.useForm();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (values.dateOfBirth) {
      values.dateOfBirth = new Date(values.dateOfBirth).toISOString();
    }

    if (values.relationship) {
      values.relationship = values.relationship.toUpperCase();
    }

    const updates = SanitizeFromSubmission(values, user);
    dispatch(actions.updateUser(updates));
  };

  const relationshipStatus = [
    'Single',
    'Engaged',
    'Married',
    'Divorced',
    'Widowed',
  ];

  return (
    <Wrapper>
      <LeftContent>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          hideRequiredMark
          initialValues={{
            ...user,
            relationship: CapitalizeFirstLetter(user.relationship || ''),
          }}
        >
          <Form.Item name="name" label="Full Name">
            <Input />
          </Form.Item>

          <Form.Item name="dateOfBirth" label="Date of Birth">
            <DatePicker />
          </Form.Item>

          <Form.Item name="gender">
            <Radio.Group size="large">
              <Radio value="MALE">Male</Radio>
              <Radio value="FEMALE">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="relationship" label="Relationship">
            <Select>
              {relationshipStatus.map(status => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="job" label="Current Job">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Update Information
            </Button>
          </Form.Item>
        </Form>
      </LeftContent>
      <RightContent>
        <AvatarView />
      </RightContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding-top: 12px;
  width: 100%;
`;

const LeftContent = styled.div`
  min-width: 310px;
  max-width: 310px;
`;
const RightContent = styled.div`
  flex: 1;
  padding-left: 104px;
`;
