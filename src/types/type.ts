export type Department = {
  id: number;
  name: string;
};

export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

export type Status = {
  id: number;
  name: string;
  // icon: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
  total_comments?: number;
};

export type Filters = {
  departments: string[];
  // employee: number | null;
  employee: { id: number; name: string; surname: string } | undefined;
  priorities: string[];
};

export type Comment = {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments: Comment[];
};

export type Data = {
  name: string;
  description?: string | null;
  due_date: string;
  status_id: string;
  department_id: string;
  employee_id: string;
  priority_id: string;
};

// type Department = {
//   id: number;
//   name: string;
// };

// type Priority = {
//   id: number;
//   name: string;
//   icon: string;
// };

// type Employee = {
//   id: number;
//   name: string;
//   surname: string;
//   avatar: string;
//   department: Department;
// };

// type Status = {
//   id: number;
//   name: string;
//   // icon: string;
// };

// type Task = {
//   id: number;
//   name: string;
//   description: string;
//   due_date: string;
//   department: Department;
//   employee: Employee;
//   status: Status;
//   priority: Priority;
//   total_comments: number;
// };
