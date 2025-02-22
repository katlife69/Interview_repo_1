import { AxiosRequestConfig } from "axios";
import { HTTP_SERVICE } from "../../config/axios.config";
import { IJobDto } from "../../interface/job/job.dto";

const PATH = "jobs";

export const getListJobsApi = (params = {}, ignoreSpinner = false) => {
  return HTTP_SERVICE.get<IJobDto[]>(`${PATH}`, {
    ignoreSpinner,
    params,
  } as AxiosRequestConfig);
};

export const getJobByIdApi = (id, ignoreSpinner = false) => {
  return HTTP_SERVICE.get<IJobDto>(`${PATH}/${id}`, {
    ignoreSpinner,
  } as AxiosRequestConfig);
};

export const addJobApi = (body: any, ignoreSpinner = false) => {
  return HTTP_SERVICE.post<IJobDto[]>(`${PATH}`, body, {
    ignoreSpinner,
  } as AxiosRequestConfig);
};

export const updateJobApi = (id: string, body: any, ignoreSpinner = false) => {
  return HTTP_SERVICE.put<IJobDto[]>(`${PATH}/${id}`, body, {
    ignoreSpinner,
  } as AxiosRequestConfig);
};

export const deleteJobApi = (id: string, ignoreSpinner = false) => {
  return HTTP_SERVICE.delete<IJobDto[]>(`${PATH}/${id}`, {
    ignoreSpinner,
  } as AxiosRequestConfig);
};
