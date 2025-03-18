//https://momentum.redberryinternship.ge/api
const apiToken = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN;

import axios from "axios";
const API_BASE_URL = "https://momentum.redberryinternship.ge/api";

export const getDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments`);
  return response.data;
};

export const getPriorities = async () => {
  const response = await axios.get(`${API_BASE_URL}/priorities`);
  return response.data;
};

export const getEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return response.data;
};

export const getStatuses = async () => {
  const response = await axios.get(`${API_BASE_URL}/statuses`);
  return response.data;
};

export const getAllTask = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  console.log("task cc :", response.data);
  return response.data;
};

export const getComments = async (task: number) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${task}/comments`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return response.data;
};
