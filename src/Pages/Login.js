import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();

  const Navigate = useNavigate();

  const handleLogin = (formValues) => {
    Navigate("/admin/client/list");
  };
  return (
    <div className="bg_light">
      <div className="d-flex align-items-center justify-content-center  min-vh-100">
        <div className="col-lg-6 col-md-8 col-sm-12 bg-light bg-opacity-50 p-5 rounded-5 shadow-lg">
          <div>
            <h4 className="mb-4 text-center">
              <span className="border-bottom border-dark">
                Login to your account
              </span>
            </h4>
          </div>
          <Form
            form={form}
            onFinish={handleLogin}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
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

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
