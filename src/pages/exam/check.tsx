import { Question as QuestionType, Answer, Resolve } from './type';
import { useState } from 'react';
import Question from './components/Question';
import { Row, Button, Input } from 'antd';
const Check = () => {
  const myQuestionList: QuestionType[] = [
    {
      id: 1,
      type: '1',
      title: '1+1=?',
      choices: ['1', '2', '3', '4'],
    },
    {
      id: 2,
      type: '2',
      title: '1+1=2?',
    },
    {
      id: 3,
      type: '3',
      title: '1+1=?',
    },
  ];
  const myAnswerList: Answer[] = [
    {
      questionId: 1,
      answer: '1',
    },
    {
      questionId: 2,
      answer: '2',
    },
    {
      questionId: 3,
      answer: '3',
    },
  ];
  const checkList: string[] = ['', '', ''];
  const [qusetionList, setQuestionList] = useState(myQuestionList);
  const [answerList, setAnswerList] = useState(myAnswerList);
  const [nowIndex, setNowIndex] = useState(0);
  const [resultList, setResultList] = useState(checkList);
  const resolve = (index: number, value: string | number) => {
    const newAnswerList = [...answerList];
    newAnswerList[index].answer = value;
    setAnswerList(newAnswerList);
  };
  const checkResult = (e) => {
    const resultListCopy = [...resultList];
    resultListCopy[nowIndex] = e.target.value;
    setResultList(resultListCopy);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 'calc(100vh - 112px)',
      }}
    >
      <div>
        <div style={{ marginBottom: '10px' }}>
          <Row justify="space-between">
            <div>考试</div>
            <Button
              type="primary"
              onClick={() => {
                console.log(answerList);
              }}
            >
              提交
            </Button>
          </Row>
        </div>
        {qusetionList.map(
          (_, index) =>
            nowIndex === index && (
              <Question
                isExam={false}
                key={index}
                question={qusetionList[index]}
                answer={answerList[index]}
                resolve={(value) => {
                  resolve(index, value);
                }}
              />
            )
        )}
      </div>
      <Row>
        <Row>
          <Input placeholder="Basic usage" value={resultList[nowIndex]} onChange={checkResult} />
        </Row>
        <Row justify="space-between">
          <Button
            disabled={nowIndex === 0}
            type="primary"
            onClick={() => {
              setNowIndex(nowIndex - 1);
            }}
          >
            上一题
          </Button>
          <Button
            type="primary"
            disabled={nowIndex === qusetionList.length - 1}
            onClick={() => {
              setNowIndex(nowIndex + 1);
            }}
          >
            下一题
          </Button>
        </Row>
      </Row>
    </div>
  );
};
export default Check;
