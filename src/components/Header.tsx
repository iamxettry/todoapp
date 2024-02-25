"use client"

import { useBoardStore } from "@/store/BoardStore";
import { Search } from "lucide-react";
import Avatar from "react-avatar";

const Header = () => {
  const [searchString,setSearchString] =useBoardStore((state)=>[
    state.searchString,
    state.setSearchString
  ])

  console.log(searchString);
  
  return (
    <header className="p-4 border-b shadow-md border-black/10">
      <div className=" flex flex-col gap-5 justify-between md:flex-row items-center max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold">Todo App</h1>

        <div className="flex items-center justify-center gap-4 ">
          <form className="flex  gap-2 items-center justify-center border border-black/10 p-2 rounded-md shadow-xl">
            <Search  className="text-gray-800"/>
            <input type="text" placeholder="Search" value={searchString} onChange={(e)=>setSearchString(e.target.value)} className="bg-transparent focus:outline-none placeholder:text-gray-500 text-gray-800 max-w-36" />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Raju Chhetry" size="40" color="#FF4FF3"  round alt="Raju Chhetri" />
        </div>
      </div>
    </header>
  );
};

export default Header;
