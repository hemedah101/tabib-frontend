/**
 *
 * AccountPage
 *
 */

import React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from 'antd';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectAccountPage } from './selectors';
import { accountPageSaga } from './saga';

import { PersonalView } from './PersonalView';
import SecurityView from './SecurityView';

interface Props {}

export function AccountPage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: accountPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const accountPage = useSelector(selectAccountPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const [selectKey, setSelectKey] = React.useState<string>('personal');

  const GetRightTitle = () => {
    switch (selectKey) {
      case 'personal':
        return 'Personal Information';
      case 'history':
        return 'Medical History';
      case 'security':
        return 'Security Settings';
    }
  };

  const RenderContent = () => {
    switch (selectKey) {
      case 'personal':
        return <PersonalView />;
      case 'history':
        return <>{GetRightTitle()}</>;
      case 'security':
        return <SecurityView />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Account Page</title>
        <meta name="description" content="User information Page" />
      </Helmet>

      <PageWrapper>
        <SideMenu>
          <Menu
            mode="inline"
            selectedKeys={[selectKey]}
            onClick={({ key }) => setSelectKey(key)}
          >
            <Menu.Item key="personal">{'Personal Information'}</Menu.Item>
            <Menu.Item key="history">{'Medical History'}</Menu.Item>
            <Menu.Item key="security">{'Security Settings'}</Menu.Item>
          </Menu>
        </SideMenu>
        <Content>
          <Title>{GetRightTitle()}</Title>
          {RenderContent()}
        </Content>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  transition: 0.3s;

  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: auto;
  background-color: #fff;
`;

const SideMenu = styled.div`
  width: 224px;
  border-right: 1px solid #f0f0f0;
  padding-bottom: 14px;
  /* border-bottom: 1px solid #f0f0f0; */
`;

const Content = styled.div`
  flex: 1;
  padding-top: 8px;
  padding-right: 40px;
  padding-bottom: 8px;
  padding-left: 40px;
`;

const Title = styled.div`
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;
