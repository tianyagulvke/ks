import { get, post, axiosInstance } from "@/utils/request";
export const countDay = (data?: object) => post("/holiday/countDay", data);
export const manualSet = (data?: object) => post("/holiday/manualSet", data);
