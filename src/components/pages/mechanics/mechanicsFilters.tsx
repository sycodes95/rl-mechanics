import { useEffect, useRef, useState } from "react";
import { MechanicsDifficultyOptions, MechanicsFiltersProps, MechanicsStatusOptions } from "./types";


function MechanicsFilters ({ filterValuesContext ,searchValueContext } : MechanicsFiltersProps) {
  
  const {searchValue, setSearchValue} = searchValueContext
  const {filterValues, setFilterValues} = filterValuesContext

  const [statusFilter, setStatusFilter] = useState(false)

  const statusFilterRef = useRef<HTMLButtonElement>(null)

  const [difficultyFilter, setDifficultyFilter] = useState(false)

  const difficultyFilterRef = useRef<HTMLButtonElement>(null)

  const handleClickOutside = (e: any) => {
    if(statusFilterRef.current && !statusFilterRef.current.contains(e.target)){
      setStatusFilter(false)
    }

    if(difficultyFilterRef.current && !difficultyFilterRef.current.contains(e.target)){
      setDifficultyFilter(false)
    }
  }


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mechanicsStatusOptions : MechanicsStatusOptions = {
    'Consistent': 2,
    'Inconsistent': 1,
    'Not Learned': 0,
  }

  const mechanicsDifficultyOptions: MechanicsDifficultyOptions = {
    'Very Easy': 1,
    'Easy': 2,
    'Medium': 3,
    'Hard': 4,
    'Insane': 5,
  }

  return (
    <div className="w-full flex gap-2">
      <button className="relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
      onClick={()=> setStatusFilter(!statusFilter)} ref={statusFilterRef}>
        <p>Status</p>
        {
        statusFilter &&
        <ul className="absolute top-full left-0 bg-jet-dark mt-1 p-1 rounded-sm" >
          {
          Object.keys(mechanicsStatusOptions).map((option, index) => (
            <li key={index} className=" hover:bg-gray-700 w-full p-1" 
            onClick={()=> setFilterValues({...filterValues, mechanic_status_value: mechanicsStatusOptions[option]})}
            >{option}</li>
          ))
          }
        </ul>
        }
      </button>

      <button className="relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
      onClick={()=> setDifficultyFilter(!difficultyFilter)} ref={difficultyFilterRef}>
        <p>Difficulty</p>
        {
        difficultyFilter &&
        <div className="absolute top-full left-0 bg-jet-dark mt-1 p-2 rounded-sm" >
          {
          Object.keys(mechanicsDifficultyOptions).map((option, index) => (
            <button key={index} className=" hover:bg-gray-700 w-full p-1" 
            onClick={()=> setFilterValues({...filterValues, mech_difficulty: mechanicsDifficultyOptions[option]})}
            >{option}</button>
          ))
          }
        </div>
        }
      </button>
      <input className="text-white bg-black bg-opacity-10 p-1 outline-none caret-white" 
      type="text" value={searchValue} placeholder="Search..." onChange={(e)=> setSearchValue(e.target.value)}/>
    </div>
  )
}

export default MechanicsFilters;