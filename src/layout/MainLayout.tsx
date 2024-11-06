// src/layout/MainLayout.tsx
import React, { ReactNode } from "react";
import Header from "../components/Header"; // components klasöründen import
import Footer from "../components/Footer"; // components klasöründen import

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
