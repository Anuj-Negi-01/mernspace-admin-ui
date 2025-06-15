import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
        <h1>This Page is </h1>
    <Outlet />
    </div>
  )
}

export default Dashboard