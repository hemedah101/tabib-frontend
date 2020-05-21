import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SmileOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { history } from 'utils/history';

const NavMenu = () => {
  const currentKey = history.location.pathname;

  return (
    <MenuWrapper
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[currentKey]}
    >
      <Menu.SubMenu title="Dashboard" icon={<DashboardOutlined />}>
        <Menu.Item key="/account/analysis" icon={<SmileOutlined />}>
          Analysis
        </Menu.Item>
        <Menu.Item key="/account/monitor" icon={<SmileOutlined />}>
          Monitor
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="/" icon={<HomeOutlined />}>
        <span>Home</span>
        <Link to="/" />
      </Menu.Item>

      <Menu.SubMenu title="Account" icon={<UserOutlined />}>
        <Menu.Item key="/account/settings" icon={<SmileOutlined />}>
          <span>Account Settings</span>
          <Link to="/account/settings" />
        </Menu.Item>
        {/* <Menu.Item key="/account/profile" icon={<SmileOutlined />}>
          Account Profile
        </Menu.Item> */}
      </Menu.SubMenu>
    </MenuWrapper>
  );
};

export default NavMenu;

const MenuWrapper = styled(Menu)`
  display: inline-block;
`;
