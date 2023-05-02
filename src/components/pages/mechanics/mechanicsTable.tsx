import { useEffect } from "react";
import { Mechanic } from "../../types/mechanicsAdmin/types";
import { Link } from "react-router-dom";
type MechanicsTableProps = {
  mechanicsData: Mechanic[]
}

function MechanicsTable ({mechanicsData} : MechanicsTableProps) {
  const mechTableColumns = {
    mech_name: 'NAME',
    mech_difficulty: 'DIFFICULTY',
    mech_importance: 'IMPORTANCE',
    rating_difficulty: 'RATED DIFFICULTY',
    rating_importance: 'RATED IMPORTANCE'
  };
  useEffect(()=>{
    console.log(mechanicsData);
  },[mechanicsData])
  return(
    <table className="w-full">
      <thead className="">
        <tr>
        {
          Object.keys(mechTableColumns).map((column, index) => (
          <th className={`text-gray-400 text-xs border-l-2 border-black border-opacity-10 p-1
          cursor-pointer hover:text-gray-600 transition-all ${column === 'mech_name' && 'w-96'}`} key={index} 
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
          <tr key={i} className="text-center text-xs">
            <td className="flex justify-center">
              <Link className="hover:text-blue-500 hover:cursor-pointer transition-all w-fit" to={`/mechanics/${mech.mech_url}`}> 
              {mech.mech_name}
              </Link>
            </td>
            <td>{mech.mech_difficulty}</td>
            <td>{mech.mech_importance}</td>
            <td>rated dif</td>
            <td>rated imp</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  )
}

export default MechanicsTable;
