import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Badge, Flex, Layout, Menu, theme, Space, Dropdown, Avatar } from "antd";
import Icon, { BellFilled } from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import Home from "../components/icons/Home";
import UserIcon from "../components/icons/UserIcon";
import FoodIcon from "../components/icons/FoodIcon";
import BasketIcon from "../components/icons/BasketIcon";
import GiftIcon from "../components/icons/GiftIcon";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";

const { Header, Content, Sider, Footer } = Layout;



function getItems(role: string) {
  const baseItems = [
    {
      key: "/",
      icon: <Icon component={Home} />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "/restaurants",
      icon: <Icon component={FoodIcon} />,
      label: <NavLink to="/restaurants">Restaurants</NavLink>,
    },
    {
      key: "/products",
      icon: <Icon component={BasketIcon} />,
      label: <NavLink to="/products">Products</NavLink>,
    },
    {
      key: "/promos",
      icon: <Icon component={GiftIcon} />,
      label: <NavLink to="/promos">Promos</NavLink>,
    },
  ];

  if (role === 'admin') {
    baseItems.splice(1, 0, {
        key: "/users",
        icon: <Icon component={UserIcon} />,
        label: <NavLink to="/users">Users</NavLink>,
      })
      return baseItems
  }
  return baseItems
}


function Dashboard() {
  const { user, logout: logoutFromStore } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore()
    }
  })

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  const items = getItems(user?.role)
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              background: colorBgContainer,
            }}
          >
            <Flex gap="middle" align="start" justify="space-between">
              <Badge text={user.role === 'admin' ? "Admin" : user.tenant?.name} status="success" />
              <Space size={20}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown menu={{
                  items: [{
                    key: '/',
                    label: 'Logout',
                    onClick: () => logoutMutate()
                  }]
                }} placement="bottomRight" arrow>
                  <Avatar style={{
                    background: "#0096FF",
                    color: "#fff"
                  }}>
                    {
                      user && (
                        user.firstname.charAt(0)
                      )
                    }
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "24px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Menspace pizza shop</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dashboard;
