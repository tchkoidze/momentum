"use client";
import {
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "@/api/getAPI";
import { Data, Department, Employee, Priority, Status } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronDownOutline } from "react-icons/io5";
import { addTaskSchema } from "./taskSchema";
import { addTask } from "@/api/updateAPI";
import { useModal } from "../ModalContext";
import { useRouter } from "next/navigation";

const CreateTask = () => {
  const router = useRouter();
  const { showAddEmployeeMOdal, setShowAddEmployeeMOdal } = useModal();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dropdownDepartments, setDropdownDepartments] = useState(false);
  const [dropDownPriorities, setDropdownPriorities] = useState(false);
  const [dropDownStatus, setDropdownStatus] = useState(false);
  const [dropdownEmployee, setDropdownEmployee] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);

  const [data, setData] = useState<Data>({
    name: "",
    description: null,
    due_date: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    status_id: "",
    department_id: "",
    employee_id: "",
    priority_id: "",
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      due_date: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const allDepartments = await getDepartments();
        setDepartments(allDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchPriorities = async () => {
      try {
        const response = await getPriorities();
        setPriorities(response);
      } catch (error) {
        console.error("Error fetching priorities:", error);
      }
    };
    const fetchStatuses = async () => {
      try {
        const response = await getStatuses();
        console.log("status: ", response);
        setStatuses(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchDepartments();
    fetchPriorities();
    fetchStatuses();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        console.log("emplyee: ", response);
        setEmployees(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [showAddEmployeeMOdal]);

  useEffect(() => {
    if (priorities.length > 0 && statuses.length > 0) {
      const priorityId =
        priorities.find((p) => p.id === 2)?.id.toString() ?? "";
      const statusId =
        statuses.find((s) => s.name === "დასაწყები")?.id.toString() ?? "";

      if (!data?.priority_id) {
        setValue("priority_id", priorityId);
        setData((prevData) => ({
          ...prevData,
          priority_id: priorityId,
        }));
      }

      if (!data?.status_id) {
        setValue("status_id", statusId);
        setData((prevData) => ({
          ...prevData,
          status_id: statusId,
        }));
      }
    }
  }, [priorities, statuses, setValue]);

  const handleInputChange = (fieldName: string, value: string) => {
    // setData(
    //   (prevData) =>
    //     ({
    //       ...prevData,
    //       [fieldName]: value,
    //     } as Data)
    // );
    setData((prevData) => {
      let updatedData = { ...prevData, [fieldName]: value };

      if (fieldName === "department_id") {
        updatedData.employee_id = "";
      }

      return updatedData as Data;
    });
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("createdTasktData")!);
    if (storedData) {
      setData(storedData);
      setValue("name", storedData.name);
      setValue("due_date", storedData.due_date);
      setValue("status_id", storedData.status_id);
      setValue("department_id", storedData.department_id);
      setValue("employee_id", storedData.employee_id);
      setValue("priority_id", storedData.priority_id);
      setValue("description", storedData.description);
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("createdTasktData", JSON.stringify(data));
  }, [data]);

  const onSubmit = async (taskData: Data) => {
    console.log("task data: ", taskData);

    const formData = {
      name: taskData.name,

      due_date: taskData.due_date,
      status_id: taskData.status_id,
      department_id: taskData.department_id,
      employee_id: taskData.employee_id,
      priority_id: taskData.priority_id,
      ...(taskData.description && { description: taskData.description }),
    };

    console.log("task data: ", formData);

    try {
      const res = await addTask(formData);
      if (res && res.status >= 200 && res.status < 300)
        localStorage.removeItem("createdTasktData");
      setData({
        name: "",
        description: null,
        due_date: new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split("T")[0],
        status_id: "",
        department_id: "",
        employee_id: "",
        priority_id: "",
      });
      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[1920px] px-[120px] mx-auto">
      <h1 className="font-semibold text-[34px] text-[#212529] mt-10 mb-6">
        შექმენი ახალი დავალება
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[1684px] bg-[#FBF9FFA6] border-[0.3px] border-[#DDD2FF] px-[55px] pt-[65px]"
      >
        <div className="grid grid-cols-2 gap-[161px] w-[1261px]">
          <div className="space-y-[55px]">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="firago-regular text-base text-[#343A40]"
              >
                სათაური*
              </label>
              <input
                id="title"
                type="text"
                className="firago-light text-sm text-[#0D0F10] bg-white border border-[#CED4DA] outline-none rounded-md p-2.5 mt-1"
                {...register("name", {
                  onChange: (e) => handleInputChange("name", e.target.value),
                })}
              />
              <div>
                <p>{errors.name?.message}</p>
                <p
                  className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                    dirtyFields.name && errors.name
                      ? "text-[#FA4D4D]"
                      : dirtyFields.name
                      ? "text-[#08A508]"
                      : ""
                  }`}
                >
                  სავალდებულო
                </p>
                <p
                  className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                    dirtyFields.name && errors.name
                      ? "text-[#FA4D4D]"
                      : dirtyFields.name
                      ? "text-[#08A508]"
                      : ""
                  }`}
                >
                  მინიმუმ 2 სიმბოლო
                </p>
                <p
                  className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                    dirtyFields.name && errors.name
                      ? "text-[#FA4D4D]"
                      : dirtyFields.name
                      ? "text-[#08A508]"
                      : ""
                  }`}
                >
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <label
                htmlFor="description"
                className="firago-regular text-base text-[#343A40]"
              >
                აღწერა
              </label>
              <textarea
                id="description"
                rows={6}
                className="firago-light text-sm text-[#0D0F10] bg-white resize-none outline-none border border-[#DEE2E6] rounded-md p-[14px] mt-1"
                {...register("description", {
                  onChange: (e) =>
                    handleInputChange("description", e.target.value),
                })}
              ></textarea>
              <div>
                <p>{errors.description?.message}</p>
                <p
                  className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                    dirtyFields.description && errors.description
                      ? "text-[#FA4D4D]"
                      : dirtyFields.description
                      ? "text-[#08A508]"
                      : ""
                  }`}
                >
                  არასავალდებულო
                </p>
                <p
                  className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                    dirtyFields.description && errors.description
                      ? "text-[#FA4D4D]"
                      : dirtyFields.description
                      ? "text-[#08A508]"
                      : ""
                  }`}
                >
                  მინიმუმ 4 სიტყვა
                </p>
                <p
                  className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                    dirtyFields.description && errors.description
                      ? "text-[#FA4D4D]"
                      : dirtyFields.description
                      ? "text-[#08A508]"
                      : ""
                  }`}
                >
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>
            <div className="w-full flex gap-8">
              <div className="w-1/2">
                <p className="font-regular text-base text-[#343A40] mb-1">
                  პრიორიტეტი*
                </p>
                <div className="relative h-[45px] mt-1">
                  <div className="absolute w-full border border-[#CED4DA] rounded-[5px] bg-white">
                    <button
                      type="button"
                      onClick={() => setDropdownPriorities(!dropDownPriorities)}
                      className="w-full flex items-center justify-between text-sm font-light text-[#0D0F10] p-[14px] cursor-pointer"
                    >
                      {data?.priority_id
                        ? (() => {
                            const priority = priorities.find(
                              (p) => p.id.toString() === data?.priority_id
                            );
                            return priority ? (
                              <p className="flex items-center gap-2">
                                <Image
                                  src={priority.icon}
                                  alt="priority-icon"
                                  width={16}
                                  height={18}
                                />{" "}
                                {priority.name}
                              </p>
                            ) : (
                              ""
                            );
                          })()
                        : ""}
                      <IoChevronDownOutline
                        size={14}
                        className={`${
                          dropDownPriorities && "rotate-180 ml-auto"
                        } ml-auto`}
                      />
                    </button>
                    {dropDownPriorities && (
                      <ul>
                        {priorities.map((priority) => (
                          <li
                            key={priority.id}
                            className="h-[40.5px] w-full block"
                          >
                            <label
                              htmlFor={`${priority.id}`}
                              className="w-full block text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                            >
                              <input
                                type="radio"
                                id={`${priority.id}`}
                                value={priority.id}
                                {...register("priority_id")}
                                onClick={(e) => {
                                  setDropdownPriorities(false);
                                  handleInputChange(
                                    "priority_id",
                                    e.currentTarget.value
                                  );
                                }}
                                className="hidden"
                              />
                              <p className="flex items-center gap-2">
                                <Image
                                  src={priority.icon}
                                  alt="priority-icon"
                                  width={16}
                                  height={18}
                                />
                                {priority.name}
                              </p>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <p className="font-regular text-base text-[#343A40] mb-1">
                  სტატუსი*
                </p>
                <div className="relative h-[45px]">
                  <div className="absolute w-full border border-[#CED4DA] rounded-[5px] bg-white">
                    <button
                      type="button"
                      onClick={() => setDropdownStatus(!dropDownStatus)}
                      className="w-full flex items-center justify-between text-sm font-light text-[#0D0F10] p-[14px]  cursor-pointer"
                    >
                      {data?.status_id
                        ? statuses.find(
                            (s) => s.id.toString() === data?.status_id
                          )?.name
                        : ""}
                      <IoChevronDownOutline
                        size={14}
                        className={`${dropDownStatus && "rotate-180"} ml-auto`}
                      />
                    </button>
                    {dropDownStatus && (
                      <ul>
                        {statuses.map((status) => (
                          <li
                            key={status.id}
                            className="h-[40.5px] w-full block"
                          >
                            <label
                              htmlFor={`${status.id}`}
                              className="w-full block text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                            >
                              <input
                                type="radio"
                                id={`${status.id}`}
                                value={status.id}
                                {...register("status_id")}
                                onClick={(
                                  e: React.MouseEvent<HTMLInputElement>
                                ) => {
                                  setDropdownStatus(false);
                                  handleInputChange(
                                    "status_id",
                                    e.currentTarget.value
                                  );
                                }}
                                className="hidden"
                              />
                              <p className="flex items-center gap-2">
                                {status.name}
                              </p>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <p className="font-regular text-base text-[#343A40] mb-1">
                დეპარტამენტი*
              </p>
              <div className="relative h-[45px]">
                <div className="absolute z-10 w-full border border-[#CED4DA] rounded-[5px] bg-white">
                  <button
                    type="button"
                    onClick={() => setDropdownDepartments(!dropdownDepartments)}
                    className="w-full flex items-center justify-between text-sm font-light text-[#0D0F10] p-[14px] cursor-pointer"
                  >
                    {data?.department_id
                      ? departments.find(
                          (d) => d.id.toString() === data.department_id
                        )?.name
                      : ""}
                    <IoChevronDownOutline
                      size={14}
                      className={`${
                        dropdownDepartments && "rotate-180"
                      } ml-auto`}
                    />
                  </button>
                  {dropdownDepartments && (
                    <ul>
                      {departments.map((department) => (
                        <li
                          key={department.id}
                          className="h-[40.5px] w-full block"
                        >
                          <label
                            htmlFor={`${department.id}`}
                            className="w-full block text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                          >
                            <input
                              type="radio"
                              id={`${department.id}`}
                              value={department.id}
                              {...register("department_id", {
                                onChange: (e) =>
                                  handleInputChange(
                                    "department_id",
                                    e.currentTarget.value
                                  ),
                              })}
                              onClick={(
                                e: React.MouseEvent<HTMLInputElement>
                              ) => {
                                setDropdownDepartments(false);
                                setSelectedDepartment(e.currentTarget.value);
                                // handleInputChange(
                                //   "department_id",
                                //   e.currentTarget.value
                                // );
                              }}
                              className="hidden"
                            />
                            {department.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-[100px]">
              <div className={`${data?.department_id ? "block" : "hidden"}`}>
                <p
                  className={`font-medium text-base ${
                    data?.department_id ? "text-[#343A40]" : "text-[#ADB5BD]"
                  } mb-1`}
                >
                  პასუხისმგებელი თანამშრომელი*
                </p>
                <div className="relative h-[45px]">
                  <div className="absolute w-full border border-[#CED4DA] rounded-[5px] bg-white">
                    <button
                      type="button"
                      onClick={() => setDropdownEmployee(!dropdownEmployee)}
                      className="w-full flex items-center justify-between text-sm font-light text-[#0D0F10] p-[14px] cursor-pointer"
                    >
                      {data?.employee_id
                        ? (() => {
                            const employee = employees.find(
                              (em) => em.id.toString() === data?.employee_id
                            );
                            return employee
                              ? `${employee.name} ${employee.surname}`
                              : "";
                          })()
                        : ""}
                      <IoChevronDownOutline
                        size={14}
                        className={`${dropdownEmployee && "rotate-180"} ${
                          data?.department_id
                            ? "text-[#343A40]"
                            : "text-[#ADB5BD]"
                        } ml-auto`}
                      />
                    </button>
                    {data?.department_id && dropdownEmployee && (
                      <ul className="max-h-[276px] overflow-y-scroll">
                        <li>
                          <button
                            type="button"
                            onClick={() => setShowAddEmployeeMOdal(true)}
                            className="w-full flex items-center gap-2 text-xs text-[#8338EC] px-2.5 py-2.5 cursor-pointer"
                          >
                            <Image
                              src="/plus-circle.svg"
                              alt="plus image"
                              width={18}
                              height={18}
                            />
                            დაამატე თანამშრომელი
                          </button>
                        </li>
                        {employees
                          .filter(
                            (employee) =>
                              employee.department.id.toString() ===
                              data?.department_id
                          )
                          .map((employee) => (
                            <li
                              key={employee.id}
                              className="h-fit w-full block"
                              // className="text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                            >
                              <label
                                htmlFor={`${employee.id}`}
                                className="w-full h-[46px] block text-[11px] font-light text-[#0D0F10] cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id={`${employee.id}`}
                                  value={employee.id}
                                  {...register("employee_id")}
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => {
                                    setDropdownEmployee(false);
                                    //setSelectedDepartment(e.currentTarget.value);
                                    handleInputChange(
                                      "employee_id",
                                      e.currentTarget.value
                                    );
                                  }}
                                  className="hidden"
                                />
                                <div className="flex items-center gap-2.5 p-2">
                                  <div className="w-[28px] h-[28px]">
                                    <Image
                                      src={employee.avatar}
                                      alt="avatar"
                                      width={28}
                                      height={28}
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  </div>

                                  <p>
                                    {employee.name} {employee.surname}
                                  </p>
                                </div>
                              </label>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <label
                htmlFor="date"
                className="w-full block font-medium text-base text-[#343A40] mb-1"
              >
                დედლაინი
              </label>
              <input
                type="date"
                id="date"
                className="w-full font-light text-sm border border-[#CED4DA] outline-none rounded-md px-2.5 py-[14px] cursor-pointer"
                {...register("due_date", {
                  onChange: (e) =>
                    handleInputChange("due_date", e.currentTarget.value),
                })}
                min={new Date().toISOString().split("T")[0]}
              />
              <p
                className={`font-[350] text-[10px] text-[#6C757D] ${
                  dirtyFields.due_date && errors.due_date
                    ? "text-[#FA4D4D]"
                    : dirtyFields.description
                    ? "text-[#08A508]"
                    : ""
                }`}
              >
                {errors.due_date?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[1261px] flex justify-end mt-[147px] mb-[62px]">
          <button className="h-[42px] text-white bg-[#8338EC] hover:bg-[#B588F4] focus:bg-[#B588F4] text-lg rounded-md px-5  cursor-pointer">
            დავალების შექმნა
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
