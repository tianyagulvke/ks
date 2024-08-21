import { Question, Answer, Resolve } from '../type';
import { Input } from 'antd';

const { TextArea } = Input;
const Write = ({
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
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    resolve(e.target.value);
  };
  return (
    <>
      <div style={{ marginBottom: '20px' }}>{`${order}. ${question.title}`}</div>
      <TextArea
        placeholder="请输入答案"
        value={answer.answer}
        onChange={onChange}
        disabled={!isExam}
      />
      {!isExam && <div style={{ marginTop: '20px' }}>{`正确答案：${right}`}</div>}
    </>
  );
};
export default Write;
