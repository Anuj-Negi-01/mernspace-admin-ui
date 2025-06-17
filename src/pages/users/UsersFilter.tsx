import { Card, Col, Row,Input, Select } from "antd"


type UsersFilterProp = {
  onFilterChange: (filtername: string, filterValue: string) => void,
  children: React.ReactNode
}

function UsersFilter({ onFilterChange, children }: UsersFilterProp) {
  return (
    <Card style={{ marginTop: '20px'}}>
      <Row justify="space-between">
        <Col span={16}>
            <Row gutter={20}>
              <Col span={8}>
                <Input.Search placeholder="Search"
                allowClear={true} 
                onChange={(e) => onFilterChange('searchFilter', e.target.value)} />
              </Col>
              <Col span={8}>
                <Select style={{ width: '100%'}} placeholder="Select Role" allowClear={true}
                onChange={(selectedItem) => onFilterChange('roleQuery', selectedItem)}
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
              </Col>
              <Col span={8}>
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
              </Col>
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