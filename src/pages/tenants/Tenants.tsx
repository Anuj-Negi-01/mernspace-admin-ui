import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme, Typography } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenant, getTenants, updateTenant } from "../../http/api";
import TenantsFilter from "./TenantsFilter";
import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../../store";
import TenantForm from "./forms/TenantForm";
import type { CreateTenantData, FieldData, Tenant } from "../../types";
import { CURRENT_PAGE, PER_PAGE } from "../../constant";
import { debounce } from "lodash";

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
  const [filterForm] = Form.useForm()
  const queryClient = useQueryClient()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
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
      return createTenant(data).then((res) => res.data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tenants']})
    }
  })

  const { mutate: updateTenantMutate } = useMutation({
    mutationKey: ["update-tenant"],
    mutationFn: (data: CreateTenantData) => {
      return updateTenant(data, currentTenant!.id).then((res) => res.data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tenants']})
    }
  })

  const onHandleSubmit = async () => {
    await form.validateFields()
    const isEditMode = !!currentTenant
    if(isEditMode){
      await updateTenantMutate(form.getFieldsValue())
    } else {
      await tenantMutate(form.getFieldsValue())
    }
    setCurrentTenant(null)
    form.resetFields()
    setDrawerOpen(false)
  }

  const debounecdQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }))
    }, 1000)
  }, [])

  const onFieldsChange = async(changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
            .map((item) => ({
                [item.name[0]]: item.value,
            }))
            .reduce((acc, item) => ({ ...acc, ...item }), {});
    debounecdQUpdate(changedFilterFields.q)
  }

  useEffect(() => {
    if(currentTenant){
      setDrawerOpen(true)
      form.setFieldsValue(currentTenant)
    }
  }, [currentTenant, form])

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
      <Form form={filterForm} onFieldsChange={onFieldsChange}>
        <TenantsFilter
      >
        <Button type="primary" icon={<PlusOutlined />}
        onClick={() => {
          setDrawerOpen(true)
          setCurrentTenant(null)
        }}
        >
          Create Restaurant
        </Button>
      </TenantsFilter>
      </Form>
      <Table
        columns={[
          ...columns, 
          {
            title: 'Action',
            render: (_text: string, record: Tenant) => {
              return (
                <Button type="link"
                onClick={() => {
                  setCurrentTenant(record)
                }} 
                >Edit</Button>
              )
            }
          }
        ]}
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
          },
          showTotal: (total: number, range: number[]) => {
            return (
              <Typography.Text strong>
                {
                  `${range[0]}-${range[1]} of ${total}`
                }
              </Typography.Text>
            )
          }
        }}
      />
      <Drawer
        title={currentTenant ? <h2>Update restaurant</h2> : <h2>Create a new restaurant</h2>}
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
            <Button type="primary" onClick={() => onHandleSubmit()}>
              { currentTenant ? 'Save' : 'Submit' }
            </Button>
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
