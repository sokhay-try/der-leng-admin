import { useState } from "react";
import { Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation();

  const onChangeLangClick = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const changeLang = (
    <Menu onClick={onChangeLangClick}>
      <Menu.Item key="zh">
        <div className="flex items-center">
          <Image
            src="/images/china-flag.svg"
            alt="chinese"
            width="20"
            height="20"
          />
          <span style={{ color: "black", margin: 5 }}>Chinese</span>
        </div>
      </Menu.Item>
      <Menu.Item key="en">
        <div className="flex items-center">
          <Image
            src="/images/english-flag.svg"
            width="20"
            height="20"
            alt="english"
          />
          <span style={{ color: "black", margin: 5 }}>English</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={changeLang}>
        <Button
          type="text"
          className="ant-dropdown-link text-black"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex justify-center items-center">
            <span className="mr-1">{t("selected_language")}</span>
            <DownOutlined />
          </div>
        </Button>
      </Dropdown>
    </>
  );
}
