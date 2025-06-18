import { Card, Col, Form, Input, Row } from "antd";

function UserForm() {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstname">
                <Input placeholder="firstname"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastname">
                <Input placeholder="lastname"></Input>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default UserForm;
