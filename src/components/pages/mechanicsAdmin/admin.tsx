
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
        <section className="flex flex-col sm:flex-row justify-between gap-4 z-50">
          <div className="flex items-center">
            <p className="flex items-center text-4xl font-bold whitespace-nowrap ">ADMIN </p>
          </div>
          
          <div >
            <button className="p-4 w-full sm:w-fit bg-orange-500 hover:bg-orange-400 text-sm font-bold 
            rounded-md whitespace-nowrap transition-all" onClick={()=> setAddMechanicIsOpen(true)}>ADD MECHANIC</button>

            {
            addMechanicIsOpen &&
            <section>

            
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" id="add-mechanic-overlay" >
            </div>
            
            <div className="flex flex-col gap-4 bg-black rounded-md fixed 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 sm: w-96">
              <div className="flex justify-between text-xl text-orange-500">
                <p>ADD MECH</p>
                <button className="text-white" onClick={()=> setAddMechanicIsOpen(false)}>X</button>
              </div>
              <input className="text-xs text-white bg-black rounded-md outline outline-1 outline-slate-800 p-1" type="text" placeholder="NAME"/>
              <textarea className="h-32 text-xs text-white bg-black rounded-md outline outline-1 outline-slate-800 p-1"  placeholder="DESCRIPTION"/>
              <input className="text-xs text-black p-1" type="text" placeholder="DIFFICULTY"/>
              <input className="text-xs text-black p-1" type="text" placeholder="IMPORTANCE"/>
              <input className="text-xs text-black p-1" type="text" placeholder="YOUTUBE URL CONTROLLER"/>
              <input className="text-xs text-black p-1" type="text" placeholder="YOUTUBE URL KBM"/>
              <input className="text-xs text-black p-1" type="text" placeholder="IMPORTANCE"/>
              <button className="text-sm bg-orange-500 hover:bg-orange-400 transition-all p-1 rounded-md">SUBMIT</button>
              <button className="text-sm bg-red-800 hover:bg-red-700 transition-all p-1 rounded-md" onClick={()=> setAddMechanicIsOpen(false)}>CANCEL</button>
            </div>

            

            </section>
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