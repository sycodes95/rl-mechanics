import { useEffect, useRef, useState } from "react";
import { MechanicsDifficultyOptions, MechanicsFiltersProps, MechanicsImportanceOptions, MechanicsStatusOptions } from "./types";

import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';



function MechanicsFilters ({ filterValuesContext ,searchValueContext, userIsLoggedIn } : MechanicsFiltersProps) {
  
  const {searchValue, setSearchValue} = searchValueContext;
  const {filterValues, setFilterValues} = filterValuesContext;

  const [statusFilter, setStatusFilter] = useState(false);

  const statusFilterRef = useRef<HTMLButtonElement>(null);

  const [difficultyFilter, setDifficultyFilter] = useState(false);

  const difficultyFilterRef = useRef<HTMLButtonElement>(null);

  const [importanceFilter, setImportanceFilter] = useState(false);

  const importanceFilterRef = useRef<HTMLButtonElement>(null);

  const [typeFilter, setTypeFilter] = useState({
    
  })

  const handleClickOutside = (e: any) => {
    if(statusFilterRef.current && !statusFilterRef.current.contains(e.target)){
      setStatusFilter(false);
    };

    if(difficultyFilterRef.current && !difficultyFilterRef.current.contains(e.target)){
      setDifficultyFilter(false);
    };

    if(importanceFilterRef.current && !importanceFilterRef.current.contains(e.target)){
      setImportanceFilter(false);
    };
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mechanicsStatusOptions : MechanicsStatusOptions = {
    'Consistent': { value : 2, color: 'text-blue-400'},
    'Inconsistent': { value : 1, color: 'text-yellow-400'},
    'Not Learned': { value : 0, color: 'text-gray-400'},
  };

  const mechanicsDifficultyOptions: MechanicsDifficultyOptions = {
    'Insane': { value: 5, color: 'text-red-600'},
    'Hard': { value: 4, color: 'text-orange-400'},
    'Medium': { value: 3, color: 'text-yellow-400'},
    'Easy': { value: 2, color: 'text-blue-400'},
    'Very Easy': { value: 1, color: 'text-green-400'},
  };

  const mechanicsImportanceOptions: MechanicsImportanceOptions = {
    'Essential': { value: 5, color: 'text-gray-100'},
    'Important': { value: 4, color: 'text-gray-200'},
    'Situational': { value: 3, color: 'text-gray-300'},
    'Not Needed': { value: 2, color: 'text-gray-400'},
    'Not Useful': { value: 1, color: 'text-gray-500'},
  };

  return (
    <div className="w-full flex gap-2">
      <button className={`relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1 
      ${userIsLoggedIn && 'cursor-not-allowed'}`}
      onClick={()=> !userIsLoggedIn && setStatusFilter(!statusFilter)} ref={statusFilterRef}>
        <p>Status</p>
        {
        statusFilter &&
        <ul className="absolute top-full left-0 bg-jet-dark mt-1 p-1 rounded-sm" >
          {
          Object.keys(mechanicsStatusOptions).map((option, index) => (
            <li key={index} className={`hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap
            ${mechanicsStatusOptions[option].color}`} 
            onClick={()=> setFilterValues({...filterValues, mechanic_status_value: mechanicsStatusOptions[option].value}
              
            )}
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
        <ul className="absolute top-full left-0 bg-jet-dark mt-1 p-1 rounded-sm" >
          {
          Object.keys(mechanicsDifficultyOptions).map((option, index) => (
            <li key={index} className={`hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap
            ${mechanicsDifficultyOptions[option].color}`} 
            onClick={()=> setFilterValues({...filterValues, mech_difficulty: mechanicsDifficultyOptions[option].value})}
            >{option}</li>
          ))
          }
        </ul>
        }
      </button>

      <button className="relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
      onClick={()=> setImportanceFilter(!importanceFilter)} ref={importanceFilterRef}>
        <p>Importance</p>
        {
        importanceFilter &&
        <ul className="absolute top-full left-0 bg-jet-dark mt-1 p-1 rounded-sm" >
          {
          Object.keys(mechanicsImportanceOptions).map((option, index) => (
            <li key={index} className={`hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap
            ${mechanicsImportanceOptions[option].color}`} 
            onClick={()=> setFilterValues({...filterValues, mechanic_status_value: mechanicsImportanceOptions[option].value})}
            >{option}</li>
          ))
          }
        </ul>
        }
      </button>
      <div className="flex items-center gap-x-2 p-1 bg-black bg-opacity-25">
        <Icon className="text-gray-500" path={mdiMagnify} size={0.6} />
        <input className="text-white bg-black bg-opacity-0 outline-none caret-white placeholder-gray-600" 
        type="text" value={searchValue} placeholder="Search..." onChange={(e)=> setSearchValue(e.target.value)}/>
      </div>
      
    </div>
  )
}

export default MechanicsFilters;