import { Result, Button } from 'antd';
const Success = () => {
  return (
    <Result
      status="success"
      title="答题结束"
      subTitle="成绩将会在1-3个工作日后发送到您的手机或者邮箱"
    />
  );
};
export default Success;
