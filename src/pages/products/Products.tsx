import {
  Flex,
  Breadcrumb,
  Form,
  Button,
  Table,
  Typography,
  Space,
  Image,
  Tag,
  Spin,
} from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import type { FieldData, Product } from "../../types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../http/api";
import { useMemo, useState } from "react";
import { CURRENT_PAGE, PER_PAGE } from "../../constant";
import { format } from "date-fns";
import { debounce } from "lodash";
import { useAuthStore } from "../../store";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (_text: string, record: Product) => {
      return (
        <div>
          <Space>
            <Image
              width={60}
              src={
                // record.image ||
                // TODO: Remove this hardcoded image
                "https://imgs.search.brave.com/RcI131a7lnWVoalVpRfxIdmKTVdD4RWaIXHZFCxvhfI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjc4/Mzg3MzQ0L3N0b2Nr/LXBob3RvLXRvcC12/aWV3LW9mLWhvbWVt/YWRlLWl0YWxpYW4t/cGl6emEtbWFyZ2hl/cml0YS1vbi1vbGQt/d29vZGVuLXRhYmxl"
              }
              preview={false}
            />
            <Typography.Text>{record.name}</Typography.Text>
          </Space>
        </div>
      );
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (_: boolean, record: Product) => {
      return (
        <>
          {record.isPublish ? (
            <Tag color="green">Published</Tag>
          ) : (
            <Tag color="red">Draft</Tag>
          )}
        </>
      );
    },
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return (
        <Typography.Text>
          {format(new Date(text), "dd/MM/yyyy HH:mm a")}
        </Typography.Text>
      );
    },
  },
];

function Products() {
  const [filterForm] = Form.useForm();

  const { user } = useAuthStore()

  const [queryParams, setQueryParams] = useState({
    currentPage: CURRENT_PAGE,
    perPage: PER_PAGE,
    tenantId: user!.role === "manager" ? user?.tenant?.id : undefined
  });

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({
        ...prev,
        q: value,
        currentPage: 1
      }))
    }, 1000)
  }, [])

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields.map((item) => (
      {[item.name[0]]: item.value }
    )).reduce((acc, item) => ({...acc, ...item}), {})

    if("q" in changedFilterFields){
      debouncedQUpdate(changedFilterFields.q)
    } else {
      setQueryParams((prev) => (
        {
          ...prev,
          ...changedFilterFields,
          currentPage: 1
        }
      )
    )
    }
  };

  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );
      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      return getProducts(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

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
              title: "Products",
            },
          ]}
        />
        {isFetching && <Spin size="small" />}
        {isError && (
          <Typography.Text strong type="danger">
            {error.message}
          </Typography.Text>
        )}
      </Flex>

      <Form form={filterForm} onFieldsChange={onFilterChange}>
        <ProductFilter>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </ProductFilter>
      </Form>

      <Table
        dataSource={products?.data}
        columns={[
          ...columns,
          {
            title: "Actions",
            render: (_text: string, record: Product) => {
              return (
                <Space>
                  <Button type="link" onClick={() => {}}>
                    Edit
                  </Button>
                </Space>
              );
            },
          },
        ]}
        rowKey={"_id"}
        style={{ marginTop: "16px" }}
        pagination={{
          total: products?.total,
          pageSize: queryParams.perPage,
          current: queryParams.currentPage,
          onChange: (page) => {
            setQueryParams((prev) => {
              return {
                ...prev,
                currentPage: page,
              };
            });
          },
          showTotal: (total: number, range: number[]) => {
            return (
              <Typography.Text strong>
                {`${range[0]}-${range[1]} of ${total}`}
              </Typography.Text>
            );
          },
        }}
      />
    </>
  );
}

export default Products;
