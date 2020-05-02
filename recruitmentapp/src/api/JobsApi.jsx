import { config } from "./config.json";
import axios from "axios";

//GET all jobs only for admin
export const getAllCompanyJobs = ({ token, count, page }) => {
  const options = {
    url: `${config.BASE_API_URL}jobs/all?count=${count || ""}&page=${
      page || ""
    }`,
    method: "GET",
    headers: {
      Accept: "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//Get all jobs for company role
export const getCompanyJobs = ({ token }) => {
  const options = {
    url: config.BASE_API_URL + "jobs",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(options);
};

//GET by ID
export const getJobById = ({ TOKEN, id }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axios(options);
};

//POST
export const postJob = ({ TOKEN, job }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: job,
  };
  return axios(options);
};

//PUT
export const putJob = ({ TOKEN, id, job }) => {
  const options = {
    url: config.BASE_API_URL + "jobs/" + id,
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: job,
  };
  return axios(options);
};
