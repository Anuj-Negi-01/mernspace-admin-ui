import { Card, Col, Input, Row } from "antd"

type tenantsFilterProp = {
    children: React.ReactNode,
    onFilterChange: (filterName: string, filterValue: string) => void
} 

function TenantsFilter({ children, onFilterChange }: tenantsFilterProp) {
  return (
     <Card>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Input.Search
                                allowClear={true}
                                placeholder="Search"
                                onChange={(e) => onFilterChange('searchFilter', e.target.value)}
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