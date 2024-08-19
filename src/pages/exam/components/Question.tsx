import { Question as QuestionType, Answer, Resolve } from '../type';
import SingleChoice from './SingleChoice';
import Judge from './Judge';
import Write from './Write';
const Question = ({
  question,
  answer,
  resolve,
  isExam = true,
}: {
  question: QuestionType;
  answer: Answer;
  resolve: Resolve;
  isExam: boolean;
}) => {
  if (question.type === '1') {
    return <SingleChoice question={question} answer={answer} resolve={resolve} isExam={isExam} />;
  } else if (question.type === '2') {
    return <Judge question={question} answer={answer} resolve={resolve} isExam={isExam} />;
  } else if (question.type === '3') {
    return <Write question={question} answer={answer} resolve={resolve} isExam={isExam} />;
  }
};
export default Question;
