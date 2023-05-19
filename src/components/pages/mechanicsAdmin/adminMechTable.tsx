

import format from "date-fns/format";

import Icon from '@mdi/react';
import { mdiDelete, mdiFileEdit } from '@mdi/js';

import Rating from "react-rating";
import { useEffect, useState } from "react";
import DeleteMechanic from "../mechanics/deleteMechanic";
import EditMechanic from "../mechanics/editMechanic";

import { 
  IsDeleteOpen, 
  IsEditMechanicOpen, 
  ColumnSortOrder, 
  SelectedSortColumn
} from "../../types/mechanicsAdmin/types";
import { Mechanic } from "../mechanics/types";

type AdminMechTableProps = {
  mechanicsDataContext: {
    mechanicsData: Mechanic[];
    setMechanicsData: React.Dispatch<React.SetStateAction<Mechanic[]>>;
  };
  selectedSortColumnContext: {
    selectedSortColumn: SelectedSortColumn;
    setSelectedSortColumn: React.Dispatch<React.SetStateAction<SelectedSortColumn>>;
  }
}

function AdminMechTable({mechanicsDataContext, selectedSortColumnContext} :AdminMechTableProps ) {

  const {mechanicsData, setMechanicsData} = mechanicsDataContext;

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
    mech_created_at: 'UPLOAD DATE',
    mech_id: 'ID',
    mech_name: 'NAME',
    mech_description: 'DESCRIPTION',
    mech_difficulty: 'DIFFICULTY',
    mech_importance: 'IMPORTANCE',
  };


  const handleColumnSort = (column: string | null) => {
    console.log(column);
    
    if(selectedSortColumn.column === column){
      return setSelectedSortColumn({...selectedSortColumn, value: !selectedSortColumn.value})
    }  

    if(!selectedSortColumn.column || selectedSortColumn.column !== column){
      return setSelectedSortColumn({ column: column, value: true})
    } 
  
  }



  return(
    
    <table className="w-full overflow-auto table-fixed">
      <thead>
        <tr className="text-sm bg-slate-800">
          <th id="tab" className="w-12 p-1 text-xs text-red-900 border-r border-black">D</th>
          <th className="w-12 p-1 text-xs text-yellow-900 border-l-2 border-black border-opacity-10">E</th>
          {
          Object.keys(mechTableColumns).map((column, index) => (
          <th className={`text-gray-400 text-xs border-l-2 border-black border-opacity-10 p-1
          cursor-pointer hover:text-gray-600 transition-all ${column === 'mech_id' && 'w-12'}`} key={index} 
          onClick={()=> handleColumnSort(column)}>
          
            {mechTableColumns[column as keyof typeof mechTableColumns]}
          </th>
          ))
          }
        </tr>
      </thead>

      <tbody>
        {
        mechanicsData.length > 0 &&
        mechanicsData.map((mechanic: Mechanic, index) => (
          <tr className="text-xs text-center" key={index}>
            <td className="bg-red-900 bg-opacity-10">
              <div className="flex justify-center " >
                <button onClick={()=> setIsDeleteOpen({ open: true, mech_id: mechanic.mech_id})}>
                <Icon className="flex justify-center transition-all cursor-pointer hover:text-red-200" path={mdiDelete} size={0.7} />

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
              <div className="flex justify-center transition-all hover:text-yellow-200 ">
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
            <td>{mechanic.mech_description}</td>
            <td>
              <Rating
              className='flex justify-between '
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
              className='flex justify-between '
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
