import React from 'react';
import { useSelector } from 'react-redux';

import { Button, message, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { selectAvatar } from 'app/selectors';
import styled from 'styled-components/macro';

export const AvatarView = () => {
  const avatar = useSelector(selectAvatar);
  // const OnUploadSuccess = (url: string) => {
  //   console.log({ url });
  // };

  const UploadImageToS3 = (info: any) => {
    const file = info.file;
    if (file.size > 3 * 1024 * 1024) {
      return message.error(
        `${info.file.name} size is to large. Maximum allowed size is 3 Mb`,
      );
    }

    const formData = new FormData();
    formData.append('file', file);
  };

  return (
    <>
      <Title>Profile Picture</Title>
      <Avatar>
        <Spin spinning={false}>
          <img src={avatar} alt="avatar" style={{ width: '100%' }} />
        </Spin>
      </Avatar>

      <Upload showUploadList={false} customRequest={UploadImageToS3}>
        <UpdateButton>
          <Button>
            <UploadOutlined />
            Change photo
          </Button>
        </UpdateButton>
      </Upload>
    </>
  );
};

const Title = styled.div`
  height: 22px;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 22px;
`;

const Avatar = styled.div`
  width: 144px;
  height: 144px;
  margin-bottom: 12px;
  overflow: hidden;
`;

const UpdateButton = styled.div`
  width: 144px;
  text-align: center;
`;
