import { Breadcrumb, Flex, Spin, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import type { User } from "../../types";
import { useAuthStore } from "../../store";

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
        style={{ marginTop: "20px" }}
      />
    </>
  );
}

export default Users;
