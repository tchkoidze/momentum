import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between px-[120px] py-[30px]">
      <button>
        <Image src={"/Logo.svg"} alt="logo" width={210} height={38} />
      </button>
      <div className="flex gap-10">
        <button className="h-10 border border-[#8338EC] px-5 rounded-md">
          თანამშრომლის შექმნა
        </button>
        <button className="h-10 bg-[#8338EC] text-white px-5 rounded-md">
          + შექმენი ახალი დავალება
        </button>
      </div>
    </header>
  );
};

export default Header;
