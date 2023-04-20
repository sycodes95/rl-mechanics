
import { useEffect, useState } from "react";

import Rating from "react-rating";
import AdminFilters from "./mechFilters";
import MechFilters from "./mechFilters";
import AddMechanic from "./addMechanic";
import MechSearch from "./mechSearch";

import getMechanics from "../../utils/getMechanics";

import withAuthAdmin from "../../hocs/withAuthAdmin";
import useDebounce from "../../hooks/useDebounce";

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

  const mechTableColumns = {
    mech_created_at: 'UPLOAD DATE',
    mech_id: 'ID',
    mech_name: 'NAME',
    mech_description: 'DESCRIPTION',
    mech_difficulty: 'DIFFICULTY',
    mech_importance: 'IMPORTANCE',
  }

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

            {
            addMechanicIsOpen &&
            <AddMechanic addMechanicIsOpenContext={{addMechanicIsOpen, setAddMechanicIsOpen}}/>
            }
          </div>
          
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md min-w-fit">

          <MechSearch searchValueContext={{searchValue, setSearchValue}}/>

          <MechFilters filterDataContext={{filterData, setFilterData}}/>
          
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md">


          <table>
            <thead>
              <tr className="text-xs bg-green-800">
                {
                 Object.keys(mechTableColumns).map((column, index) => (
                  <th key={index}>{mechTableColumns[column as keyof typeof mechTableColumns]}</th>
                 ))
                }
                
              </tr>
            </thead>

            <tbody>
              {
              mechanicsData.length &&
              mechanicsData.map((mechanic: Mechanic, index) => (
                <tr className="text-center" key={index}>
                  <td>{mechanic.mech_created_at}</td>
                  <td>{mechanic.mech_id}</td>
                  <td>{mechanic.mech_name}</td>
                  <td>{mechanic.mech_description}</td>
                  <td>{mechanic.mech_difficulty}</td>
                  <td>{mechanic.mech_importance}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
          
        </section>

        
      </div>
    </div>
  )
}

export default withAuthAdmin(Admin);