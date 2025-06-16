import { Breadcrumb } from 'antd';
import { RightOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';

function Users() {
  return (
    <>
        <Breadcrumb
    separator={<RightOutlined />}
    items={[
      {
        title: <Link to="/">Dashboard</Link>
      },
      {
        title: 'Users',
        href: '/users',
      },
    ]}
  />
    </>
  )
}

export default Users