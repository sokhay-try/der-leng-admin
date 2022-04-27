import { Layout } from "antd";
import React, { useState } from "react";
import HeaderBar from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content } = Layout;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        {/* Header */}
        <HeaderBar collapsed={collapsed} toggle={toggle} />
        <Content
          className="site-layout-background h-screen"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
