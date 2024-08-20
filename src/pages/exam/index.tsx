import { Question as QuestionType, Answer, Resolve } from './type';
import { useState, useEffect } from 'react';
import Question from './components/Question';
import { Row, Button, Divider, Statistic, Card, Form, Radio, InputNumber, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getImpQues, submitImpQues } from '@/api';
import { use } from 'echarts/types/src/extension.js';

const { Countdown } = Statistic;

const Exam = () => {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const myQuestionList: QuestionType[] = [];
  const myAnswerList: Answer[] = [];
  const [qusetionList, setQuestionList] = useState(myQuestionList);
  const [answerList, setAnswerList] = useState(myAnswerList);
  const [nowIndex, setNowIndex] = useState(0);
  const deadline = Date.now() + 1000 * 60 * 30 + 1000;
  const [deadLine, setDeadLine] = useState(deadline);
  const [email, setEmail] = useState('');
  const resolve = (index: number, value: string | number) => {
    const newAnswerList = [...answerList];
    newAnswerList[index].answer = value;
    setAnswerList(newAnswerList);
  };
  const tranQuestion = (sruveyList: any[]) => {
    const quesList = [];
    const ansList = [];
    for (const sruvey of sruveyList) {
      for (const key in sruvey) {
        const item = sruvey[key];
        const ques = {};
        const ans = {};
        ques.choices = [];
        let type = '0';
        for (const liItem of item) {
          if (liItem.typeId === 1 || liItem.typeId === 2) {
            type = '1';
          } else if (liItem.typeId === 4) {
            type = '2';
          } else if (liItem.typeId === 5) {
            type = '3';
          }
          ques.id = liItem.id;
          ans.questionId = liItem.id;
          ans.answer = '';
          ans.typeId = liItem.typeId;
          ques.title = liItem.question;
          ques.type = type;
          ques.choices.push(liItem.qoption);
        }
        quesList.push(ques);
        ansList.push(ans);
      }
    }
    console.log(quesList);
    return [quesList, ansList];
  };
  const [surverId, setSurveyId] = useState();
  const startExam = async () => {
    const res = await examForm.validateFields();
    console.log(res);
    // setIsStart(true);
    // setEmail(res.email);
    console.log(email, 'email');
    const data = {
      post: res.station,
      name: res.userName,
      gender: res.gender,
      phone: res.phone,
      // email: res.email,
      // startDate: new Date(),
    };
    const respons = await getImpQues(data);
    console.log(respons, 'response');
    if (respons) {
      if (respons.data.code === 200) {
        setIsStart(true);
        setSurveyId(respons.data.data.surveyId);
        const [quelist, anslist] = tranQuestion(respons.data.data.surveyList);
        setQuestionList(quelist);
        setAnswerList(anslist);
      }
    }
    // if (!localStorage.getItem('startKsTime')) {
    //   localStorage.setItem('startKsTime', JSON.stringify(new Date()));
    //   setDeadLine(deadline);
    // }
  };
  const getEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const [examForm] = Form.useForm();
  const subMethod = () => {
    console.log(answerList);
    const data = {};
    data.surveyId = surverId;
    data.retList = [{}];
    for (const item of answerList) {
      data.retList[0][item.questionId] = item.answer;
    }
    console.log(data);
    submitImpQues(data).then((res) => {
      if (res.data.code === 200) {
        navigate('/success', {
          replace: true,
        });
      }
    });
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
              <Button type="primary" onClick={subMethod}>
                提交
              </Button>
            </Row>
          </div>
          {qusetionList.map(
            (_, index) =>
              nowIndex === index && (
                <Question
                  order={index + 1}
                  key={qusetionList[index].id}
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
      <Card style={{ width: '100%', height: 'calc(100vh - 112px)', padding: '10px' }}>
        {/* <h2 style={{ fontSize: '30px', lineHeight: '50px' }}>题目配置</h2> */}
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          labelAlign="left"
          form={examForm}
        >
          <Form.Item
            label="应聘岗位"
            name="station"
            rules={[{ required: true, message: '请输入岗位配置!' }]}
          >
            <Radio.Group value={'java'}>
              <Radio value={'2'}>Java后端</Radio>
              <Radio value={'4'}>需求分析</Radio>
              <Radio value={'3'}>web前端</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="姓名"
            name="userName"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="性别"
            name="gender"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: '请输入性别!' }]}
          >
            <Radio.Group value={'男'}>
              <Radio value={'男'}>男</Radio>
              <Radio value={'女'}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            wrapperCol={{ span: 10 }}
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input style={{ width: '100%' }} onChange={getEmail} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={startExam}>
              开始考试
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
};
export default Exam;
