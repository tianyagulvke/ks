import { Button, Input, Form, InputNumber, Card, Radio } from 'antd';
import { useState } from 'react';
const QuesConfig = () => {
  // const [] = useState(0);
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
          label="岗位配置"
          name="station"
          rules={[{ required: true, message: '请输入岗位配置!' }]}
        >
          <Radio.Group value={1}>
            <Radio value={1}>Java后端</Radio>
            <Radio value={2}>需求分析</Radio>
            <Radio value={3}>web前端</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="题型分值配置">
          <Form.Item label="单选题" name="single" wrapperCol={{ span: 10 }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="判断题" name="judge" wrapperCol={{ span: 10 }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="简答题" name="write" wrapperCol={{ span: 10 }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
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
