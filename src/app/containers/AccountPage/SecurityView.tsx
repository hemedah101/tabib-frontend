import React from 'react';

import { List } from 'antd';

import ModifyModal from './ModifyModal';

const SecurityView = () => {
  const data = [
    {
      title: 'Primary Email',
      description: <>{'Change your primary email'}</>,
      actions: [<ModifyModal title="Change Primary Email" type="email" />],
    },
    {
      title: 'Account Password',
      description: <>{'Change your password'}</>,
      actions: [<ModifyModal title="Change Password" type="password" />],
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default SecurityView;
