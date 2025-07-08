import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  Space,
} from "antd";
import { getCategories, getTenants } from "../../http/api";
import type { Category, Tenant } from "../../types";
import { useAuthStore } from "../../store";

interface ProductFilterProps {
  children: React.ReactNode;
}

function ProductFilter({ children }: ProductFilterProps) {
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      return getTenants("perPage=1000&currentPage=1").then((res) => res.data);
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategories().then((res) => res.data);
    },
  });

  const { user } = useAuthStore();

  return (
    <Card style={{ marginTop: "16px" }}>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search placeholder="Search products" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="categoryId">
                <Select
                  style={{ width: "100%" }}
                  allowClear={true}
                  placeholder="Select Category"
                >
                  {categories &&
                    categories.map((category: Category) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            {user!.role === "admin" && (
              <Col span={6}>
                <Form.Item name="tenantId">
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select Restaurant"
                  >
                    {restaurants &&
                      restaurants.data.map((restaurant: Tenant) => (
                        <Select.Option
                          value={restaurant.id}
                          key={restaurant.id}
                        >
                          {restaurant.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
            <Col span={6}>
              <Space>
                <Form.Item name="isPublish">
                  <Switch defaultChecked={false} />
                </Form.Item>
                <Typography.Text
                  strong
                  style={{ display: "inline-block", marginBottom: "22px" }}
                >
                  Show only published
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
}

export default ProductFilter;
