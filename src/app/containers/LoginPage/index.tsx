/**
 *
 * LoginPage
 *
 */

import React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useInjectSaga } from 'redux-injectors';

import { sliceKey } from 'app/slice';
import { loginPageSaga } from './saga';

import { LanguageSwitch } from './LanguageSwitch';
import LoginForm from './LoginForm';

interface Props {}

export function LoginPage(props: Props) {
  useInjectSaga({ key: sliceKey, saga: loginPageSaga });

  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta name="description" content="Login page to access the website" />
      </Helmet>

      <LanguageSwitch />

      <Wrapper>
        <LoginForm />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 96px 0 24px;
  width: 368px;

  @media screen and (max-width: 576px) {
    width: 95%;
  }

  .site-form-item-icon {
    color: rgb(24, 144, 255);
  }
`;
