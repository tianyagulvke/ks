import { Question, Answer, Resolve } from '../type';
import { Input } from 'antd';

const { TextArea } = Input;
const Write = ({
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
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    resolve(e.target.value);
  };
  return (
    <>
      <div style={{ marginBottom: '20px' }}>{`${order} ${question.title}`}</div>
      <TextArea
        placeholder="请输入答案"
        value={answer.answer}
        onChange={onChange}
        disabled={!isExam}
      />
    </>
  );
};
export default Write;
