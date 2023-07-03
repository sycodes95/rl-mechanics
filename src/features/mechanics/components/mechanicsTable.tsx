import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AddEditMechanic from "./addEditMechanic";

import Icon from '@mdi/react';
import {  mdiPencil, mdiDelete, mdiDotsCircle, mdiCircleOutline, mdiHelpCircleOutline } from '@mdi/js';
import { difficultyColors, importanceColors } from "../../../constants/colors";
import DeleteMechanic from "./deleteMechanic";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

import { 
  setEditMechanicIsOpen, 
  setDeleteMechanicIsOpen, 
  setAddMechanicIsOpen, 
  clearSortColumn, 
  setMechanicsStatuses,
  setSortColumn
} from "../../mechanics/slice/mechanicsSlice";

import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsStatusOptions } from "../../../constants/options";

import { Tooltip } from "react-tooltip";

function MechanicsTable () {

  const dispatch = useDispatch()

  const [showMechanicStatus, setShowMechanicStatus] = useState<null | number>(null)

  const [mechanicHoverGif, setMechanicHoverGif] = useState({
    hover: false,
    mech_id: 0,
    gif_url: ""
  })

  const statusButtonRef = useRef<HTMLButtonElement>(null)

  const statusOptionsList = useRef<HTMLUListElement>(null)

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { 
    deleteMechanicIsOpen, 
    editMechanicIsOpen,
    sortColumn,
    mechanicsData,
    mechanicStatuses
  } = useSelector((state: RootState) => state.mechanicsSlice)

  const handleColumnSort = (column: string | null) => {
    
    if(sortColumn.column === column){
      if(sortColumn.clicks === 1){
        return dispatch(clearSortColumn())
      }
      return dispatch(setSortColumn({...sortColumn, value: !sortColumn.value, clicks: sortColumn.clicks + 1}))
    }  

    if(!sortColumn.column || sortColumn.column !== column){
      return dispatch(setSortColumn({ column: column, value: true, clicks: 0}))
    } 
  }

  const mechTableColumns = {
    mech_status: 'Status',
    mech_type: 'Type',
    mech_name: 'Name',
    mech_difficulty: 'Difficulty',
    mech_importance: 'Importance',
    rating_difficulty: 'Rated Difficulty',
    rating_importance: 'Rated Importance'
  };

  const handleStatusClick = (index: number) => {
    if(index === showMechanicStatus){
      setShowMechanicStatus(null)
    } else {
      setShowMechanicStatus(index)
    }
  }

  const handleStatusChange = (mech_id : number, mechanic_status_value : number) => {
    const data = {
      mech_id,
      user_id : user_details?.user_id,
      mechanic_status_value
    }
    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-status-put`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      
      if(data && data.mechanic){

        const {
          mech_id, 
          mechanic_status_value
        } = data.mechanic;

        dispatch(setMechanicsStatuses({...mechanicStatuses, [mech_id] : mechanic_status_value}));

      }
    })
  }



  useEffect(() => {
    //if user clicks outside of status selection, close it
    const handleClickOutsideStatus = (e: any) => {
      
      if((statusOptionsList.current && !statusOptionsList.current.contains(e.target)) && (statusButtonRef.current && !statusButtonRef.current.contains(e.target))){
        setShowMechanicStatus(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideStatus);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideStatus);
    };
  }, []);

  return(
    <table className="">
      <thead className="border-b border-black border-opacity-25">
        <tr className="h-8 text-left">
          {
            user_details && user_details.user_is_admin &&
            <th className="pl-2 pr-4 text-xs text-gray-400 min-w-6rem">Admin</th>
          }
          
        {
          Object.keys(mechTableColumns).map((column, index) => (
          // column !== 'mech_status' &&
          <th className={`text-gray-400 text-xs pr-4 
          cursor-pointer hover:text-gray-600 transition-all 
          ${column !== 'mech_type' && column !== 'mech_name' && 'min-w-6rem'}
          ${column === 'mech_name' && 'min-w-16rem'}
          ${column === 'mech_type' && 'min-w-8rem'}
          
          ${column === 'mech_status' && 'pointer-events-none'}
          ${column === 'mech_status' && 'min-w-4rem'}
          ${column === 'rating_difficulty' && 'pointer-events-none'}
          ${column === 'rating_importance' && 'pointer-events-none'}
          `} key={index} 
          onClick={()=>handleColumnSort(column)}>
            {mechTableColumns[column as keyof typeof mechTableColumns]}
          </th>
          ))
        }

        </tr>
      </thead>
      <tbody>
        {
        mechanicsData &&
        mechanicsData.map((mech: any, i) => (
          <tr key={i} className="h-8 text-sm border-b-2 border-black border-opacity-10 hover:bg-black hover:bg-opacity-10">
            {
            user_details && user_details.user_is_admin &&
            
            <td className="pl-1">
              <div className="flex items-center gap-x-1">
                <button className="transition-colors hover:text-gray-400" onClick={()=> dispatch(setDeleteMechanicIsOpen({open: true, mech_id: mech.mech_id}))}>
                  <Icon path={mdiDelete} size={0.8} />
                </button>
                <button className="transition-colors hover:text-gray-400" onClick={()=> dispatch(setEditMechanicIsOpen({open: true, mech_id: mech.mech_id}))}>
                  <Icon path={mdiPencil} size={0.8} />
                </button>
                {
                deleteMechanicIsOpen.open && deleteMechanicIsOpen.mech_id === mech.mech_id &&
                <DeleteMechanic
                mechanic={mech}
                />
                }
                {
                editMechanicIsOpen.open && editMechanicIsOpen.mech_id === mech.mech_id &&
                <AddEditMechanic
                mechanic={mech}
                />
                }
              </div>
              
            </td>
            }
            {
            user_details ?
            <div  className="relative h-8 pl-1 overflow-visible">
              <button  className="relative h-full w-fit"  onClick={()=> handleStatusClick(i)} ref={statusButtonRef}  
              >
                {
                mechanicStatuses[mech.mech_id] 
                ? <div data-tooltip-id="mechanic-status-tooltip"
                  data-tooltip-content={`
                  ${mechanicsStatusOptions[mechanicStatuses[mech.mech_id]].tooltip}
                  `}
                  data-tooltip-place="bottom">
                    <Icon className={`${ mechanicsStatusOptions[mechanicStatuses[mech.mech_id]].color}`}
                    path={mechanicsStatusOptions[mechanicStatuses[mech.mech_id]].src} size={0.8} />
                  </div> 
                : <div className="text-gray-600" data-tooltip-id="mechanic-status-tooltip" data-tooltip-content={`
                  ${mechanicsStatusOptions[4].tooltip}`} data-tooltip-place="bottom">
                    <Icon path={mdiCircleOutline} size={0.8} />
                  </div>
                }

                {
                showMechanicStatus === i &&
                <ul className="absolute z-10 flex items-center h-6 gap-1 pl-1 pr-1 ml-1 -translate-y-1/2 bg-black bg-opacity-100 rounded-lg cursor-default top-1/2 left-full w-fit" ref={statusOptionsList}>
                  {
                  Object.keys(mechanicsStatusOptions).map(option => (
                    <li className="cursor-pointer" onClick={()=>handleStatusChange(mech.mech_id, Number(option))}>
                      <Icon className={`${mechanicsStatusOptions[Number(option)].color}`}
                      path={mechanicsStatusOptions[Number(option)].src} size={0.7} />
                    </li>
                  ))
                  }
                </ul>
                }
                
              </button>

              <Tooltip className="z-10" id="mechanic-status-tooltip" style={{ backgroundColor: "black", color : "white"}} />
            </div>
            
            :
            <div data-tooltip-id="mechanic-status-not-logged-in" className="flex items-center h-8 pl-1 w-fit"
            data-tooltip-content="Must be logged in to use this feature."
            data-tooltip-place="bottom">
              <Icon path={mdiHelpCircleOutline} size={0.7} />
              <Tooltip className="z-10" id="mechanic-status-not-logged-in" style={{ backgroundColor: "black", color : "white"}} />
            </div>
            
            }
            
            <td className="text-pink-500">
              {mech.mech_type}
            </td>
            <td className="relative overflow-visible">
              <div className="relative overflow-visible">
                <Link className="relative underline transition-all hover:text-blue-500 hover:cursor-pointer w-fit" 
                onMouseOver={()=> setMechanicHoverGif({ hover: true, mech_id: mech.mech_id ?? 0, gif_url: mech.mech_gif ?? ""})} 
                onMouseLeave={()=> setMechanicHoverGif({ hover: false, mech_id: 0, gif_url: ""})}
                to={`/mechanics/${mech.mech_url}`}> 
                {mech.mech_name}
                </Link>
                {/* {
                mechanicHoverGif.hover && mechanicHoverGif.mech_id === mech.mech_id && mechanicHoverGif.gif_url &&
                <div className="sticky z-50 bg-black bg-opacity-25 rounded-md top-1 w-96"
                >
                  <img className="z-50" key={mechanicHoverGif.mech_id} src={mechanicHoverGif.gif_url} />
                  <iframe className="h-64" src={mech.mech_gif}></iframe> 
                </div>
                } */}
                
              </div>
            </td>
            <td className={`${mech.mech_difficulty && difficultyColors[mech.mech_difficulty]}`}>
              {mechanicsDifficultyOptions[mech.mech_difficulty]}
            </td>
            <td className={`${mech.mech_importance && importanceColors[mech.mech_importance]}`}>
              {mechanicsImportanceOptions[mech.mech_importance]}
            </td>
            <td>N/A</td>
            <td className="w-20">N/A</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  )
}

export default MechanicsTable;
