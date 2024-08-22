import { Card, Form, Input, Button, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const submit = async () => {
    const res = await logForm.validateFields();
    if (res.username === 'admin' && res.password === '1qaz@WSX') {
      console.log(res);
      sessionStorage.setItem('token', 'okmpl,');
      navigate('/home', {
        replace: true,
      });
    } else {
      message.error('用户名或密码错误');
    }
  };
  const navigate = useNavigate();
  const [logForm] = Form.useForm();
  return (
    <div style={{ padding: '10px', height: '100vh', width: '100%' }}>
      <Card style={{ width: '100%', height: 'calc(100vh - 20px)', padding: '10px' }}>
        <Form
          form={logForm}
          name="basic"
          labelCol={{ span: 5 }}
          labelAlign="left"
          wrapperCol={{ span: 19 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ maxWidth: '500px', margin: '80px auto' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Row justify={'center'}>
            <Button type="primary" onClick={submit}>
              登录
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
