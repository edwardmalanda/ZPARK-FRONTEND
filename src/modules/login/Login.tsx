import { Layout, Form, Input, Button } from 'antd';
import { Logo } from '../../Utils/Logo';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const { username, password } = values;
    if (username === '1234' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Header className='bg-blue-500 rounded-xl p-10 h-40 '>
        <div className="logo p-3"></div>
        {<Logo />}
      </Header>
      <Layout className='bg-white'>
        <Content>
          <Form
            form={form}
            name="login"
            className='bg-white mt-10'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Admin Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your admin username!' },
              ]}
            >
              <Input placeholder="Enter your Admin username" />
            </Form.Item>
            <Form.Item
              label="Admin Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your admin password!' },
              ]}
            >
              <Input.Password placeholder="Enter Admin password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='bg-blue-500'>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};
