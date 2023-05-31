import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Icon from '@mdi/react';
import {  mdiPencil, mdiDelete } from '@mdi/js';
import { difficultyColors, importanceColors } from "./colors";
import DeleteMechanic from "./deleteMechanic";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

import { setEditMechanicIsOpen, setDeleteMechanicIsOpen, setAddMechanicIsOpen } from "../../redux/slices/modalSlice";
import { setSortColumn } from "../../redux/slices/filterSlice";
import AddEditMechanic from "./addEditMechanic";
import { mechanicsDifficultyOptions, mechanicsImportanceOptions } from "./options";

function MechanicsTable () {

  const dispatch = useDispatch()

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { deleteMechanicIsOpen, editMechanicIsOpen } = useSelector((state: RootState) => state.modalSlice)

  const { sortColumn } = useSelector((state: RootState) => state.filterSlice)

  const { mechanicsData } = useSelector((state: RootState) => state.mechanicSlice)

  const [mechanicHoverGif, setMechanicHoverGif] = useState({
    hover: false,
    mech_id: 0,
    gif_url: ""
  })

  const handleColumnSort = (column: string | null) => {
    
    if(sortColumn.column === column){
      return dispatch(setSortColumn({...sortColumn, value: !sortColumn.value}))
    }  

    if(!sortColumn.column || sortColumn.column !== column){
      return dispatch(setSortColumn({ column: column, value: true}))
    } 
  }
  useEffect(()=>{
    console.log(deleteMechanicIsOpen);
  },[deleteMechanicIsOpen])

  useEffect(()=>{
    console.log(editMechanicIsOpen);
  },[editMechanicIsOpen])

  const mechTableColumns = {
    mech_status: 'Status',
    mech_type: 'Type',
    mech_name: 'Name',
    mech_difficulty: 'Difficulty',
    mech_importance: 'Importance',
    rating_difficulty: 'Rated Difficulty',
    rating_importance: 'Rated Importance'
  };

  useEffect(()=>{
    console.log(mechanicHoverGif);
  },[mechanicHoverGif])
  return(
    <table className="flex-1">
      <thead className="border-b border-black border-opacity-25">
        <tr className="h-8 text-left">
          {
            user_details && user_details.user_is_admin &&
            <th className="pl-2 pr-4 text-xs text-gray-400 min-w-6rem">Admin</th>
          }
          
        {
          Object.keys(mechTableColumns).map((column, index) => (
          column !== 'mech_status' &&
          <th className={`text-gray-400 text-xs pr-4 
          cursor-pointer hover:text-gray-600 transition-all 
          ${column !== 'mech_type' && column !== 'mech_name' && 'min-w-6rem'}
          ${column === 'mech_name' && 'min-w-16rem'}
          ${column === 'mech_type' && 'min-w-8rem'}
          
          ${column === 'mech_status' && 'pointer-events-none'}
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
          <tr key={i} className="h-8 text-sm">
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
            {/* <td>status...</td> */}
            <td className="text-pink-500">
              {mech.mech_type}
            </td>
            <td className="overflow-visible">
              <div className="relative overflow-visible">
                <Link className="relative transition-all hover:text-blue-500 hover:cursor-pointer w-fit" 
                onMouseOver={()=> setMechanicHoverGif({ hover: true, mech_id: mech.mech_id ?? 0, gif_url: mech.mech_gif_url ?? ""})} 
                onMouseLeave={()=> setMechanicHoverGif({ hover: false, mech_id: 0, gif_url: ""})}
                onLoad={(e) => {
                  const imageElement = e.target as HTMLImageElement;
                  imageElement.src = mechanicHoverGif.gif_url;
                }} 
                to={`/mechanics/${mech.mech_url}`}> 
                {mech.mech_name}
                </Link>
                {
                  mechanicHoverGif.hover && mechanicHoverGif.mech_id === mech.mech_id && mechanicHoverGif.gif_url &&
                <div className="fixed z-50 p-2 bg-black bg-opacity-25 rounded-md backdrop-blur-lg w-96 ">
                  <img className="z-50" key={mechanicHoverGif.mech_id} src={mechanicHoverGif.gif_url} />
                </div>
                }
                
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
