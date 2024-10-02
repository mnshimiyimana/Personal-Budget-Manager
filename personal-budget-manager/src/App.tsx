import React, { useState } from "react";
import {
  AlertOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import WelcomeMessage from "./components/Headers";
import BudgetPlanner from "./pages/BudgetPlanner";
import Alerts from "./pages/Alerts";
import Cards from "./components/Cards";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout className="font-sans min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: "sticky", top: 0, height: "100vh", zIndex: 100 }}
      >
        <div className="demo-logo-vertical font-bold" />
        <h1 className="text-white font-extrabold text-xl text-center py-4 hidden md:block ">Budgman</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Budget Planner",
              onClick: () => navigate("/budget-planner"),
            },
            {
              key: "3",
              icon: <AlertOutlined />,
              label: "Alerts",
              onClick: () => navigate("/alerts"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between items-center"
        >
          <div className="flex">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <WelcomeMessage />
          </div>
          <div className="flex items-center space-x-4 mx-10 text-lg">
            <SearchOutlined />
            <BellOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/budget-planner" element={<BudgetPlanner />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
