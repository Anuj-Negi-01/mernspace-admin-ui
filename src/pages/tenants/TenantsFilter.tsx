import { Card, Col, Input, Row, Form } from "antd"

type tenantsFilterProp = {
    children: React.ReactNode
} 

function TenantsFilter({ children }: tenantsFilterProp) {
  return (
     <Card style={{ marginTop: '20px'}}>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item name="q">
                                <Input.Search
                                allowClear={true}
                                placeholder="Search"
                            />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
                    { children }
                </Col>
            </Row>
    </Card>
  )
}

export default TenantsFilter