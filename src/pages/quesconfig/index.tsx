import { Button, Input, Form, InputNumber, Card } from 'antd';
const QuesConfig = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card style={{ width: '100%', height: 'calc(100vh - 112px)', padding: '10px' }}>
      <h2 style={{ fontSize: '30px', lineHeight: '50px' }}>题目配置</h2>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
      >
        <Form.Item
          label="题目数量"
          name="count"
          rules={[{ required: true, message: '请输入题目数量!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="及格线"
          name="line"
          rules={[{ required: true, message: '请输入及格线!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="答题时间"
          name="time"
          rules={[{ required: true, message: '请输入答题时间!' }]}
        >
          <InputNumber addonAfter="分钟" defaultValue={60} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default QuesConfig;
