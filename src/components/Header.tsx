import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ChangeLanguage from "./ChangeLanguage";

interface IProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderBar = (props: IProps) => {
  const { collapsed, toggle } = props;
  const { Header } = Layout;
  return (
    <Header className="site-layout-background components-layout-demo-custom-trigger flex justify-between">
      <div>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
      </div>
      <div>
        <ChangeLanguage />
      </div>
    </Header>
  );
};

export default HeaderBar;
