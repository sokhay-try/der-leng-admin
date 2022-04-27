import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ collapsed }) => {
  const router = useRouter();
  const { Sider } = Layout;
  const { t } = useTranslation();
  const MENU = {
    provinces: "provinces",
  };

  const onSidebarClicked = (menu: string) => {};

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item
          className={
            router.pathname == "/provinces" ? "ant-menu-item-selected" : ""
          }
          key="1"
          icon={<UserOutlined />}
          onClick={() => onSidebarClicked(MENU.provinces)}
        >
          <Link href="/provinces">{t("provinces")}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
