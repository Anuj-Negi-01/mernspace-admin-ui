import { Breadcrumb, Button, Drawer, Flex, Space, Spin, Table } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../http/api";
import TenantsFilter from "./TenantsFilter";
import { useState } from "react";
import { useAuthStore } from "../../store";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

function Tenants() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    data: tenants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getTenants().then((res) => res.data);
    },
  });

  const { user } = useAuthStore();

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace={true} />;
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
            title: "Tenants",
          },
        ]}
      />
      <TenantsFilter
        onFilterChange={(filterName, filterValue) =>
          console.log(filterName + " " + filterValue)
        }
      >
        <Button type="primary" icon={<PlusOutlined />}
        onClick={() => setDrawerOpen(true)}
        >
          Create Tenant
        </Button>
      </TenantsFilter>
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
        dataSource={tenants}
        rowKey={"id"}
        style={{ marginTop: "20px" }}
      />
      <Drawer
        title={<h2>Create a new restaurant</h2>}
        width={720}
        closable
        destroyOnHidden
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        extra={
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      ></Drawer>
    </>
  );
}

export default Tenants;
