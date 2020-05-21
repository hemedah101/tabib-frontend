/**
 *
 * Header
 *
 */
import React from 'react';
import styled from 'styled-components/macro';

import { Layout } from 'antd';
import { history } from 'utils/history';

import LanguageHeaderDropdown from './LanguageHeaderDropdown';
import AvatarHeaderDropdown from './AvatarHeaderDropdown';
import NavMenu from './NavMenu';

interface Props {}

export function Header(props: Props) {
  return (
    <GlobalHeader>
      <Logo onClick={() => history.push('/')} />

      <NavMenu />

      <LanguageHeaderDropdown />

      <AvatarHeaderDropdown />
    </GlobalHeader>
  );
}

const GlobalHeader = styled(Layout.Header)`
  position: fixed;
  z-index: 9;
  width: 100%;
  transition: width 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.03);
`;
const Logo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;
