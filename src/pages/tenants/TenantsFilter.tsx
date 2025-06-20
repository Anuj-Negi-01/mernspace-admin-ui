import { Card, Col, Input, Row } from "antd"

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
                            <Input.Search
                                allowClear={true}
                                placeholder="Search"
                            />
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