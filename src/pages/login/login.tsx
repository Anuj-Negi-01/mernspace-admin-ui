import {
  Checkbox,
  Form,
  Input,
  Layout,
  Space,
  Button,
  Flex,
  Alert,
  Card
} from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentials } from "../../types";
import { login, self, logout } from "../../http/api";
import { useAuthStore } from "../../store";
import { usePermision } from "../../hooks/usePermision";

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};

function LoginPage() {
  const { isAllowed } = usePermision();
  const { setUser, logout: logoutFromStore } = useAuthStore();
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
    }
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      // logout or redirect to client ui
      // window.location.href="clent ui url"
      if (!isAllowed(selfDataPromise.data)) {
        logoutMutate()
        return;
      }
      setUser(selfDataPromise.data);
    },
  });

  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
            variant="borderless"
            style={{ width: 300 }}
          >
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) =>
                mutate({ email: values.username, password: values.password })
              }
            >
              {isError && (
                <Alert
                  type="error"
                  message={error.message}
                  style={{ marginBottom: 24 }}
                />
              )}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter username",
                  },
                  {
                    type: "email",
                    message: "Email is not valid",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter password",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="password"
                />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" id="login-form-forgot">
                  Forgot password
                </a>
              </Flex>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
}

export default LoginPage;
