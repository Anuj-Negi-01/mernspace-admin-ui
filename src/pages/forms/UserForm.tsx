import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../http/api";
import type { Tenant } from "../../types";

function UserForm() {

  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getTenants().then((res) => res.data)
    }
  })

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstname">
                <Input placeholder="firstname" size="large"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastname">
                <Input placeholder="lastname" size="large"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Email" name="email">
                <Input placeholder="jhon.doe@mernspace.com" type="email" size="large"></Input>
            </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Security info">
            <Row>
              <Col span={12}>
                  <Form.Item label="Paasword" name="password">
                      <Input.Password placeholder="password" size="large" />
                  </Form.Item>
              </Col>
            </Row>
        </Card>
        <Card title="Role info">
            <Row gutter={20}>
              <Col span={12}>
                  <Form.Item label="Role" name="role">
                    <Select
                    size="large"
                  style={{ width: '100%'}}
                  allowClear={true}
                  placeholder="Select Role"
                  >
                    <Select.Option value="admin">
                    Admin
                  </Select.Option>
                  <Select.Option value="manager">
                    Manager
                  </Select.Option>
                  <Select.Option value="customer">
                    Customer
                  </Select.Option>
                  </Select>
                  </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                    <Select
                    size="large"
                  style={{ width: '100%'}}
                  allowClear={true}
                  placeholder="Select Restaurant"
                  >
                    {
                      tenants && tenants.map((tenant: Tenant) => (
                        <Select.Option key={tenant.id} value={tenant.id}>
                          { tenant.name }
                        </Select.Option>
                      ))
                    }
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
