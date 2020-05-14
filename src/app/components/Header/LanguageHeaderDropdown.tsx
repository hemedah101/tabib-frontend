import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';

const LanguageHeaderDropdown = () => {
  const { i18n } = useTranslation();
  const handleLanguageChange = ({ key }: ClickParam): void => {
    i18n.changeLanguage(key);
  };

  const locales = ['en', 'ar'];
  const languageLabels = {
    en: 'English',
    ar: 'العربية',
  };
  const languageIcons = {
    en: '🇺🇸',
    ar: '🇬🇪',
    // ar: '🇪🇬',
  };

  const langDropdown = (
    <LangMenu
      selectedKeys={[i18n.languages[0].split('-')[0]]}
      onClick={handleLanguageChange}
    >
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </LangMenu>
  );

  return (
    <LangDropdown
      overlay={langDropdown}
      overlayClassName="container"
      placement="bottomRight"
    >
      <Wrapper>
        <GlobalOutlined
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '16px',
          }}
        />
      </Wrapper>
    </LangDropdown>
  );
};

export default LanguageHeaderDropdown;

const LangMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
`;
const LangDropdown = styled(Dropdown)`
  float: right;
  padding: 0 12px;
  .container {
    border-radius: 4px;
    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.08),
      0 -9px 28px 0 rgba(0, 0, 0, 0.05);
  }

  @media screen and (max-width: 480px) {
    .container {
      width: 100% !important;
    }
    .container > * {
      border-radius: 0 !important;
    }
  }
`;
const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  line-height: 64px;
  vertical-align: top;
  cursor: pointer;
  > i {
    font-size: 16px !important;
    transform: none !important;
    svg {
      position: relative;
      top: -1px;
    }
  }
  &:hover {
    background: #1890ff;
    transition: all 0.3s;
  }
`;
