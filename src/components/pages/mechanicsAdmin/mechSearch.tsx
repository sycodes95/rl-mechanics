

function MechSearch(){
  return(
    <div className="flex items-center gap-4 h-full w-full rounded-md ">
      <label className="text-sm font-bold">SEARCH</label>
      <input className=" w-full bg-jet-dark text-white text-xs caret-white rounded-md p-2 outline-1 outline outline-gray-800  
    focus:outline-gray-600 transition-all duration-300" type="text" placeholder="Search Any..." />
    </div>
  )
}

export default MechSearch;