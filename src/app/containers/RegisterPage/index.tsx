/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import { useInjectSaga } from 'utils/redux-injectors';
import { registerPageSaga } from './saga';
import { sliceKey } from 'app/slice';
import { LanguageSwitch } from 'app/components/LanguageSwitch';
import RegisterForm from './RegisterForm';
import styled from 'styled-components/macro';

interface Props {}

export function RegisterPage(props: Props) {
  useInjectSaga({ key: sliceKey, saga: registerPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Register Page</title>
        <meta name="description" content="User register page" />
      </Helmet>

      <LanguageSwitch />

      <Wrapper>
        <RegisterForm />
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
