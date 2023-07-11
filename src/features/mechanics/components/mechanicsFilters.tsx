import { useEffect, useRef, useState } from "react";

import Icon from '@mdi/react';
import { mdiMagnify, mdiCloseCircle, mdiCheck, mdiChevronDown, mdiRotateLeft } from '@mdi/js';
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsStatusOptions, mechanicsTypeOptions } from "../../../constants/options";
import { difficultyColors, importanceColors } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFilterValues, setSearchValue ,clearSearchValue, clearFilterValues } from "../slice/mechanicsSlice";


function MechanicsFilters () {

  const dispatch = useDispatch()

  const { user_details } = useSelector((state: RootState) => state.userSlice)
  
  const {filterValues, searchValue} = useSelector((state: RootState) => state.mechanicsSlice);

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
    dispatch(clearFilterValues());
    dispatch(clearSearchValue());
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center w-full p-2 border-2 border-black border-opacity-25 rounded-lg bg-jet-dark">
      <section id="filter-selections" className="flex flex-wrap w-full gap-x-4 gap-y-2 mw-480px-flex-col ">
        {
        user_details &&
        <button id="status-filter" 
        className={`relative flex items-center gap-x-1 text-sm text-gray-400 bg-jet-dark rounded-sm bg-opacity-25 p-1 flex-1 w-full justify-between z-10 
        border-b-2 border-black border-opacity-25`}
        onClick={()=> setStatusFilter(!statusFilter)} ref={statusFilterRef}>
          <p>Status</p>
          <div className="">
            <Icon className={`text-sm transition-transform ${statusFilter && 'rotate-180'}`} 
            path={mdiChevronDown} size={0.6} />
          </div>
          {
          statusFilter &&
          <ul className="absolute left-0 p-1 mt-1 border-2 border-black border-opacity-25 rounded-lg bg-jet-darker mw-480px-w-full top-full" >
            
            {
            Object.keys(mechanicsStatusOptions).map((option, index) => (
              Number(option) !== 1 &&
              <li key={index} className={`flex items-center gap-2 hover:bg-black hover:bg-opacity-25 w-full rounded-lg p-1 whitespace-nowrap ${mechanicsStatusOptions[Number(option)].color} gap-2`} 
              onClick={()=> dispatch(setFilterValues({...filterValues, mechanic_status_value: option}))}>
                <Icon className={`text-sm `} 
                path={mechanicsStatusOptions[Number(option)].src} size={0.6} />
                <p>{mechanicsStatusOptions[Number(option)].tooltip}</p>
                {
                filterValues.mechanic_status_value === option &&
                <div className="flex items-center text-green-400"><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
              
            ))
            }
          </ul>
          }
        </button>
        }

        <button id="type-filter" 
        className="relative flex items-center justify-between flex-1 w-full p-1 text-sm text-gray-400 border-b-2 border-black border-opacity-25 mw-480px-w-full bg-opacity-30 gap-x-1"
        onClick={()=> setTypeFilter(!typeFilter)} ref={typeFilterRef}>
          <p>Type</p>
          <div className="">
            <Icon className={`text-sm transition-transform ${typeFilter && 'rotate-180'}`} 
            path={mdiChevronDown} size={0.6} />
          </div>
          {
          typeFilter &&
          <ul className="absolute left-0 z-10 w-full p-1 mt-1 border-2 border-black border-opacity-25 rounded-md backdrop-blur-md top-full mw-480px-w-full min-w-fit bg-jet-darker" >
            {
            mechanicsTypeOptions.map((option, index) => (
              <li key={index} className={`flex justify-between hover:bg-black hover:bg-opacity-40 rounded-md w-full p-1 whitespace-nowrap gap-2`}
              onClick={()=> dispatch(setFilterValues({...filterValues, mech_type: option}))}>
                <p>{option}</p>
                {
                filterValues.mech_type === option &&
                <div className="flex items-center text-green-400"><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
            ))
            }
          </ul>
          }
        </button>

        <button id="difficulty-filter"
        className="relative flex items-center justify-between flex-1 w-full p-1 text-sm text-gray-400 border-b-2 border-black border-opacity-25 bg-opacity-30 gap-x-1 hover:bg-opacity-50"
        onClick={()=> setDifficultyFilter(!difficultyFilter)} ref={difficultyFilterRef}>
          <p>Difficulty</p>
          <div className="">
            <Icon className={`text-sm transition-transform ${difficultyFilter && 'rotate-180'}`} 
            path={mdiChevronDown} size={0.6} />
          </div>
          {
          difficultyFilter &&
          <ul className="absolute left-0 z-10 w-full p-1 mt-1 border-2 border-black border-opacity-25 rounded-md bg-jet-darker backdrop-blur-md top-full min-w-fit" >
            {
            Object.keys(mechanicsDifficultyOptions).map((option, index) => (
              <li className={`flex justify-between rounded-md hover:bg-black hover:bg-opacity-40 w-full p-1 whitespace-nowrap gap-2`}
              key={index} 
              onClick={()=> dispatch(setFilterValues({...filterValues, mech_difficulty: option}))}>
                <p className={`${difficultyColors[Number(option)]}`}>{mechanicsDifficultyOptions[Number(option)]}</p>
                {
                filterValues.mech_difficulty === option &&
                <div className={`flex items-center text-green-400`}><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
            ))
            }
            
          </ul>
          }
        </button>

        <button id="importance-filter" 
        className="relative flex items-center justify-between flex-1 w-full p-1 text-sm text-gray-400 border-b-2 border-black border-opacity-25 bg-opacity-30 gap-x-1 hover:bg-opacity-50"
        onClick={()=> setImportanceFilter(!importanceFilter)} ref={importanceFilterRef}>
          <p>Importance</p>
          <div className="flex">
            <Icon className={`text-sm transition-transform ${importanceFilter && 'rotate-180'}`} 
            path={mdiChevronDown} size={0.6} />
          </div>
          {
          importanceFilter &&
          <ul className="absolute left-0 z-10 w-full p-1 mt-1 border-2 border-black border-opacity-25 rounded-md bg-jet-darker top-full backdrop-blur-sm min-w-fit" >
            {
            Object.keys(mechanicsImportanceOptions).map((option, index) => (
              <li className={`flex justify-between hover:bg-black rounded-md  hover:bg-opacity-25 w-full p-1 whitespace-nowrap gap-2`} 
              onClick={()=> dispatch(setFilterValues({...filterValues, mech_importance: option}))}>
                <p className={`${importanceColors[Number(option)]}`}>{mechanicsImportanceOptions[Number(option)]}</p>
                {
                filterValues.mech_importance === option &&
                <div className={`flex items-center text-green-400`}><Icon path={mdiCheck} size={0.6} /></div>
                }
              </li>
              
            ))
            }
          </ul>
          }
        </button>

        <div className="flex items-center flex-1 w-full p-1 bg-black rounded-md bg-opacity-30 gap-x-2">
          <Icon className="text-gray-500" path={mdiMagnify} size={0.6} />
          <input className="text-sm text-white placeholder-gray-600 bg-black bg-opacity-0 outline-none  caret-white min-w-max" 
          type="text" value={searchValue} placeholder="Search..." onChange={(e)=> dispatch(setSearchValue(e.target.value))}/>
        </div>

      </section>
      {
      (Object.keys(filterValues).map(value => value).some(value => filterValues[value] != "" && filterValues[value] != undefined) || searchValue) &&
      <section className="flex justify-between pt-2">
        <div className="flex flex-wrap gap-2">
          {
          Object.keys(filterValues).map((key, index) => (
            filterValues[key] && 
            <div className="flex items-center p-1 text-xs bg-black rounded-md bg-opacity-40 gap-x-2" key={index}>
              {
              key === 'mech_difficulty' &&
              <p className={`${difficultyColors[Number(filterValues[key])]}`}>{mechanicsDifficultyOptions[Number(filterValues[key])]}</p> 
              }
              {
              key === 'mech_importance' &&
              <p className={`${importanceColors[Number(filterValues[key])]} `}>{mechanicsImportanceOptions[Number(filterValues[key])]}</p> 
              }
              {
              key === 'mechanic_status_value' &&
              <p className={`${mechanicsStatusOptions[Number(filterValues[key])].color} flex items-center gap-2 `}>
                
                  <Icon className={``} path={mechanicsStatusOptions[Number(filterValues[key])].src} size={0.6} />
                
                {mechanicsStatusOptions[Number(filterValues[key])].tooltip}
              </p> 
              }
              {
              key !== 'mech_difficulty' && key !== 'mech_importance' && key !== 'mechanic_status_value' &&
              <p className=''>{filterValues[key]}</p> 
              }
              
              <button className="text-gray-600 transition-colors hover:text-gray-400" 
              onClick={()=> dispatch(setFilterValues({...filterValues, [key]: "" }))}>
                <Icon path={mdiCloseCircle} size={0.6} />
              </button>
              
            </div>
          ))
          }
          {
          searchValue &&
          <div className="flex items-center p-1 text-xs bg-black rounded-md bg-opacity-40 gap-x-2">
            <p className="">{searchValue}</p> 
            <button className="text-gray-600 transition-colors hover:text-gray-400" 
            onClick={()=> dispatch(clearSearchValue())}>
              <Icon path={mdiCloseCircle} size={0.6} />
            </button>
            
          </div>
          }
        </div>
        {
        (Object.values(filterValues).some(value => value !== "") || searchValue) &&
        <button className="flex p-1 text-red-500 transition-colors cursor-pointer hover:text-red-600 gap-x-1" 
        onClick={handleResetFilterValues}>
          <p className="text-xs">Reset</p>
          <Icon path={mdiRotateLeft} size={0.8} />
        </button>
        }
        
      </section>
      }

      
      
    </div>
  )
}

export default MechanicsFilters;