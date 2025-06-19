import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenat, getTenants } from "../../http/api";
import TenantsFilter from "./TenantsFilter";
import { useState } from "react";
import { useAuthStore } from "../../store";
import TenantForm from "./forms/TenantForm";
import type { CreateTenantData } from "../../types";

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
  const [ form ] = Form.useForm()
  const queryClient = useQueryClient()
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

  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["tenant"],
    mutationFn: (data: CreateTenantData) => {
      return createTenat(data).then((res) => res.data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tenants']})
    }
  })

  const onHandleSubmit = async () => {
    await form.validateFields()
    tenantMutate(form.getFieldsValue())
    setDrawerOpen(false)
  }

  const { user } = useAuthStore();

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace={true} />;
    }

    const { token : { colorBgLayout }} = theme.useToken()
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
          Create Restaurant
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
        onClose={() => {
          setDrawerOpen(false)
          form.resetFields()
        }}
        styles={{ body: {background: colorBgLayout}}}
        extra={
          <Space>
            <Button onClick={() => {
              form.resetFields()
              setDrawerOpen(false)
            }}>Cancel</Button>
            <Button type="primary" onClick={() => onHandleSubmit()}>Submit</Button>
          </Space>
        }
      >
        <Form form={form}>
          <TenantForm />
        </Form>
      </Drawer>
    </>
  );
}

export default Tenants;
