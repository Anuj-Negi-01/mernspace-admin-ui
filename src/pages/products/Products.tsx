import { Flex, Breadcrumb, Form, Button } from "antd"
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductFilter from "./ProductFilter";

function Products() {
    const [filterForm] = Form.useForm();
  return (
    <>
      <Flex justify="space-between">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            {
              title: <Link to="/">Dashboard</Link>,
            },
            {
              title: "Products",
            },
          ]}
        />
      </Flex>

      <Form form={filterForm}>
        <ProductFilter>
          <Button
            type="primary"
            icon={<PlusOutlined />}
          >
            Add Product
          </Button>
        </ProductFilter>
      </Form>
    </>
  )
}

export default Products