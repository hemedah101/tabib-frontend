import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Menu, Dropdown, Avatar } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';

import { selectName, selectAvatar } from 'app/selectors';
import { history } from 'utils/history';
import { logout } from 'utils/auth/inMemory';

const AvatarHeaderDropdown = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);

  const onMenuClick = async (event: ClickParam): Promise<void> => {
    const { key } = event;
    key === 'logout' ? await logout() : history.push(key);
  };

  const avatarMenu = (
    <AvatarMenu selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="account">
        <UserOutlined />
        Account
      </Menu.Item>

      <Menu.Item key="support">
        <SettingOutlined />
        Support
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </AvatarMenu>
  );

  return (
    <AvatarDropdown
      overlay={avatarMenu}
      overlayClassName="container"
      placement="bottomRight"
    >
      <Wrapper>
        <AvatarWrapper size="small" alt="avatar" src={avatar} />
        <span style={{ marginLeft: '8px' }}>{name}</span>
      </Wrapper>
    </AvatarDropdown>
  );
};

export default AvatarHeaderDropdown;

const AvatarDropdown = styled(Dropdown)`
  .container {
    border-radius: 4px;
    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.08),
      0 -9px 28px 0 rgba(0, 0, 0, 0.05);
  }
  &:hover {
    background: #1890ff;
    transition: all 0.3s;
  }
`;
const AvatarMenu = styled(Menu)`
  min-width: 160px;
`;
const Wrapper = styled.span`
  float: right;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;
  vertical-align: middle;
`;
const AvatarWrapper = styled(Avatar)`
  vertical-align: top;
  background: rgba(255, 255, 255, 0.85);
`;
