import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  Upload,
} from "antd";
import { getCategories, getTenants } from "../../../http/api";
import type { Category, Tenant } from "../../../types";
import { PlusOutlined } from "@ant-design/icons";
import Pricing from "./Pricing";
import Attributes from "./Attributes";

function ProductForm() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategories().then((res) => res.data);
    },
  });

  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      return getTenants(`perPage=100&currentPage=1`).then((res) => res.data);
    },
  });

  const selectedCategory: string = Form.useWatch("categoryId")

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Product info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Name is required",
                    },
                  ]}
                >
                  <Input placeholder="Product name" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Category is required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select category"
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
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Description is required",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Something about product.."
                    rows={2}
                    maxLength={100}
                    style={{ resize: "none" }}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Product image">
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Product image is required",
                },
              ]}
            >
              <Upload listType="picture-card">
                <Space direction="vertical">
                  <PlusOutlined />
                  <Typography.Text strong style={{ marginTop: 4 }}>
                    Upload
                  </Typography.Text>
                </Space>
              </Upload>
            </Form.Item>
          </Card>
          <Card title="Tenant info">
            <Col span={12}>
              <Form.Item
                name="tenantId"
                label="Restaurant"
                rules={[
                  {
                    required: true,
                    message: "Restaurant is required",
                  },
                ]}
              >
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  allowClear={true}
                  placeholder="Select Tenant"
                >
                  {tenants &&
                    tenants.data.map((tenant: Tenant) => (
                      <Select.Option value={tenant.id} key={tenant.id}>
                        {tenant.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Card>
          {
            selectedCategory && (
              
                <Pricing selectedCategory={selectedCategory}/>
              
            )
          }
          {
            selectedCategory && (
              
                <Attributes />
              
            )
          }
          <Card title="Other properties">
            <Row gutter={20}>
              <Col span={12}>
                <Space>
                  <Form.Item name="isPublish">
                    <Switch
                      defaultChecked={false}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Form.Item>
                  <Typography.Text
                    strong
                    style={{ display: "inline-block", marginBottom: "22px" }}
                  >
                    Published
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}

export default ProductForm;
