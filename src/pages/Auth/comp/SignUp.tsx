import React from "react";
import { Button, Form, Input, notification } from "antd";
import { registerUser } from "../../../firebase/firebase";

type AuthResponse = { status: boolean; errorMessage?: string };

const SignUp = () => {
  const register = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res: AuthResponse = await registerUser(email, password);

    if (!res.status) {
      notification.error({
        message: "Sign up failed",
        description: res.errorMessage,
      });
    }
  };

  const registerFailed = () => console.log("registerFailed");

  return (
    <div className="SignUp">
      SIGN UP
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={register}
        onFinishFailed={registerFailed}
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

export default SignUp;
