import { Card, Col, Row,Input, Select, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

function UsersFilter() {
  return (
    <Card style={{ marginTop: '20px'}}>
      <Row justify="space-between">
        <Col span={16}>
            <Row gutter={20}>
              <Col span={8}>
                <Input.Search placeholder="Search"/>
              </Col>
              <Col span={8}>
                <Select style={{ width: '100%'}} placeholder="Select Role" allowClear={true}>
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
              </Col>
              <Col span={8}>
              <Select style={{ width: '100%'}} placeholder="Select Status" allowClear={true}>
                  <Select.Option value="banned">
                    Banned
                  </Select.Option>
                  <Select.Option value="active">
                    Active
                  </Select.Option>
                  </Select>
              </Col>
            </Row>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'end'}}>
        <Button type="primary" icon={<PlusOutlined />}>Create User</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default UsersFilter