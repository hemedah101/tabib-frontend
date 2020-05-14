import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Result, Button } from 'antd';

import { history } from 'utils/history';

export function NotFoundPage() {
  const backHome = (): void => history.push('/');

  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle={'Sorry, this page does not exist'}
        extra={
          <Button type="primary" onClick={backHome}>
            {'Back Home'}
          </Button>
        }
        style={{ backgroundColor: '#f0f2f5' }}
      />
    </>
  );
}
