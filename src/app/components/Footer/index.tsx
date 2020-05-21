/**
 *
 * Footer
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Layout } from 'antd';

interface Props {}

export function Footer(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();

  return <GlobalFooter>{'Tabib © 2020 Created by ABZO'}</GlobalFooter>;
}

const GlobalFooter = styled(Layout.Footer)`
  text-align: center;
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  background: none;
`;
