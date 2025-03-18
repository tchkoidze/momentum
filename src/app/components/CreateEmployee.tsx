"use client";
import { getDepartments } from "@/api/getAPI";
import { Department } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";

const CreateEmployee = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [dropdownDepartments, setDropdownDepartments] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const allDepartments = await getDepartments();
        setDepartments(allDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);
  return (
    <div className="w-full h-full fixed top-0 flex items-center justify-center bg-[#0D0F1026]">
      <form className="w-[913px] bg-white px-[50px] pt-10 pb-[60px] rounded-[10px]">
        <div className="flex justify-end">
          <button type="button" className="text-[#DEE2E6] cursor-pointer">
            <IoMdCloseCircle size={40} />
          </button>
        </div>
        <h1 className="font-medium text-[32px] leading-[38px] text-center mt-9 mb-11">
          თანამშრომლის დამატება
        </h1>
        <div className="flex gap-[45px]">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="name"
              className="firago-medium font-medium text-sm leading-[17px]"
            >
              სახელი*
            </label>
            <input
              id="name"
              type="text"
              className="border border-[#CED4DA] outline-none rounded-md p-2.5 my-1"
              // {...register("name", {
              //   onChange: (e) => handleInputChange("name", e.target.value),
              // })}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="surname"
              className="firago-medium font-medium text-sm leading-[17px]"
            >
              გვარი*
            </label>
            <input
              id="surname"
              type="text"
              className="border border-[#CED4DA] outline-none rounded-md p-2.5 my-1"
              // {...register("surname", {
              //   onChange: (e) => handleInputChange("surname", e.target.value),
              // })}
            />
          </div>
        </div>

        <div className="w-full my-[45px]">
          <p className="font-medium text-sm leading-[17px]">ავატარი*</p>
          <div className="w-full h-[120px] flex items-center justify-center outline-1 outline-[#CED4DA] outline-dashed rounded-lg my-1">
            <div>
              <input
                type="file"
                id="myphoto"
                accept=".jpg,.jpeg,.png"
                // {...register("image")}
                // onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />

              {/* {data.image ? (
                <div className="relative">
                  <img
                    src={data.image}
                    alt="Uploaded"
                    className="w-[92px] h-[82px]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setData((prevData) => ({
                        ...prevData,
                        ["image"]: "",
                      }))
                    }
                    className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 "
                  >
                    <img
                      alt="trashbin icon"
                      src="/trashbin.svg"
                      className="hover:scale-[1.1]"
                    />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img src="/plus-circle.svg" alt="plus image" />
                </button>
              )} */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-2"
              >
                <Image
                  src={"/gallery-export.svg"}
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-sm leading-[17px] text-[#343A40]">
                  ატვირთე ფოტო
                </span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm leading-[17px] text-[#343A40] mb-[3px]">
            დეპარტამენტი*
          </p>
          <div className="relative w-1/2 h-[45px]">
            <div className="absolute w-full border border-[#CED4DA] rounded-[5px] bg-white">
              <button
                type="button"
                onClick={() => setDropdownDepartments(!dropdownDepartments)}
                className="w-full flex items-center justify-between text-[11px] font-light text-[#0D0F10] p-[14px]"
              >
                შეარჩიე
                <IoChevronDownOutline
                  size={14}
                  className={`${dropdownDepartments && "rotate-180"}`}
                />
              </button>
              {dropdownDepartments && (
                <ul>
                  {departments.map((department) => (
                    // <li
                    //   // onClick={() =>
                    //   //   updateTaskStatus(task.id.toString(), status.id)
                    //   // }
                    //   key={department.id}
                    //   className="text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                    // >
                    //   {department.name}
                    // </li>
                    <li
                      key={department.id}
                      className="text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                    >
                      <label htmlFor={`${department.id}`}>
                        <input
                          type="radio"
                          name="degree"
                          id={`${department.id}`}
                          // onChange={() =>
                          //   handleAgentChange(agent.id, agent.name, agent.surname)
                          // }
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

        <div className="flex justify-end gap-[22px] mt-6">
          <button
            type="button"
            className="h-[42px] border border-[#8338EC] hover:border-[#B588F4] focus:border-[#B588F4] px-4 rounded-md cursor-pointer"
          >
            გაუქმება
          </button>
          <button className="h-10 bg-[#8338EC] hover:bg-[#B588F4] focus:bg-[#B588F4] text-white px-5 rounded-md cursor-pointer">
            დაამატე თანამშრომელი
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
