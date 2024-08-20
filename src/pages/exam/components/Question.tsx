import { Question as QuestionType, Answer, Resolve } from '../type';
import SingleChoice from './SingleChoice';
import Judge from './Judge';
import Write from './Write';
const Question = ({
  question,
  answer,
  resolve,
  isExam = true,
  order,
}: {
  question: QuestionType;
  answer: Answer;
  resolve: Resolve;
  isExam: boolean;
  order: number;
}) => {
  if (question.type === '1') {
    return (
      <SingleChoice
        order={order}
        question={question}
        answer={answer}
        resolve={resolve}
        isExam={isExam}
      />
    );
  } else if (question.type === '2') {
    return (
      <Judge question={question} answer={answer} resolve={resolve} isExam={isExam} order={order} />
    );
  } else if (question.type === '3') {
    return (
      <Write question={question} answer={answer} resolve={resolve} isExam={isExam} order={order} />
    );
  }
};
export default Question;
