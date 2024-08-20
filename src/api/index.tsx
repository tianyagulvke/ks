import { get, post } from '@/utils/request';

// 生成试卷
export const getImpQues = async (data: any) => {
  return post('/answer/generateSurvey', data);
};

// 提交试卷
export const submitImpQues = async (data: any) => {
  return post('/answer/commitSurvey', data);
};

export const getAnswerRecordPage = (data?: object) => post('/answer/getAnswerRecordPage', data);

export const readShortAnswerList = (data?: object) => post('/answer/readShortAnswerList', data);

export const readAnswerDetail = (data?: object) => post('/answer/readAnswerDetail', data);
