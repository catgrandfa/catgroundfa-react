import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './index.less';
import React from 'react';
import { aes_encrypt } from '@/utils/utils';
import { login } from '@/services/swagger/login';
import { history } from 'umi';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const loginClick = async () => {
    const formData = {
      username: form.getFieldValue('userName'),
      password: form.getFieldValue('passWord'),
    };
    const res = await login(formData);
    if (res.status === 200) {
      history.push('/index');
    } else {
      message.error(res.message);
    }
  };
  return (
    <div className={styles.container}>
      <Form
        form={form}
        className={styles.login}
        name="basic"
        labelCol={{ span: 5, offset: 0 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="horizontal"
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>用户登录</h2>
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '请输入你的用户名！' }]}
          style={{ width: 350 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="passWord"
          rules={[{ required: true, message: '请输入你的密码！' }]}
          style={{ width: 350 }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={loginClick}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
