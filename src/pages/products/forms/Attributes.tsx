import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../../http/api";
import { Card, Col, Form, Radio, Row, Switch, Typography } from "antd";
import type { Category } from "../../../types";

type AttributesProps = {
  selectedCategory: string;
};

export default function Attributes({ selectedCategory }: AttributesProps) {
  const { data: category } = useQuery<Category>({
    queryKey: ["attributes", selectedCategory],
    queryFn: async () => {
      return getCategory(selectedCategory).then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (!category) return null;

  return (
    <Card title={<Typography.Text>Attributes</Typography.Text>}>
      {category.attributes.map((attribute) => {
        return (
          <div key={attribute.name}>
            {attribute.widgetType === "radio" ? (
              <Form.Item
                label={attribute.name}
                name={["attributes", attribute.name]}
                initialValue={attribute.defaultValue}
                rules={[
                  {
                    required: true,
                    message: `${attribute.name} is required`,
                  },
                ]}
              >
                <Radio.Group>
                  {attribute.availableOptions.map((option) => {
                    return (
                      <Radio.Button value={option} key={option}>
                        {option}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            ) : attribute.widgetType === "switch" ? (
              <Row>
                <Col>
                  <Form.Item
                    label={attribute.name}
                    valuePropName="checked"
                    name={["attributes", attribute.name]}
                    initialValue={attribute.defaultValue}
                    rules={[
                      {
                        required: true,
                        message: `${attribute.name} is required`,
                      },
                    ]}
                  >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false}/>
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
          </div>
        );
      })}
    </Card>
  );
}
