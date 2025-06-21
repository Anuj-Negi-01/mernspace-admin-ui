import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { Flex, Spin } from "antd";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

function Root() {
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: (failureCount: number, error) => {
      if(error instanceof AxiosError && error.response?.status === 401){
        return false;
      }
      return failureCount < 3;
    }
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh'}}>
        <Spin size="large" />
      </Flex>
    )
  }

  return <Outlet />;
}

export default Root;
