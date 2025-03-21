"use client";
import { getDepartments } from "@/api/getAPI";
import { Department } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddEmployeeFormData, addEmployeeSchema } from "./employeeSchema";
import { FaCheck } from "react-icons/fa6";
import { addEmployee } from "@/api/updateAPI";
import { useModal } from "../(routes)/ModalContext";

const CreateEmployee = () => {
  const { showAddEmployeeMOdal, setShowAddEmployeeMOdal } = useModal();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [dropdownDepartments, setDropdownDepartments] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUploadError, setImageUploadError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ resolver: zodResolver(addEmployeeSchema), mode: "onChange" });

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 600 * 1024) {
        setImageUploadError("სურათის ზომა არ უნდა აღემატებოდეს 600kb");
        return;
      } else {
        setImageUploadError("");
      }
      console.log("File selected:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        //handleInputChange("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function dataURLtoFile(dataurl: any, filename: any) {
    if (selectedImage !== null) {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      // n = bstr.length,
      // u8arr = new Uint8Array(n);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
  }

  const onSubmit = async (data: AddEmployeeFormData) => {
    console.log("submit", data);

    if (!selectedImage) {
      setImageUploadError("ატვირთე სურათი");
      console.log("error");
      return;
    } else {
      setImageUploadError("");
    }

    const file =
      typeof selectedImage === "string"
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataURLtoFile(selectedImage, "avatar_image") || ""
        : selectedImage;

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("avatar", file);
    formData.append("department_id", data.department);

    try {
      const res = await addEmployee(formData);
      if (res && res.status >= 200 && res.status < 300) {
        setShowAddEmployeeMOdal(false);
        reset();
        setSelectedImage("");
      }
      console.log("respo :", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => setShowAddEmployeeMOdal(false)}
      className={`w-full h-full fixed top-0 z-20 ${
        showAddEmployeeMOdal ? "flex" : "hidden"
      } justify-center bg-[#0D0F1026]`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="w-[913px] h-fit bg-white px-[50px] pt-10 pb-[60px] rounded-[10px] mt-[118px]"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAddEmployeeMOdal(false)}
            className="text-[#DEE2E6] cursor-pointer"
          >
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
              {...register("name")}
              // {...register("name", {
              //   onChange: (e) => handleInputChange("name", e.target.value),
              // })}
            />
            <div>
              <p
                className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                  dirtyFields.name && errors.name
                    ? "text-[#FA4D4D]"
                    : dirtyFields.name
                    ? "text-[#08A508]"
                    : ""
                }`}
              >
                <FaCheck size={16} />
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
                <FaCheck size={16} />
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
                <FaCheck size={16} /> მაქსიმუმ 255 სიმბოლო
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
                <FaCheck size={16} />
                მარტო ლათინური და ქართული სიმბოლოები (არ დაიშვება ციფრები და
                სპეცალური ქერექტერები){" "}
              </p>
            </div>
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
              {...register("surname")}
              // {...register("surname", {
              //   onChange: (e) => handleInputChange("surname", e.target.value),
              // })}
            />
            <div>
              <p
                className={`flex gap-[2px] font-[350] text-[10px] text-[#6C757D] ${
                  dirtyFields.surname && errors.surname
                    ? "text-[#F93B1D]"
                    : dirtyFields.surname
                    ? "text-[#45A849]"
                    : "text-[#6C757D]"
                }`}
              >
                <FaCheck size={16} />
                სავალდებულო
              </p>
              <p
                className={`flex gap-[2px] font-[350] text-[10px] ${
                  dirtyFields.surname && errors.surname
                    ? "text-[#F93B1D]"
                    : dirtyFields.surname
                    ? "text-[#45A849]"
                    : "text-[#6C757D]"
                }`}
                // className={`flex font-[350] text-[10px] ${
                //   dirtyFields.name
                //     ? errors.name
                //       ? "text-[#FA4D4D]"
                //       : "text-[#08A508]"
                //     : "text-[#6C757D]"
                // }`}
              >
                <FaCheck size={16} />
                მინიმუმ 2 სიმბოლო
              </p>
              <p
                className={`flex gap-[2px] font-[350] text-[10px] ${
                  dirtyFields.surname && errors.surname
                    ? "text-[#F93B1D]"
                    : dirtyFields.surname
                    ? "text-[#45A849]"
                    : "text-[#6C757D]"
                }`}
              >
                <FaCheck size={16} /> მაქსიმუმ 255 სიმბოლო
              </p>
              <p
                className={`flex gap-[2px] font-[350] text-[10px] ${
                  dirtyFields.surname && errors.surname
                    ? "text-[#F93B1D]"
                    : dirtyFields.surname
                    ? "text-[#45A849]"
                    : "text-[#6C757D]"
                }`}
              >
                <FaCheck size={16} />
                მარტო ლათინური და ქართული სიმბოლოები (არ დაიშვება ციფრები და
                სპეცალური ქერექტერები){" "}
              </p>
            </div>
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
                //{...register("avatar")}
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />

              {selectedImage ? (
                <div className="relative">
                  <div className="w-[88px] h-[88px]">
                    <Image
                      src={selectedImage}
                      alt="Uploaded_avatar"
                      width={88}
                      height={88}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-[88px] h-[88px] rounded-full object-cover"
                  /> */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage("");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute bottom-1 right-1 transform translate-x-1/3 translate-y-1/3 cursor-pointer"
                  >
                    <Image
                      src={"/trashbin.svg"}
                      alt="trashbin icon"
                      width={24}
                      height={24}
                      className="hover:scale-[1.1]"
                    />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 cursor-pointer"
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
              )}
            </div>
          </div>
          <p className="text-[#F93B1D]">{imageUploadError}</p>
          {/* <div>
            <p
              className={`flex gap-[2px] font-[350] text-[10px] ${
                dirtyFields.avatar && errors.avatar
                  ? "text-[#F93B1D]"
                  : dirtyFields.avatar
                  ? "text-[#45A849]"
                  : "text-[#6C757D]"
              }`}
            >
              <FaCheck size={16} />
              სავალდებულო
            </p>
            <p
              className={`flex gap-[2px] font-[350] text-[10px] ${
                dirtyFields.avatar && errors.avatar
                  ? "text-[#F93B1D]"
                  : dirtyFields.avatar
                  ? "text-[#45A849]"
                  : "text-[#6C757D]"
              }`}
            >
              <FaCheck size={16} />
              მაქსიმუმ 600kb ზომაში
            </p>
            <p
              className={`flex gap-[2px] font-[350] text-[10px] ${
                dirtyFields.avatar && errors.avatar
                  ? "text-[#F93B1D]"
                  : dirtyFields.avatar
                  ? "text-[#45A849]"
                  : "text-[#6C757D]"
              }`}
            >
              <FaCheck size={16} /> უნდა იყოს სურათის ტიპის
            </p>
          </div> */}
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
                {selectedDepartment
                  ? departments.find(
                      (d) => d.id.toString() === selectedDepartment
                    )?.name
                  : "შერჩევა"}
                <IoChevronDownOutline
                  size={14}
                  className={`${dropdownDepartments && "rotate-180"}`}
                />
              </button>
              {dropdownDepartments && (
                <ul>
                  {departments.map((department) => (
                    <li
                      key={department.id}
                      className="h-[40.5px] w-full block"
                      // className="text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                    >
                      <label
                        htmlFor={`${department.id}`}
                        className="w-full block text-[11px] font-light text-[#0D0F10] p-[14px] cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={`${department.id}`}
                          value={department.id}
                          {...register("department")}
                          // onChange={() =>
                          //   handleAgentChange(agent.id, agent.name, agent.surname)
                          // }
                          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                            setDropdownDepartments(false);
                            setSelectedDepartment(e.currentTarget.value);
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
          <p
            className={`flex gap-[2px] font-[350] text-[10px] mt-[6px] ${
              dirtyFields.department && errors.department
                ? "text-[#F93B1D]"
                : dirtyFields.department
                ? "text-[#45A849]"
                : "text-[#6C757D]"
            }`}
          >
            სავალდებულო
          </p>
        </div>

        <div className="flex justify-end gap-[22px] mt-6">
          <button
            type="button"
            onClick={() => setShowAddEmployeeMOdal(false)}
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
