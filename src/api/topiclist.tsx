import { get, post, axiosInstance } from "@/utils/request";
export const getQuestionList = (data?: object) =>
  post("/survey/getQuestionList", data);

export const deleteBatch = (data?: object) =>
  post(`/survey/deleteBatch?qIds=${data}`);
