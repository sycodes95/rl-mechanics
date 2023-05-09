import { useEffect, useState } from "react";
import { Mechanic, SelectedSortColumn } from "../../types/mechanicsAdmin/types";
import { Link, useSearchParams } from "react-router-dom";

import Icon from '@mdi/react';
import { mdiRhombusSplit } from '@mdi/js';



type MechanicsTableProps = {
  mechanicsData: Mechanic[];
  selectedSortColumnContext: {
    selectedSortColumn: SelectedSortColumn;
    setSelectedSortColumn: React.Dispatch<React.SetStateAction<SelectedSortColumn>>;
  }
}

function MechanicsTable ({mechanicsData, selectedSortColumnContext} : MechanicsTableProps) {
  const {selectedSortColumn, setSelectedSortColumn} = selectedSortColumnContext
  const mechTableColumns = {
    status: 'Status',
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
  ]

  const handleColumnSort = (column: string | null) => {
    
    if(selectedSortColumn.column === column){
      return setSelectedSortColumn({...selectedSortColumn, value: !selectedSortColumn.value})
    }  

    if(!selectedSortColumn.column || selectedSortColumn.column !== column){
      return setSelectedSortColumn({ column: column, value: true})
    } 
  }
  
  return(
    <table className="">
      <thead className="border-b border-black border-opacity-25">
        <tr className="h-8 text-left">
        {
          Object.keys(mechTableColumns).map((column, index) => (
          <th className={`text-gray-400 text-xs pr-4 
          cursor-pointer hover:text-gray-600 transition-all ${column === 'mech_name' ? 'min-w-80' : 'min-w-32'}`} key={index} 
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
            <td>  </td>
            <td>{mech.mech_type}</td>
            <td className="">
              <Link className=" hover:text-blue-500 hover:cursor-pointer transition-all w-fit" 
              to={`/mechanics/${mech.mech_url}`}> 
              {mech.mech_name}
              </Link>
            </td>
            <td>{difficultySymbols[mech.mech_difficulty - 1]}</td>
            <td className="">
              <div className="h-full flex min-w-fit"> 
                <Icon className={`${mech.mech_importance >= 1 ? 'text-yellow-400' : 'text-gray-600'}`} 
                path={mdiRhombusSplit} size={0.7}/>
                <Icon className={`${mech.mech_importance >= 2 ? 'text-yellow-400' : 'text-gray-600'}`} 
                path={mdiRhombusSplit} size={0.7}/>
                <Icon className={`${mech.mech_importance >= 3 ? 'text-yellow-400' : 'text-gray-600'}`} 
                path={mdiRhombusSplit} size={0.7}/>
                <Icon className={`${mech.mech_importance >= 4 ? 'text-yellow-400' : 'text-gray-600'}`} 
                path={mdiRhombusSplit} size={0.7}/>
                <Icon className={`${mech.mech_importance >= 5 ? 'text-yellow-400' : 'text-gray-600'}`} 
                path={mdiRhombusSplit} size={0.7}/>
              </div>
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
