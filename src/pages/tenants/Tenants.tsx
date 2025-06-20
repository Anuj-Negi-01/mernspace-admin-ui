import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme, Typography } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenat, getTenants } from "../../http/api";
import TenantsFilter from "./TenantsFilter";
import { useState } from "react";
import { useAuthStore } from "../../store";
import TenantForm from "./forms/TenantForm";
import type { CreateTenantData } from "../../types";
import { CURRENT_PAGE, PER_PAGE } from "../../constant";

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
  const [queryParams, setQueryParams] = useState({
    currentPage: CURRENT_PAGE,
    perPage: PER_PAGE
  })
  const {
    data: tenants,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["tenants", queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>
      ).toString()
      return getTenants(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData
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
    form.resetFields()
    setDrawerOpen(false)
  }

  const { user } = useAuthStore();

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace={true} />;
    }

    const { token : { colorBgLayout }} = theme.useToken()
  return (
    <>
      <Flex justify="space-between">
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
      {isFetching && (
          <Spin size="small" />
      )}
      {isError && <Typography.Text strong>{error.message}</Typography.Text>}
      </Flex>
      <TenantsFilter
      >
        <Button type="primary" icon={<PlusOutlined />}
        onClick={() => setDrawerOpen(true)}
        >
          Create Restaurant
        </Button>
      </TenantsFilter>
      <Table
        columns={columns}
        dataSource={tenants?.data}
        rowKey={"id"}
        style={{ marginTop: "20px" }}
        pagination={{
          total: tenants?.total,
          pageSize: queryParams.perPage,
          current: queryParams.currentPage,
          onChange: (page) => {
            setQueryParams((prev) => {
              return {
                ...prev,
                currentPage: page
              }
            })
          }
        }}
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
