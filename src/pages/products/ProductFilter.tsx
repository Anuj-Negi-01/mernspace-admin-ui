import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  Space,
} from "antd";

interface ProductFilterProps {
  children: React.ReactNode;
}

function ProductFilter({ children }: ProductFilterProps) {
  return (
    <Card style={{ marginTop: '16px'}}>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search placeholder="Search products" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category">
                <Select
                  style={{ width: "100%" }}
                  allowClear={true}
                  placeholder="Select Category"
                >
                  <Select.Option value="pizza">Pizza</Select.Option>

                  <Select.Option value="pizza">Pizza</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="tenant">
                <Select
                  style={{ width: "100%" }}
                  allowClear={true}
                  placeholder="Select Restaurant"
                >
                  <Select.Option value="pizza">Pizza</Select.Option>

                  <Select.Option value="pizza">Pizza</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Switch />
                <Typography.Text>Show only published</Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
}

export default ProductFilter;
