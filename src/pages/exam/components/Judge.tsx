import { RadioChangeEvent } from 'antd/lib';
import { Question, Answer, Resolve } from '../type';
import { Radio, Space } from 'antd';
const Judge = ({
  question,
  answer,
  resolve,
  isExam,
  order,
}: {
  question: Question;
  answer: Answer;
  resolve: Resolve;
  isExam: boolean;
  order: number;
}) => {
  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    resolve(e.target.value);
  };
  return (
    <>
      <div style={{ marginBottom: '20px' }}>{`${order} ${question.title}`}</div>
      <Radio.Group onChange={onChange} value={answer.answer} disabled={!isExam}>
        <Space direction="vertical">
          <Radio value={'正确'}>√</Radio>
          <Radio value={'错误'}>×</Radio>
        </Space>
      </Radio.Group>
    </>
  );
};
export default Judge;
