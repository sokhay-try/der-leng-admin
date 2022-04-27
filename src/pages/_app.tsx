import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "../utils/i18n";

import MainLayout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <MainLayout>
      <AnyComponent {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
