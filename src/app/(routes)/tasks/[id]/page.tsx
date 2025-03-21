"use client";
import { getStatuses, getTaskById } from "@/api/getAPI";
import { updateStatuse } from "@/api/updateAPI";
import { Status, Task } from "@/types/type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPieChart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { PiCalendarBlankBold } from "react-icons/pi";
import Comments from "./Comments";

const dayMap: Record<string, string> = {
  Mon: "ორშ",
  Tue: "სამ",
  Wed: "ოთხ",
  Thu: "ხუთ",
  Fri: "პარ",
  Sat: "შაბ",
  Sun: "კვი",
};

const TaskBYId = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const params = useParams();
  const taskIdFromParams = params.id as string;
  const taskId = taskIdFromParams;

  // color rendomizer
  const colors = ["#FFD86D", "#89B6FF", "#FD9A6A", "#FF66A8"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await getStatuses();
        console.log("status: ", response);
        setStatuses(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchStatuses();
  }, []);

  const getTask = async (taskId: string) => {
    setLoading(true);
    setFetchError(null);
    try {
      const response = await getTaskById(taskId);
      console.log(response.data);
      setTask(response);
    } catch (error) {
      console.error("Error fetching listing:", error);
      setFetchError(`Error fetching listing- ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      getTask(taskId);
    }
  }, [taskId]);

  const updateTaskStatus = async (id: string, status_id: number) => {
    try {
      const response = await updateStatuse(id, status_id);
      if (!response) {
        throw new Error("Response is undefined or null");
      }
      console.log(response);
      setTask(response);
      setDropdownStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading ... </div>;
  }
  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  return (
    <div className="flex gap-[223px] mt-10 mb-[100px] w-[1920px] px-[120px] mx-auto">
      {task && (
        <div className="w-[715px]">
          <div className="mb-[63px]">
            <div className="flex gap-2.5 flex-wrap items-center">
              <div
                className={`flex items-center gap-1 text-xs font-medium border-[0.5px] ${
                  task.priority.name === "დაბალი"
                    ? "text-[#08A508] border-[#08A508]"
                    : task.priority.name === "საშუალო"
                    ? "text-[#FFBE0B] border-[#FFBE0B]"
                    : "text-[#FA4D4D] border-[#FA4D4D]"
                } py-1 pl-1 pr-[14px] p rounded-[5px]`}
              >
                <Image
                  src={task.priority.icon}
                  alt="task_priority_icon"
                  width={16}
                  height={18}
                />
                <p>{task.priority.name}</p>
              </div>
              <p
                style={{ backgroundColor: randomColor }}
                className="w-fit flex items-center text-[12px]  text-white rounded-2xl px-4 py-1"
              >
                {task.department.name}
              </p>
            </div>
            <h1 className="text-[43px] font-semibold mt-3 mb-6">{task.name}</h1>
            <p className="text-lg">{task.description}</p>
          </div>

          <div>
            <h3 className="font-medium text-2xl text-[#2A2A2A] mb-[18px]">
              დავალების დეტალები
            </h3>
            <div className="flex justify-between">
              <p className="flex gap-1 items-center text-base text-[#474747] my-[23px]">
                <FiPieChart color="#474747" size={24} /> სტატუსი
              </p>

              <div className="relative w-[259px] h-[45px]">
                <div className="absolute w-full border border-[#CED4DA] rounded-[5px] bg-white">
                  <button
                    onClick={() => setDropdownStatus(!dropdownStatus)}
                    className="w-full flex items-center justify-between text-[11px] font-light text-[#0D0F10] p-[14px]"
                  >
                    {task.status.name}
                    <IoChevronDownOutline
                      size={14}
                      className={`${dropdownStatus && "rotate-180"}`}
                    />
                  </button>
                  {dropdownStatus && (
                    <ul>
                      {statuses.map((status) => (
                        <li
                          onClick={() =>
                            updateTaskStatus(task.id.toString(), status.id)
                          }
                          key={status.id}
                          className="text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                        >
                          {status.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="flex gap-1 items-center text-base text-[#474747] my-[23px]">
                <FiUser size={24} />
                თანამშრომელი
              </p>
              <div className="flex gap-3 h-fit my-[14px]">
                <div className="w-[32px] h-[32px] mt-auto">
                  <Image
                    src={task.employee.avatar}
                    alt="employee avatar"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="font-light text-[11px] text-[#474747]">
                    {task.employee.department.name}
                  </p>
                  <p className="text-[14px] text-[#0D0F10]">
                    {task.employee.name} {task.employee.surname}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex gap-1 items-center text-base text-[#474747] my-[23px]">
                <PiCalendarBlankBold size={24} />
                დავალების ვადა
              </p>
              <p className="text-[14px] text-[#0D0F10]">
                {new Intl.DateTimeFormat("ka-GE", {
                  weekday: "short", // abbreviated weekday name (e.g., ორშ)
                  day: "2-digit", // 2-digit day (e.g., 02)
                  month: "numeric", // numeric month (e.g., 2)
                  year: "numeric", // 4-digit year (e.g., 2025)
                })
                  .format(new Date(task.due_date))
                  .replace(
                    /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/g,
                    (match) => dayMap[match]
                  )}
              </p>
            </div>
          </div>
        </div>
      )}
      {task && <Comments task={task?.id} />}
    </div>
  );
};
export default TaskBYId;
