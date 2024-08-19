import { Question as QuestionType, Answer, Resolve } from './type';
import { useState, useEffect } from 'react';
import Question from './components/Question';
import { Row, Button, Divider, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Countdown } = Statistic;

const Exam = () => {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
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
      answer: '',
    },
    {
      questionId: 2,
      answer: '',
    },
    {
      questionId: 3,
      answer: '',
    },
  ];
  const [qusetionList, setQuestionList] = useState(myQuestionList);
  const [answerList, setAnswerList] = useState(myAnswerList);
  const [nowIndex, setNowIndex] = useState(0);
  const deadline = Date.now() + 1000 * 60 * 30 + 1000;
  const [deadLine, setDeadLine] = useState(deadline);
  const resolve = (index: number, value: string | number) => {
    const newAnswerList = [...answerList];
    newAnswerList[index].answer = value;
    setAnswerList(newAnswerList);
  };
  const startExam = () => {
    setIsStart(true);
    // if (!localStorage.getItem('startKsTime')) {
    //   localStorage.setItem('startKsTime', JSON.stringify(new Date()));
    //   setDeadLine(deadline);
    // }
  };
  if (isStart) {
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
              <Countdown title="剩余时间" value={deadLine} format="HH:mm:ss" />
              <Button
                type="primary"
                onClick={() => {
                  console.log(answerList);
                  navigate('/success', {
                    replace: true,
                  });
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
      </div>
    );
  } else {
    return (
      <Button type="primary" onClick={startExam}>
        开始考试
      </Button>
    );
  }
};
export default Exam;
