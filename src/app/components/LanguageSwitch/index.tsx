import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import { LanguageKeys } from 'locales/i18n';

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: any) => {
    const language = event.target.value as LanguageKeys;
    i18n.changeLanguage(language);
  };

  return (
    <Switch
      onChange={handleLanguageChange}
      defaultValue={i18n.languages[0].split('-')[0]}
    >
      <Radio value="en">English</Radio>
      <Radio value="ar">العربية</Radio>
    </Switch>
  );
}

const Switch = styled(Radio.Group)`
  float: right;
`;
