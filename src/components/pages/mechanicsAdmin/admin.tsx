
import { useEffect, useState } from "react";

import Rating from "react-rating";
import AdminFilters from "./adminMechFilters";
import MechFilters from "./adminMechFilters";
import AddMechanic from "./addMechanic";
import MechSearch from "./adminMechSearch";

import getMechanics from "../../utils/getMechanics";

import withAuthAdmin from "../../hocs/withAuthAdmin";
import useDebounce from "../../hooks/useDebounce";

import '../../../styles/admin.css'

import { format } from 'date-fns'
import MechTable from "./adminMechTable";
import AdminMechTable from "./adminMechTable";
import AdminMechFilters from "./adminMechFilters";
import AdminMechSearch from "./adminMechSearch";

export interface FilterData {
  mech_difficulty: { firstInput: number; secondInput: number };
  mech_importance: { firstInput: number; secondInput: number };
  mech_created_at: { firstInput: string; secondInput: string };
  rating_difficulty: { firstInput: number; secondInput: number };
  rating_importance: { firstInput: number; secondInput: number };
}

export interface MechTableColumns {
  mech_id: string;
  mech_name: string;
  mech_description: string;
  mech_difficulty: string;
  mech_importance: string;
}

export interface Mechanic {
  mech_id: number;
  mech_name: string;
  mech_description: string;
  mech_difficulty: number;
  mech_importance: number;
  mech_created_at: string;
}

function Admin () {

  const [addMechanicIsOpen, setAddMechanicIsOpen] = useState(false)

  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([])
  
  const [searchValue, setSearchValue] = useState<string>("")

  const debouncedSearch = useDebounce(searchValue, 300)
  
  const [filterData, setFilterData] = useState<FilterData | null>(null)

  

  useEffect(()=>{
    console.log(mechanicsData);
  },[mechanicsData]) 

  useEffect(()=>{
    //get mechanics when component renders, and when debouncedsearch value changes or filterdata is submitted / applied
    getMechanics(debouncedSearch, filterData).then((mechanics) => setMechanicsData(mechanics))
  },[debouncedSearch, filterData]) 

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

            
          </div>
          
        </section>

        <section className="z-50">
          {
          addMechanicIsOpen &&
          <AddMechanic addMechanicIsOpenContext={{addMechanicIsOpen, setAddMechanicIsOpen}}/>
          }
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md min-w-fit">

          <AdminMechSearch searchValueContext={{searchValue, setSearchValue}}/>

          <AdminMechFilters filterDataContext={{filterData, setFilterData}}/>
          
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 rounded-md overflow-auto">

          {
          mechanicsData &&
          <AdminMechTable mechanicsDataContext={{mechanicsData, setMechanicsData}} />
          
          }
          
        </section>

        
      </div>
    </div>
  )
}

export default withAuthAdmin(Admin);