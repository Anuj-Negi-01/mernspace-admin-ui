import { Breadcrumb, Button, Drawer, Flex, Spin, Table, Space } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import type { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";



const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstname",
    key: "firstname",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstname} {record.lastname}
        </div>
      );
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

function Users() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers().then((res) => res.data);
    },
  });

  const { user } = useAuthStore();
  if(user?.role !== 'admin'){
    return <Navigate to="/" replace={true} />
  }

  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: "Users",
          },
        ]}
      />
      <UsersFilter onFilterChange={(filtername: string, filterValue: string) => console.log('Filter', filtername + ' ' + filterValue)}
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Create User</Button>
      </UsersFilter>
      {isLoading && (
        <Flex
          align="center"
          gap="middle"
          justify="center"
          style={{ height: "50vh" }}
        >
          <Spin size="large" />
        </Flex>
      )}
      {isError && <div>{error.message}</div>}
      <Table
        columns={columns}
        dataSource={users}
        rowKey={'id'}
        style={{ marginTop: "20px" }}
      />

      <Drawer title={<h2>Create a new user</h2>} width={720} destroyOnHidden closable onClose={() => setDrawerOpen(false)} open={drawerOpen}
      extra={
        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </Space>
      } 
        >
      <h1>Tesing</h1>
      <h1>Tesing</h1>
      </Drawer>
    </>
  );
}

export default Users;
