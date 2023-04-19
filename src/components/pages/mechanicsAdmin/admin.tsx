
import { useEffect, useState } from "react";

import Rating from "react-rating";
import AdminFilters from "./mechFilters";
import MechFilters from "./mechFilters";
import AddMechanic from "./addMechanic";
import MechSearch from "./mechSearch";

import withAuthAdmin from "../../hocs/withAuthAdmin";

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
            <AddMechanic addMechanicIsOpenContext={{addMechanicIsOpen, setAddMechanicIsOpen}}/>
            }
          </div>
          
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md">
          <MechSearch/>
          <MechFilters/>

          
        </section>

        
      </div>
    </div>
  )
}

export default withAuthAdmin(Admin);