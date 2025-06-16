import { Typography } from "antd"
import { useAuthStore } from "../store"


const { Title } = Typography;


function HomePage() {
  const { user } = useAuthStore()
  return (
    <div>
      <Title level={3}>Welcome, { user?.firstname} 😊</Title>
      
    </div>
  )
}

export default HomePage
