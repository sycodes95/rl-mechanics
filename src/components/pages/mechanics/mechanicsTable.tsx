import { useEffect, useState } from "react";
import { SelectedSortColumn } from "../../types/mechanicsAdmin/types";
import { Link } from "react-router-dom";

import Icon from '@mdi/react';
import { mdiRhombusSplit, mdiPencil, mdiDelete } from '@mdi/js';
import { IsDeleteOpen, IsEditMechanicOpen, Mechanic, User } from "./types";
import { difficultyColors, importanceColors } from "./colors";
import EditMechanic from "./editMechanic";
import DeleteMechanic from "./deleteMechanic";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";

import { setEditMechanicIsOpen, setDeleteMechanicIsOpen } from "../../../redux/slices/modalSlice";

type MechanicsTableProps = {
  mechanicsData: Mechanic[];
  selectedSortColumnContext: {
    selectedSortColumn: SelectedSortColumn;
    setSelectedSortColumn: React.Dispatch<React.SetStateAction<SelectedSortColumn>>;
  }
  user: User;
}

function MechanicsTable ({mechanicsData, selectedSortColumnContext} : MechanicsTableProps) {

  const dispatch = useDispatch()

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { deleteMechanicIsOpen, editMechanicIsOpen } = useSelector((state: RootState) => state.modalSlice)

  const {selectedSortColumn, setSelectedSortColumn} = selectedSortColumnContext;
  

  const mechTableColumns = {
    mech_status: 'Status',
    mech_type: 'Type',
    mech_name: 'Name',
    mech_difficulty: 'Difficulty',
    mech_importance: 'Importance',
    rating_difficulty: 'Rated Difficulty',
    rating_importance: 'Rated Importance'
  };

  const difficultySymbols = [
    <p className="text-green-400">Basic</p>,
    <p className="text-blue-400">Easy</p>,
    <p className="text-yellow-400">Medium</p>,
    <p className="text-orange-400">Hard</p>,
    <p className="text-red-400">Insane</p>
  ];

  const importanceSymbols = [
    <p className="text-gray-100">Essential</p>,
    <p className="text-gray-200">Important</p>,
    <p className="text-gray-300">Situational</p>,
    <p className="text-gray-400">Not Needed</p>,
    <p className="text-gray-500">Not Useful</p>
  ];

  const handleColumnSort = (column: string | null) => {
    
    if(selectedSortColumn.column === column){
      return setSelectedSortColumn({...selectedSortColumn, value: !selectedSortColumn.value})
    }  

    if(!selectedSortColumn.column || selectedSortColumn.column !== column){
      return setSelectedSortColumn({ column: column, value: true})
    } 
  }
  useEffect(()=>{
    console.log(deleteMechanicIsOpen);
  },[deleteMechanicIsOpen])

  useEffect(()=>{
    console.log(editMechanicIsOpen);
  },[editMechanicIsOpen])
  return(
    <table className="overflow-x-auto">
      <thead className="border-b border-black border-opacity-25">
        <tr className="h-8 text-left">
          {
            user_details && user_details.user_is_admin &&
            <th className="pl-2 pr-4 text-xs text-gray-400 min-w-6rem">Admin</th>
          }
          
        {
          Object.keys(mechTableColumns).map((column, index) => (
          
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
        mechanicsData.map((mech, i) => (
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
                <EditMechanic
                mechanic={mech}
                />
                }
              </div>
              
            </td>
            }
            <td></td>
            <td className="text-blue-400">
              {mech.mech_type}
            </td>
            <td className="">
              <Link className="transition-all hover:text-blue-500 hover:cursor-pointer w-fit" 
              to={`/mechanics/${mech.mech_url}`}> 
              {mech.mech_name}
              </Link>
            </td>
            <td className={`${difficultyColors[mech.mech_difficulty]}`}>
              {mech.mech_difficulty}
            </td>
            <td className={`${importanceColors[mech.mech_importance]}`}>
              {mech.mech_importance}
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
