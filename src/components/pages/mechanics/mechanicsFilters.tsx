import { useEffect, useRef, useState } from "react";
import { MechanicsDifficultyOptions, MechanicsFiltersProps, MechanicsImportanceOptions, MechanicsStatusOptions } from "./types";

import Icon from '@mdi/react';
import { mdiMagnify, mdiCloseCircle, mdiCheck, mdiChevronDown, mdiRotateLeft } from '@mdi/js';
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsStatusOptions, mechanicsTypeOptions } from "./options";
import { difficultyColors, importanceColors } from "./colors";



function MechanicsFilters ({ filterValuesContext ,searchValueContext, userIsLoggedIn } : MechanicsFiltersProps) {
  
  const {searchValue, setSearchValue} = searchValueContext;
  const {filterValues, setFilterValues} = filterValuesContext;

  const [statusFilter, setStatusFilter] = useState(false);

  const statusFilterRef = useRef<HTMLButtonElement>(null);

  const [difficultyFilter, setDifficultyFilter] = useState(false);

  const difficultyFilterRef = useRef<HTMLButtonElement>(null);

  const [importanceFilter, setImportanceFilter] = useState(false);

  const importanceFilterRef = useRef<HTMLButtonElement>(null);

  const [typeFilter, setTypeFilter] = useState(false)

  const typeFilterRef = useRef<HTMLButtonElement>(null)

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

    if(typeFilterRef.current && !typeFilterRef.current.contains(e.target)){
      setTypeFilter(false);
    };
  };

  const handleResetFilterValues = () => {
    const filterValuesCopy = {...filterValues}
    Object.keys(filterValuesCopy).forEach(key => {
      filterValuesCopy[key] = ""
    });
    setFilterValues(filterValuesCopy)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <section id="filter-selections" className="w-full flex gap-2">
      
        <button id="status-filter" 
        className={`relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1 
        ${userIsLoggedIn && 'cursor-not-allowed'}`}
        onClick={()=> !userIsLoggedIn && setStatusFilter(!statusFilter)} ref={statusFilterRef}>
          <p>Status</p>
          {
          statusFilter &&
          <ul className="absolute top-full left-0  bg-jet-dark mt-1 p-1 rounded-sm" >
            {
            mechanicsStatusOptions.map((option, index) => (
              <li key={index} className={`hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap`} 
              onClick={()=> setFilterValues({...filterValues, mechanic_status_value: option})}
              >{option}</li>
              
            ))
            }
          </ul>
          }
        </button>

        <button id="difficulty-filter"
        className="relative flex items-center gap-x-1 text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
        onClick={()=> setDifficultyFilter(!difficultyFilter)} ref={difficultyFilterRef}>
          <p>Difficulty</p>
          <div className="">
            <Icon className={`text-sm transition-transform ${difficultyFilter && 'rotate-180'}`} 
            path={mdiChevronDown} size={0.6} />
          </div>
          {
          difficultyFilter &&
          <ul className="absolute top-full left-0 w-32 bg-jet-dark mt-1 p-1 rounded-sm" >
            {
            mechanicsDifficultyOptions.map((option, index) => (
              <li key={index} className={`flex justify-between hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap
              ${difficultyColors[option]}`} 
              onClick={()=> setFilterValues({...filterValues, mech_difficulty: option})}>
                <p>{option}</p>
                {
                filterValues.mech_difficulty === option && 
                <div className="flex items-center text-blue-600"><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
            ))
            }
          </ul>
          }
        </button>

        <button id="importance-filter" 
        className="relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
        onClick={()=> setImportanceFilter(!importanceFilter)} ref={importanceFilterRef}>
          <p>Importance</p>
          {
          importanceFilter &&
          <ul className="absolute top-full left-0 w-32 bg-jet-dark mt-1 p-1 rounded-sm" >
            {
            mechanicsImportanceOptions.map((option, index) => (
              <li key={index} className={`flex justify-between hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap
              ${importanceColors[option]}`}
              onClick={()=> setFilterValues({...filterValues, mech_importance: option})}>
                <p>{option}</p>
                {
                filterValues.mech_importance === option &&
                <div className={`flex items-center text-blue-600`}><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
              
            ))
            }
          </ul>
          }
        </button>

        <button id="type-filter" 
        className="relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
        onClick={()=> setTypeFilter(!typeFilter)} ref={typeFilterRef}>
          <p>Type</p>
          {
          typeFilter &&
          <ul className="absolute top-full left-0 w-44 bg-jet-dark mt-1 p-1 rounded-sm" >
            {
            mechanicsTypeOptions.map((option, index) => (
              <li key={index} className={`flex justify-between hover:bg-black hover:bg-opacity-25 w-full p-1 whitespace-nowrap`}
              onClick={()=> setFilterValues({...filterValues, mech_type: option})}>
                <p>{option}</p>
                {
                filterValues.mech_type === option &&
                <div className="flex items-center text-blue-600"><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
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

      </section>

      <section className="flex justify-between">
        <div className="flex gap-2">
          {
          Object.keys(filterValues).map(key => (
            filterValues[key] && 
            <div className="flex items-center gap-x-2 text-xs p-1 rounded-sm bg-black">
              <p className={`${difficultyColors[filterValues[key]] || importanceColors[filterValues[key]]}`}>{filterValues[key]}</p> 
              <button onClick={()=> setFilterValues({...filterValues, [key]: "" })}>
                <Icon path={mdiCloseCircle} size={0.6} />
              </button>
              
            </div>
          ))
          }
        </div>
        {
        Object.values(filterValues).some(value => value !== "") &&
        <button className="flex gap-x-1 p-1 cursor-pointer" onClick={handleResetFilterValues}>
          <p className="text-xs">Reset</p>
          <Icon path={mdiRotateLeft} size={0.8} />
        </button>
        }
        
      </section>

      
      
    </div>
  )
}

export default MechanicsFilters;