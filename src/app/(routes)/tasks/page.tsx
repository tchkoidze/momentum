"use client";
import {
  getAllTask,
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "@/api/getAPI";
import CreateEmployee from "@/app/components/CreateEmployee";
import TaskCard from "@/app/components/TaskCard";
import {
  Department,
  Employee,
  Filters,
  Priority,
  Status,
  Task,
} from "@/types/type";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoChevronDownOutline, IoCloseOutline } from "react-icons/io5";

const initialFilters: Filters = {
  departments: [],
  // employee: null,
  employee: undefined,
  priorities: [],
};

const Tasks = () => {
  const [openFilter, setOpenFilter] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [departmentSelector, setDepartmentSelector] = useState<string[]>([]);
  const [employeeSelector, setEmployeeSelector] = useState<
    { id: number; name: string; surname: string } | undefined
  >(undefined);
  const [prioritySelector, setPrioritySelector] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // const [departmentSelector, setDepartmentSelector] = useState<string[]>(() => {
  //   const storedDepartments = sessionStorage.getItem("departmentSelector");
  //   try {
  //     const parsedDepartments = storedDepartments
  //       ? JSON.parse(storedDepartments)
  //       : [];
  //     return Array.isArray(parsedDepartments) ? parsedDepartments : [];
  //   } catch (error) {
  //     console.error("Error parsing stored prioritySelector:", error);
  //     return [];
  //   }
  // });

  // const [employeeSelector, setEmployeeSelector] = useState<
  //   { id: number; name: string; surname: string } | undefined
  // >(() => {
  //   const storedEmployee = sessionStorage.getItem("employeeSelector");
  //   return storedEmployee ? JSON.parse(storedEmployee) : undefined;
  // });

  // const [prioritySelector, setPrioritySelector] = useState<string[]>(() => {
  //   const storedPriority = sessionStorage.getItem("prioritySelector");
  //   // storedPriority ? JSON.parse(storedPriority) : [];
  //   try {
  //     const parsedPriority = storedPriority ? JSON.parse(storedPriority) : [];
  //     return Array.isArray(parsedPriority) ? parsedPriority : [];
  //   } catch (error) {
  //     console.error("Error parsing stored prioritySelector:", error);
  //     return [];
  //   }
  // });

  // const [filters, setFilters] = useState<Filters>(() => {
  //   const storedFilters = sessionStorage.getItem("filters");
  //   return storedFilters ? JSON.parse(storedFilters) : initialFilters;
  // });

  useEffect(() => {
    // For departmentSelector
    const storedDepartments = sessionStorage.getItem("departmentSelector");
    if (
      storedDepartments &&
      storedDepartments !== "undefined" &&
      storedDepartments !== ""
    ) {
      try {
        const parsedDepartments = JSON.parse(storedDepartments);
        setDepartmentSelector(
          Array.isArray(parsedDepartments) ? parsedDepartments : []
        );
      } catch (error) {
        console.error("Error parsing stored departmentSelector:", error);
      }
    }

    // For employeeSelector
    const storedEmployee = sessionStorage.getItem("employeeSelector");
    if (
      storedEmployee &&
      storedEmployee !== "undefined" &&
      storedEmployee !== ""
    ) {
      try {
        const parsedEmployee = JSON.parse(storedEmployee);
        setEmployeeSelector(parsedEmployee);
      } catch (error) {
        console.error("Error parsing stored employeeSelector:", error);
      }
    }

    // For prioritySelector
    const storedPriority = sessionStorage.getItem("prioritySelector");
    if (
      storedPriority &&
      storedPriority !== "undefined" &&
      storedPriority !== ""
    ) {
      try {
        const parsedPriority = JSON.parse(storedPriority);
        setPrioritySelector(
          Array.isArray(parsedPriority) ? parsedPriority : []
        );
      } catch (error) {
        console.error("Error parsing stored prioritySelector:", error);
      }
    }

    // For filters
    const storedFilters = sessionStorage.getItem("filters");
    if (
      storedFilters &&
      storedFilters !== "undefined" &&
      storedFilters !== ""
    ) {
      try {
        const parsedFilters = JSON.parse(storedFilters);
        setFilters(parsedFilters);
        setDepartmentSelector(parsedFilters.departments);
        setPrioritySelector(parsedFilters.priorities);
        parsedFilters.employee ?? setEmployeeSelector(parsedFilters.employee);
      } catch (error) {
        console.error("Error parsing stored filters:", error);
      }
    }
  }, []);
  // useEffect(() => {
  //   // For departmentSelector
  //   const storedDepartments = sessionStorage.getItem("departmentSelector");
  //   if (storedDepartments) {
  //     try {
  //       const parsedDepartments = JSON.parse(storedDepartments);
  //       setDepartmentSelector(
  //         Array.isArray(parsedDepartments) ? parsedDepartments : []
  //       );
  //     } catch (error) {
  //       console.error("Error parsing stored departmentSelector:", error);
  //     }
  //   }

  //   // For employeeSelector
  //   const storedEmployee = sessionStorage.getItem("employeeSelector");
  //   if (storedEmployee) {
  //     try {
  //       const parsedEmployee = JSON.parse(storedEmployee);
  //       setEmployeeSelector(parsedEmployee);
  //     } catch (error) {
  //       console.error("Error parsing stored employeeSelector:", error);
  //     }
  //   }

  //   // For prioritySelector
  //   const storedPriority = sessionStorage.getItem("prioritySelector");
  //   if (storedPriority) {
  //     try {
  //       const parsedPriority = JSON.parse(storedPriority);
  //       setPrioritySelector(
  //         Array.isArray(parsedPriority) ? parsedPriority : []
  //       );
  //     } catch (error) {
  //       console.error("Error parsing stored prioritySelector:", error);
  //     }
  //   }

  //   // For filters
  //   const storedFilters = sessionStorage.getItem("filters");
  //   if (storedFilters) {
  //     try {
  //       const parsedFilters = JSON.parse(storedFilters);
  //       setFilters(parsedFilters);
  //     } catch (error) {
  //       console.error("Error parsing stored filters:", error);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem(
  //     "departmentSelector",
  //     JSON.stringify(departmentSelector)
  //   );
  // }, [departmentSelector]);

  // useEffect(() => {
  //   sessionStorage.setItem(
  //     "employeeSelector",
  //     JSON.stringify(employeeSelector)
  //   );
  // }, [employeeSelector]);

  // useEffect(() => {
  //   sessionStorage.setItem(
  //     "prioritySelector",
  //     JSON.stringify(prioritySelector)
  //   );
  // }, [prioritySelector]);

  useEffect(() => {
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const allDepartments = await getDepartments();
        setDepartments(allDepartments);
        console.log(departments);
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
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        console.log("emplyee: ", response);
        setEmployees(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
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
    const fetchTasks = async () => {
      try {
        const response = await getAllTask();
        console.log("tasks: ", response);
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchPriorities();
    fetchDepartments();
    fetchEmployees();
    fetchStatuses();
    fetchTasks();
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenFilter(openFilter === dropdown ? "" : dropdown);
  };

  const handleDepartmentSelect = (department: string) => {
    setDepartmentSelector((prevDepartments) =>
      prevDepartments.includes(department)
        ? prevDepartments.filter((dep) => dep !== department)
        : [...prevDepartments, department]
    );
  };
  const handEmployeeleSelect = (
    employeeId: number,
    name: string,
    surname: string
  ) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   employee: prevFilters.employee === employeeId ? null : employeeId,
    // }));
    setEmployeeSelector((prevEmpl) =>
      prevEmpl?.id === employeeId
        ? undefined
        : { id: employeeId, name, surname }
    );
  };
  const handlePrioritySelect = (name: string) => {
    setPrioritySelector((prevPriority) =>
      prevPriority.includes(name)
        ? prevPriority.filter((p) => p !== name)
        : [...prevPriority, name]
    );
  };

  const filteredTasks = useMemo(() => {
    const isInitialFilters =
      filters.departments.length === 0 &&
      filters.priorities.length === 0 &&
      !filters.employee;

    if (isInitialFilters) return tasks;

    return tasks.filter((task) => {
      const matchesDepartment =
        filters.departments.length === 0 ||
        filters.departments.includes(task.department.name);

      const matchesPriority =
        filters.priorities.length === 0 ||
        filters.priorities.includes(task.priority.name);

      const matchesEmployee =
        !filters.employee || filters.employee.id === task.employee.id;

      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  }, [tasks, filters]);

  return (
    <div className="w-[1920px] px-[120px] mx-auto">
      <h1 className="firago-semibold text-[34px] leading-[41px] mb-[52px]">
        დავალებების გვერდი
      </h1>
      <div className="relative">
        <div className="w-[688px] flex gap-[45px] firago-regular text-base border border-[#DEE2E6] rounded-md">
          <button
            onClick={() => toggleDropdown("department")}
            className={`flex items-center gap-2 pl-[18px] pr-[30px] py-2.5 cursor-pointer ${
              openFilter === "department" && "text-[#8338EC]"
            }`}
          >
            დეპარტამენტი{" "}
            <IoChevronDownOutline
              size={26}
              className={` ${openFilter === "department" && "rotate-180"}`}
            />
          </button>
          <button
            onClick={() => toggleDropdown("priority")}
            className={`flex items-center gap-2 pl-[18px] pr-[30px] py-2.5 cursor-pointer ${
              openFilter === "priority" && "text-[#8338EC]"
            }`}
          >
            პრიორიტეტი{" "}
            <IoChevronDownOutline
              size={26}
              className={` ${openFilter === "priority" && "rotate-180"}`}
            />
          </button>
          <button
            onClick={() => toggleDropdown("employee")}
            className={`flex items-center gap-2 pl-[18px] pr-[30px] py-2.5 cursor-pointer ${
              openFilter === "employee" && "text-[#8338EC]"
            }`}
          >
            თანამშრომელი
            <IoChevronDownOutline
              size={26}
              className={` ${openFilter === "employee" && "rotate-180"}`}
            />
          </button>
        </div>
        {/* <div className="flex gap-2 h-[29px] my-6">
          <ul className="flex flex-wrap gap-2">
            {filters.departments.map((department) => (
              <li key={department}>
                <button
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      departments: prevFilters.departments.filter(
                        (d) => d !== department
                      ),
                    }));
                    setDepartmentSelector((prevDep) =>
                      prevDep.filter((d) => d !== department)
                    );
                  }}
                  className="h-full flex items-center gap-1 text-sm text-[#343A40] border border-[#CED4DA] px-2.5 rounded-[43px]"
                >
                  {department} <IoCloseOutline color="#343A40" size={16} />
                </button>
              </li>
            ))}
          </ul>
          {filters.priorities && (
            <ul className="flex gap-2">
              {filters.priorities.map((priority) => (
                <li key={priority}>
                  <button
                    onClick={() => {
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        priorities: prevFilters.priorities.filter(
                          (p) => p !== priority
                        ),
                      }));
                      setPrioritySelector((prevPriority) =>
                        prevPriority.filter((p) => p !== priority)
                      );
                    }}
                    className="h-full flex items-center gap-1 text-sm text-[#343A40] border border-[#CED4DA] px-2.5 rounded-[43px] cursor-pointer"
                  >
                    {priority} <IoCloseOutline color="#343A40" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {filters.employee && (
            <button
              onClick={() => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  employee: undefined,
                }));
                setEmployeeSelector(undefined);
              }}
              className="flex items-center gap-1 text-sm text-[#343A40] border border-[#CED4DA] px-2.5 rounded-[43px] cursor-pointer"
            >
              {filters.employee.name} {filters.employee.surname}
              <IoCloseOutline color="#343A40" size={16} />
            </button>
          )}
          {(filters.departments.length > 0 ||
            filters.employee ||
            filters.priorities.length > 0) && (
            <button
              onClick={() => setFilters(initialFilters)}
              className="text-sm text-[#021526CC] cursor-pointer"
            >
              გასუფთავება
            </button>
          )}
        </div> */}
        <div className="flex gap-2 min-h-[29px] my-6">
          <ul className="flex flex-wrap gap-2">
            {filters.departments.map((department) => (
              <li key={department} className="h-[29px]">
                <button
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      departments: prevFilters.departments.filter(
                        (d) => d !== department
                      ),
                    }));
                    setDepartmentSelector((prevDep) =>
                      prevDep.filter((d) => d !== department)
                    );
                  }}
                  className="h-full flex items-center gap-1 text-sm text-[#343A40] border border-[#CED4DA] px-2.5 rounded-[43px]"
                >
                  {department} <IoCloseOutline color="#343A40" size={16} />
                </button>
              </li>
            ))}
            {filters.priorities.map((priority) => (
              <li key={priority} className="h-[29px]">
                <button
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      priorities: prevFilters.priorities.filter(
                        (p) => p !== priority
                      ),
                    }));
                    setPrioritySelector((prevPriority) =>
                      prevPriority.filter((p) => p !== priority)
                    );
                  }}
                  className="h-full flex items-center gap-1 text-sm text-[#343A40] border border-[#CED4DA] px-2.5 rounded-[43px] cursor-pointer"
                >
                  {priority} <IoCloseOutline color="#343A40" size={16} />
                </button>
              </li>
            ))}
            {filters.employee && (
              <li className="h-[29px]">
                <button
                  onClick={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      employee: undefined,
                    }));
                    setEmployeeSelector(undefined);
                  }}
                  className="h-full flex items-center gap-1 text-sm text-[#343A40] border border-[#CED4DA] px-2.5 rounded-[43px] cursor-pointer"
                >
                  {filters.employee.name} {filters.employee.surname}
                  <IoCloseOutline color="#343A40" size={16} />
                </button>
              </li>
            )}
            {(filters.departments.length > 0 ||
              filters.employee ||
              filters.priorities.length > 0) && (
              <li>
                <button
                  onClick={() => {
                    setFilters(initialFilters);
                    setDepartmentSelector([]);
                    setPrioritySelector([]);
                    setEmployeeSelector(undefined);
                  }}
                  className="h-full text-sm text-[#021526CC] px-2.5 cursor-pointer"
                >
                  გასუფთავება
                </button>
              </li>
            )}
          </ul>

          {/* {(filters.departments.length > 0 ||
            filters.employee ||
            filters.priorities.length > 0) && (
            <button
              onClick={() => {
                setFilters(initialFilters);
                setDepartmentSelector([]);
                setPrioritySelector([]);
                setEmployeeSelector(undefined);
              }}
              className="text-sm text-[#021526CC] cursor-pointer"
            >
              გასუფთავება
            </button>
          )} */}
        </div>
        <div
          className={`${
            openFilter === "department" ? "block" : "hidden"
          } absolute z-10 top-14 w-[688px] firago-regular text-base text-[#212529] bg-white border-[0.5px] border-[#8338EC] rounded-md space-y-6 px-8 pt-10 pb-5`}
        >
          <ul className="space-y-5">
            {departments?.map((department) => (
              <li key={department.name}>
                <label
                  htmlFor={department.name.toString()}
                  className="w-full flex items-center gap-2 text-[#212529]"
                >
                  <input
                    type="checkbox"
                    name="department"
                    onChange={() => handleDepartmentSelect(department.name)}
                    checked={departmentSelector.includes(department.name)}
                    id={department.name.toString()}
                  />
                  {department.name}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                departments: departmentSelector,
              }));
              toggleDropdown("department");
            }}
            className="block h-[35px] text-base text-white bg-[#8338EC] hover:bg-[#8338EC]/70 focus:bg-[#8338EC]/70 rounded-[20px] px-[49px] ml-auto"
          >
            არჩევა
          </button>
        </div>
        <div
          className={`${
            openFilter === "priority" ? "block" : "hidden"
          } absolute z-10 top-14 w-[688px] text-base text-[#212529] border-[0.5px] bg-white border-[#8338EC] rounded-md space-y-6 px-8 pt-10 pb-5`}
        >
          <ul className="space-y-5">
            {priorities?.map((priority) => (
              <li key={priority.name}>
                <label
                  htmlFor={priority.name.toString()}
                  className="w-full flex items-center gap-2 text-[#212529]"
                >
                  <input
                    type="checkbox"
                    name="region"
                    // onClick={() => handlePrioritySelect(priority.name)}
                    onChange={() => handlePrioritySelect(priority.name)}
                    checked={prioritySelector.includes(priority.name)}
                    id={priority.name.toString()}
                  />
                  {priority.name}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                priorities: prioritySelector,
              }));
              toggleDropdown("priority");
            }}
            className="block h-[35px] text-base text-white bg-[#8338EC] hover:bg-[#8338EC]/70 focus:bg-[#8338EC]/70 rounded-[20px] px-[49px] ml-auto"
          >
            არჩევა
          </button>
        </div>
        <div
          className={`${
            openFilter === "employee" ? "block" : "hidden"
          } absolute z-10 top-14 w-[688px] text-base text-[#212529] border-[0.5px] bg-white border-[#8338EC] rounded-md space-y-6 px-8 pt-10 pb-5`}
        >
          <ul className="space-y-5 max-h-[178px] overflow-y-scroll">
            {employees?.length > 0 ? (
              employees.map((employee) => (
                <li key={employee.id}>
                  <label
                    htmlFor={employee.id.toString()}
                    className="w-full flex items-center gap-2 text-[#212529]"
                  >
                    <input
                      type="checkbox"
                      name="employee"
                      onChange={() =>
                        handEmployeeleSelect(
                          employee.id,
                          employee.name,
                          employee.surname
                        )
                      }
                      checked={employeeSelector?.id === employee.id}
                      id={employee.id.toString()}
                    />
                    <div className="w-[28px] h-[28px]">
                      <Image
                        src={employee.avatar}
                        alt={employee.name}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover rounded-full "
                      />
                    </div>
                    {employee.name} {employee.surname}
                  </label>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">
                ვერ მოიძებნა თანამშრომელი
              </li>
            )}
          </ul>

          <button
            onClick={() => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                employee: employeeSelector,
              }));
              toggleDropdown("employee");
            }}
            className="block h-[35px] text-base text-white bg-[#8338EC] hover:bg-[#8338EC]/70 focus:bg-[#8338EC]/70 rounded-[20px] px-[49px] ml-auto"
          >
            არჩევა
          </button>
        </div>
      </div>

      {/* tasks */}

      <div className="">
        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-[54px]">
          {/* {statuses.map((status) => (
            <button
              key={status.name}
              className={`w-[381px] h-[54px] text-[20px] font-medium text-white rounded-[10px] ${
                status.name === "დასაწყები"
                  ? "bg-[#F7BC30]"
                  : status.name === "პროგრესში"
                  ? "bg-[#FB5607]"
                  : status.name === "მზად ტესტირებისთვის"
                  ? "bg-[#FF006E]"
                  : "bg-[#3A86FF]"
              }`}
            >
              {status.name}
            </button>
          ))} */}
          {statuses.map((status) => (
            <div key={status.name}>
              <button
                className={`w-[381px] h-[54px] firago-medium text-[20px] font-medium text-white rounded-[10px] ${
                  status.name === "დასაწყები"
                    ? "bg-[#F7BC30]"
                    : status.name === "პროგრესში"
                    ? "bg-[#FB5607]"
                    : status.name === "მზად ტესტირებისთვის"
                    ? "bg-[#FF006E]"
                    : "bg-[#3A86FF]"
                }`}
              >
                {status.name}
              </button>

              {filteredTasks
                .filter((task) => task.status.name === status.name)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* <CreateEmployee /> */}
    </div>
  );
};

export default Tasks;
