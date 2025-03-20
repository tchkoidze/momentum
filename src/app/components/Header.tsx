import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModal } from "../(routes)/ModalContext";

const Header = () =>
  //   {
  //   showAddEmployeeMOdal,
  //   setShowAddEmployeeMOdal,
  // }: {
  //   showAddEmployeeMOdal: boolean;
  //   setShowAddEmployeeMOdal: (value: boolean) => void;
  // }
  {
    const { showAddEmployeeMOdal, setShowAddEmployeeMOdal } = useModal();
    const router = useRouter();
    return (
      <header className="flex justify-between px-[120px] py-[30px] w-[1920px] mx-auto">
        <button
          onClick={() => router.push("/tasks")}
          className="cursor-pointer"
        >
          <Image src={"/Logo.svg"} alt="logo" width={210} height={38} />
        </button>
        <div className="flex gap-10">
          <button
            onClick={() => setShowAddEmployeeMOdal(!showAddEmployeeMOdal)}
            className="h-10 border border-[#8338EC] hover:border-[#B588F4] focus:border-[#B588F4] cursor-pointer px-5 rounded-md"
          >
            თანამშრომლის შექმნა
          </button>
          <button
            onClick={() => router.push("/create-task")}
            className="h-10 bg-[#8338EC] hover:bg-[#B588F4] focus:bg-[#B588F4] cursor-pointer text-white px-5 rounded-md"
          >
            + შექმენი ახალი დავალება
          </button>
        </div>
      </header>
    );
  };

export default Header;
