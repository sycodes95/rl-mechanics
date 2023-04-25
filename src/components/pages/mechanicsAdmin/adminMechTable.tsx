
import { Mechanic } from "./admin";

import format from "date-fns/format";

import Icon from '@mdi/react';
import { mdiDelete, mdiFileEdit } from '@mdi/js';

import Rating from "react-rating";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import DeleteMechanic from "./deleteMechanic";
import EditMechanic from "./editMechanic";
import { MechanicData } from "./addMechanic";

interface AdminMechTableProps {
  mechanicsDataContext: {
    mechanicsData: Mechanic[];
    setMechanicsData: React.Dispatch<React.SetStateAction<Mechanic[]>>;
  };
}

export interface IsDeleteOpen {
  open: boolean;
  mech_id: null | number;
}

export interface IsEditMechanicOpen {
  open: boolean;
  mech_id: null | number;
}


function AdminMechTable({mechanicsDataContext} :AdminMechTableProps ) {

  const {mechanicsData, setMechanicsData} = mechanicsDataContext;

  const [isDeleteOpen, setIsDeleteOpen] = useState<IsDeleteOpen>({
    open: false,
    mech_id: null
  });

  const [editMechanicIsOpen, setEditMechanicIsOpen] = useState<IsEditMechanicOpen>({
    open: false, 
    mech_id: null
  })

  const mechTableColumns = {
    mech_created_at: 'UPLOAD DATE',
    mech_id: 'ID',
    mech_name: 'NAME',
    mech_description: 'DESCRIPTION',
    mech_difficulty: 'DIFFICULTY',
    mech_importance: 'IMPORTANCE',
  };

  return(
    
    <table className="overflow-auto table-fixed w-full">
      <thead>
        <tr className="text-sm bg-slate-800">
          <th id="tab" className="border-r border-black p-1 text-xs text-red-900 w-12">D</th>
          <th className="border-l-2 border-black border-opacity-10 p-1 text-xs text-yellow-900 w-12">E</th>
          {
          Object.keys(mechTableColumns).map((column, index) => (
          <th className={`text-gray-400 text-xs border-l-2 border-black border-opacity-10 p-1
          ${column === 'mech_id' && 'w-12'}`} 
          key={index}>{mechTableColumns[column as keyof typeof mechTableColumns]}</th>
          ))
          }
        </tr>
      </thead>

      <tbody>
        {
        mechanicsData.length > 0 &&
        mechanicsData.map((mechanic: Mechanic, index) => (
          <tr className="text-center text-xs" key={index}>
            <td className="bg-red-900 bg-opacity-10">
              <div className="flex justify-center " >
                <button onClick={()=> setIsDeleteOpen({ open: true, mech_id: mechanic.mech_id})}>
                <Icon className="flex justify-center hover:text-red-200 transition-all cursor-pointer" path={mdiDelete} size={0.7} />

                </button>
                {
                isDeleteOpen.open && isDeleteOpen.mech_id === mechanic.mech_id &&
                <DeleteMechanic 
                isDeleteOpenContext={{isDeleteOpen, setIsDeleteOpen}}
                mechanic={mechanic}
                />
                }
                
              </div>
            </td>
            <td className="bg-yellow-900 bg-opacity-10">
              <div className="flex justify-center hover:text-yellow-200 transition-all ">
                <button onClick={()=> setEditMechanicIsOpen({ open: true, mech_id: mechanic.mech_id})}>
                <Icon className="flex justify-center" path={mdiFileEdit} size={0.6} />
                </button>
                {
                editMechanicIsOpen.open && editMechanicIsOpen.mech_id === mechanic.mech_id &&
                <EditMechanic 
                editMechanicIsOpenContext={{editMechanicIsOpen, setEditMechanicIsOpen}}
                mechanic={mechanic}
                />
                }
              </div>
            </td>

            <td>{format(new Date(mechanic.mech_created_at), 'yyyy-MM-dd')}</td>
            <td>{mechanic.mech_id}</td>
            <td>{mechanic.mech_name}</td>
            <td>
              <a className="text-black text-xs bg-gray-500 rounded-md pr-2 pl-2 
              hover:bg-gray-400 cursor-default transition-all whitespace-nowrap" 
              data-tooltip-id="my-tooltip" data-tooltip-content={mechanic.mech_description}>
                Show Description
              </a>
              <Tooltip className="bg-gray-300 text-black" id="my-tooltip" />
              
            </td>
            <td>
              <Rating
              className='  flex justify-between'
              initialRating={mechanic.mech_difficulty}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              readonly
              />
            </td>
            <td>
              <Rating
              className='  flex justify-between'
              initialRating={mechanic.mech_importance && mechanic.mech_importance}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              readonly
              />
            </td>
          </tr>
        ))
        }
      </tbody>
    </table>
    
  )
}

export default AdminMechTable;
