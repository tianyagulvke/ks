import { RadioChangeEvent } from 'antd/lib';
import { Question, Answer, Resolve } from '../type';
import { Radio, Space } from 'antd';
import { geneAbc } from '@/utils/data';
const SingleChoice = ({
  question,
  answer,
  resolve,
  isExam,
  order,
  right,
}: {
  question: Question;
  answer: Answer;
  resolve: Resolve;
  isExam: boolean;
  order: number;
  right: string;
}) => {
  const onChange = (e: RadioChangeEvent) => {
    // console.log(e.target.value);
    resolve(e.target.value);
  };
  return (
    <>
      <div style={{ marginBottom: '20px' }}>{`${order}. ${question.title}`}</div>
      <Radio.Group onChange={onChange} value={answer.answer} disabled={!isExam}>
        <Space direction="vertical">
          {question.choices?.map((item, index) => {
            return (
              <Radio value={item} key={index}>
                {geneAbc(index) + '. ' + item}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
      {!isExam && (
        <div style={{ marginTop: '20px' }}>
          正确答案：{right}，你的答案：{answer.answer}
        </div>
      )}
    </>
  );
};
export default SingleChoice;
