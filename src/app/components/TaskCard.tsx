import { Task } from "@/types/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

const monthMap: Record<string, string> = {
  Jan: "იან",
  Feb: "თებ",
  Mar: "მარ",
  Apr: "აპრ",
  May: "მაი",
  Jun: "ივნ",
  Jul: "ივლ",
  Aug: "აგვ",
  Sep: "სექ",
  Oct: "ოქტ",
  Nov: "ნოე",
  Dec: "დეკ",
};

const TaskCard = ({ task }: { task: Task }) => {
  const router = useRouter();
  const handleNavigation = (id: number) => {
    router.push(`/tasks/${id}`);
  };
  // console.log(
  //   new Intl.DateTimeFormat("ka-GE", { month: "short" }).format(new Date())
  // );

  return (
    <div
      onClick={() => handleNavigation(task.id)}
      className={`w-[381px] border ${
        task.status.name === "დასაწყები"
          ? "border-[#F7BC30]"
          : task.status.name === "პროგრესში"
          ? "border-[#FB5607]"
          : task.status.name === "მზად ტესტირებისთვის"
          ? "border-[#FF006E]"
          : "border-[#3A86FF]"
      } rounded-2xl p-5 mt-5`}
    >
      <div className="flex justify-between">
        <div className="flex gap-2.5 flex-wrap items-center">
          <div
            className={`flex items-center gap-1 text-xs font-medium border-[0.5px] ${
              task.priority.name === "დაბალი"
                ? "text-[#08A508] border-[#08A508]"
                : task.priority.name === "საშუალო"
                ? "text-[#FFBE0B] border-[#FFBE0B]"
                : "text-[#FA4D4D] border-[#FA4D4D]"
            } p-1 rounded-[5px]`}
          >
            <Image
              src={task.priority.icon}
              alt="task_priority_icon"
              width={16}
              height={18}
            />
            <p>{task.priority.name}</p>
          </div>
          <p className="w-fit flex items-center bg-[#FF66A8] text-[12px]  text-white rounded-2xl px-4 py-1">
            {task.department.name}
          </p>
        </div>
        <p className="shrink-0 text-sm text-[#212529] ml-1">
          {/* {new Date(task.due_date)
            .toLocaleString("ka-GE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
            .replace(" at", "")} */}

          {new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
            .format(new Date(task.due_date))
            .replace(
              /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,
              (match) => monthMap[match]
            )}
        </p>
      </div>
      <div className="my-7">
        <h3 className="font-medium text-[15px] text-[#212529] mb-3">
          {task.name}
        </h3>
        <p
          style={{
            WebkitLineClamp: 2,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="text-sm text-[#343A40]"
        >
          {task.description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="w-[31px] h-[31px]">
          <Image
            src={task.employee.avatar}
            alt="თანამშრომლის სურათი"
            width={31}
            height={31}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex items-center">
          <Image src={"/Comments.svg"} alt="comment" width={22} height={22} />
          <p className="text-[#212529]">{task.total_comments}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
