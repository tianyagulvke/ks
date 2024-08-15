import { RadioChangeEvent } from 'antd/lib';
import { Question, Answer, Resolve } from '../type';
import { Radio, Space } from 'antd';
const SingleChoice = ({
  question,
  answer,
  resolve,
}: {
  question: Question;
  answer: Answer;
  resolve: Resolve;
}) => {
  const onChange = (e: RadioChangeEvent) => {
    // console.log(e.target.value);
    resolve(e.target.value);
  };
  return (
    <>
      <div style={{ marginBottom: '20px' }}>{`${question.id} ${question.title}`}</div>
      <Radio.Group onChange={onChange} value={answer.answer}>
        <Space direction="vertical">
          {question.choices?.map((item, index) => {
            return <Radio value={index}>{item}</Radio>;
          })}
        </Space>
      </Radio.Group>
    </>
  );
};
export default SingleChoice;
