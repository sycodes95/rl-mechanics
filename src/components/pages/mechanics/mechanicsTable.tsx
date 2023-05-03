import { useEffect, useState } from "react";
import { Mechanic } from "../../types/mechanicsAdmin/types";
import { Link, useSearchParams } from "react-router-dom";

import Icon from '@mdi/react';
import { mdiRhombusSplit } from '@mdi/js';



type MechanicsTableProps = {
  mechanicsData: Mechanic[]
}

function MechanicsTable ({mechanicsData} : MechanicsTableProps) {
  const mechTableColumns = {
    status: 'Status',
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
  
  return(
    <table className=" overflow-scroll">
      <thead className="border-b border-black border-opacity-25">
        <tr className="h-8 text-left">
          
        {
          Object.keys(mechTableColumns).map((column, index) => (
          <th className={`text-gray-400 text-xs
          cursor-pointer hover:text-gray-600 transition-all ${column === 'mech_name' && 'w-80'}`} key={index} 
          >
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
            <td className=" h-full">
              <Link className=" hover:text-blue-500 hover:cursor-pointer transition-all w-fit" 
              to={`/mechanics/${mech.mech_url}`}> 
              {mech.mech_name}
              </Link>
            </td>
            <td>{difficultySymbols[mech.mech_difficulty - 1]}</td>
            <td className="w-20">
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
