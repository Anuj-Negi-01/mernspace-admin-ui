import { Card, Col, Row,Input, Select, Form } from "antd"


type UsersFilterProp = {
  children: React.ReactNode
}

function UsersFilter({ children }: UsersFilterProp) {
  return (
    <Card style={{ marginTop: '16px'}}>
      <Row justify="space-between">
        <Col span={16}>
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item name="q">
                  <Input.Search placeholder="Search"
                allowClear={true} 
                 />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="role">
                  <Select style={{ width: '100%'}} placeholder="Select Role" allowClear={true}
                
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
              {/* <Col span={8}>
              <Select style={{ width: '100%'}} placeholder="Select Status" allowClear={true}
              onChange={(selectedItem) => onFilterChange('statusFilter', selectedItem)}
              >
                  <Select.Option value="banned">
                    Banned
                  </Select.Option>
                  <Select.Option value="active">
                    Active
                  </Select.Option>
                  </Select>
              </Col> */}
            </Row>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'end'}}>
        { children }
        </Col>
      </Row>
    </Card>
  )
}

export default UsersFilter