import { useEffect, useState } from "react";

interface MechSearchProps{
  searchValueContext: {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  };
}

function MechSearch({ searchValueContext } : MechSearchProps){
  
  const {searchValue, setSearchValue} = searchValueContext;
  return(
    <div className="flex items-center gap-4 h-full w-full rounded-md ">
      <label className="text-sm font-bold">SEARCH</label>
      <input className=" w-full bg-jet-dark text-white text-xs caret-white rounded-md p-2 outline-1 outline outline-gray-800  
    focus:outline-gray-600 transition-all duration-300" type="text" placeholder="Search Any..." value={searchValue}
    onChange={(e)=>setSearchValue(e.target.value)}/>
    </div>
  )
}

export default MechSearch;