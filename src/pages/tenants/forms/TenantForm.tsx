import { Col, Row, Form, Input, Card } from "antd"

function TenantForm() {
  return (
    <Row>
      <Col span={24}>
        <Card title="Restaurant info">
          <Form.Item label="Restaurant name" name="name" rules={[
            {
              required: true,
              message: "Restaurant name is required"
            }
          ]}>
           <Input size="large" />
          </Form.Item>
          <Form.Item label="Restaurant address" name="address" rules={[
            {
              required: true,
              message: "Restaurant address is required"
            }
          ]}>
           <Input size="large" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default TenantForm