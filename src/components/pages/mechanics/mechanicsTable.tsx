import { useEffect, useState } from "react";
import { SelectedSortColumn } from "../../types/mechanicsAdmin/types";
import { Link, useSearchParams } from "react-router-dom";

import Icon from '@mdi/react';
import { mdiRhombusSplit, mdiPencil, mdiDelete } from '@mdi/js';
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsTypeOptions } from "./options";
import { IsDeleteOpen, IsEditMechanicOpen, Mechanic } from "./types";
import { difficultyColors, importanceColors } from "./colors";
import EditMechanic from "./editMechanic";



type MechanicsTableProps = {
  mechanicsData: Mechanic[];
  selectedSortColumnContext: {
    selectedSortColumn: SelectedSortColumn;
    setSelectedSortColumn: React.Dispatch<React.SetStateAction<SelectedSortColumn>>;
  }
}

function MechanicsTable ({mechanicsData, selectedSortColumnContext} : MechanicsTableProps) {

  const {selectedSortColumn, setSelectedSortColumn} = selectedSortColumnContext;

  const [isDeleteOpen, setIsDeleteOpen] = useState<IsDeleteOpen>({
    open: false,
    mech_id: null
  });

  const [editMechanicIsOpen, setEditMechanicIsOpen] = useState<IsEditMechanicOpen>({
    open: false, 
    mech_id: null
  })

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
    console.log(mechanicsData);
  },[mechanicsData])
  return(
    <table className="overflow-x-auto">
      <thead className="border-b border-black border-opacity-25">
        <tr className="h-8 text-left">
          <th className="text-gray-400 text-xs pr-4 pl-2 min-w-6rem">Admin</th>
            
          
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
          <tr key={i} className="text-sm h-8">
            <td className="pl-1">
              <div className="flex items-center gap-x-1">
                <button className=" hover:text-gray-400 transition-colors"><Icon path={mdiDelete} size={0.8} /></button>
                <button className=" hover:text-gray-400 transition-colors" onClick={()=> setEditMechanicIsOpen({open: true, mech_id: mech.mech_id})}>
                  <Icon path={mdiPencil} size={0.8} />
                </button>
                {
                editMechanicIsOpen.open && editMechanicIsOpen.mech_id === mech.mech_id &&
                <EditMechanic
                editMechanicIsOpenContext={{editMechanicIsOpen, setEditMechanicIsOpen}}
                mechanic={mech}
                />
                }
              </div>
              
            </td>
            <td></td>
            <td className="text-blue-400">
              {mech.mech_type}
            </td>
            <td className="">
              <Link className=" hover:text-blue-500 hover:cursor-pointer transition-all w-fit" 
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
