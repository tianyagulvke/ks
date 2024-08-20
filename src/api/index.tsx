import { get, post } from "@/utils/request";

export const getAnswerRecordPage = (data?: object) =>
  post("/answer/getAnswerRecordPage", data);

export const readShortAnswerList = (data?: object) =>
  post("/answer/readShortAnswerList", data);

export const readAnswerDetail = (data?: object) =>
  post("/answer/readAnswerDetail", data);
