import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import type { Tenant } from "../../../types";

function UserForm({ isEditMode = false }: { isEditMode: boolean }) {
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getTenants(`perPage=100&currentPage=1`).then((res) => res.data);
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: "Firstname is required",
                    },
                  ]}
                >
                  <Input placeholder="firstname" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastname"
                  rules={[
                    {
                      required: true,
                      message: "Lastname is required",
                    },
                  ]}
                >
                  <Input placeholder="lastname" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Email is required",
                    },
                    {
                      type: "email",
                      message: "Email is not valid",
                    },
                  ]}
                >
                  <Input
                    placeholder="jhon.doe@mernspace.com"
                    type="email"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {!isEditMode && (
            <Card title="Security info">
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Paasword"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required",
                      },
                    ]}
                  >
                    <Input.Password placeholder="password" size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}
          <Card title="Role info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Role is required",
                    },
                  ]}
                >
                  <Select
                    id="selectBoxInUserForm"
                    size="large"
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select Role"
                  >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Restaurant"
                  name="tenantId"
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
                    placeholder="Select Restaurant"
                  >
                    {tenants &&
                      tenants.data.map((tenant: Tenant) => (
                        <Select.Option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}

export default UserForm;
