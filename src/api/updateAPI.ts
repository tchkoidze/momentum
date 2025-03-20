import { Data } from "@/types/type";
import axios from "axios";
const apiToken = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN;

const API_BASE_URL = "https://momentum.redberryinternship.ge/api";

export const updateStatuse = async (id: string, status_id: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/tasks/${id}`,
    {
      status_id: status_id,
    },
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const addComment = async (
  task: number,
  data: { text: string; parent_id?: number }
) => {
  const response = await axios.post(
    `${API_BASE_URL}/tasks/${task}/comments`,

    data,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const addEmployee = async (formData: FormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/employees
`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  // console.log(response);

  return response;
};

export const addTask = async (formData: Data) => {
  const response = await axios.post(
    `${API_BASE_URL}/tasks

`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  console.log(response);

  return response;
};
