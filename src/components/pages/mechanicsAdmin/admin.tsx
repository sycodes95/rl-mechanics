
import { useEffect, useState } from "react";

import Rating from "react-rating";
import AdminFilters from "./mechFilters";
import MechFilters from "./mechFilters";

function Admin () {
  const [addMechanicIsOpen, setAddMechanicIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)

  return(
    <div className="flex justify-center text-white w-full h-full pt-12 pb-12">
      <div className="flex flex-col gap-4 w-full max-w-7xl  rounded-md p-4">
        <section className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center">
            <p className="flex items-center text-4xl font-bold whitespace-nowrap ">ADMIN </p>
          </div>
          
          <div >
            <button className="p-4 w-full sm:w-fit bg-orange-500 hover:bg-orange-400 text-sm font-bold 
            rounded-md whitespace-nowrap transition-all" onClick={()=> setAddMechanicIsOpen(true)}>ADD MECHANIC</button>

            {
            addMechanicIsOpen &&
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={()=> setAddMechanicIsOpen(false)}>
              <div className="z-10 h-96 w-96 bg-black fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            }
          </div>
          
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md">
          
          <div className="flex items-center gap-4 h-full w-full rounded-md ">
            <label className="text-sm font-bold">SEARCH</label>
            <input className=" w-full bg-jet-dark text-white text-xs caret-white rounded-md p-2 outline-1 outline outline-gray-800  
          focus:outline-gray-600 transition-all duration-300" type="text" placeholder="Search Any..." />
          </div>
          
          <MechFilters/>

          
        </section>

        
      </div>
    </div>
  )
}

export default Admin;