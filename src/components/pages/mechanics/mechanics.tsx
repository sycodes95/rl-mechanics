import { useEffect, useState } from "react";

import getMechanics from "../../utils/getMechanics";
import { Mechanic } from "../../types/mechanicsAdmin/types";
import MechanicsTable from "./mechanicsTable";
import '../../../styles/mechanics.css'
function Mechanics() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([])
  useEffect(()=>{

  },[])
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${""}&filterValues=${JSON.stringify(null)}&selectedSortColumn=${JSON.stringify({ column: null, value: false})}&paginationData=${JSON.stringify({ pageNumber: 0, pageSize: 50, totalCount: null})}`)
    .then(res => res.json())
    .then(data => {
      setMechanicsData(data.mechanics)
      
    })
    .catch(err => {
      console.error(err);
    });
  },[])

  return (
    <div className="text-white w-full flex justify-center ">
      <div className="max-w-4xl w-full flex flex-col items-center">

      <section className="mt-44">
        <MechanicsTable mechanicsData={mechanicsData}/>
      </section>
      {/* {
      mechanicsData.map(mechanic => (
        <div className="bg-black bg-opacity-30 w-full flex flex-col items-center">
          <div>{mechanic.mech_name}</div>
          <div>{mechanic.mech_url}</div>
          <div hidden dangerouslySetInnerHTML={{__html: mechanic.mech_yt_url_controller}}></div>
          
        </div>
      ))
      } */}
      </div>
    </div>
  )
}

export default Mechanics;