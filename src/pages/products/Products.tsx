import { Flex, Breadcrumb } from "antd"
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Products() {
  return (
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
  )
}

export default Products