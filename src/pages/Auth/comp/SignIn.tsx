import React from "react";
import { Button, Form, Input, notification } from "antd";
import { loginUser } from "../../../firebase/firebase";

type AuthResponse = { status: boolean; errorMessage?: string };

const SignIn = () => {
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res: AuthResponse = await loginUser(email, password);

    if (!res.status) {
      notification.error({
        message: "Sign in failed",
        description: res.errorMessage,
      });
    }
  };

  const loginFailed = () => console.log("registerFailed");

  return (
    <div className="SignIn">
      SIGN IN
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={login}
        onFinishFailed={loginFailed}
        autoComplete="off"
      >
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
