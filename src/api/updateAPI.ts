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
    // {
    //   text: "პრიორიტეტი მიენიჭება ვანილა react-ით დაწერას?",
    //   //parent_id: 1,
    // },
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
