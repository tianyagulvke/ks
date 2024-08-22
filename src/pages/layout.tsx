import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import MyHeader from '@/pages/components/header';
import { useSelector } from 'react-redux';

import Aside from '@/pages/components/aside';
const { Content } = Layout;

const MyLayout = () => {
  // const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const Collapsed = useSelector((state: any) => state.tab.isCollapse);
  return (
    <Layout className="main-container">
      <Aside Collapsed={Collapsed} />
      <Layout>
        {/* collapsed={collapsed} setCollapsed={setCollapsed} */}
        <MyHeader Collapsed={Collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;
