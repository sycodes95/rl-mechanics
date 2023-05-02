import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMechanicDetails from "../../utils/getMechanicDetails";

type MechanicDetails = {
  mech_created_at: string | null;
  mech_description: string | null;
  mech_difficulty: number | null;
  mech_id : number | null;
  mech_importance: number | null;
  mech_name: string;
  mech_url: string;
  mech_yt_url_controller: string | null;
  mech_yt_url_kbm: string | null;
}

function MechanicDetails () {
  const { mech_url } = useParams()
  const [mechanicDetails, setMechanicDetails] = useState<null| MechanicDetails>(null)
  useEffect(()=>{
    if(mech_url) getMechanicDetails(mech_url)?.then(details => setMechanicDetails(details))
  },[mech_url])

  useEffect(()=>{
    console.log(mechanicDetails);
  },[mechanicDetails])
  
  return(
    <div className="w-full flex justify-center ">
      <div className="bg-black bg-opacity-50 max-w-5xl w-full">

      <section className="flex justify-between p-4">
        <div className="text-white text-5xl">{mechanicDetails?.mech_name}</div>
        <div className="flex items-center gap-4 w-1/2 bg-black bg-opacity-20 
        text-sm text-white p-2">
          <section>
            <div>
              <p>DIFFICULTY</p>
            </div>
            <div>
              <p>IMPORTANCE</p>
            </div>
          </section>
          <section>
            <div>
              <p>USER RATED DIF.</p>
            </div>
            <div>
              <p>USER RATED IMP.</p>
            </div>
          </section>
          
        </div>
      </section>
      <section className="flex flex-col items-center ">
        <div className="relative h-96 w-full">
          {
          mechanicDetails?.mech_yt_url_controller &&
          <div dangerouslySetInnerHTML={{__html: mechanicDetails.mech_yt_url_controller}}></div>
          }
        </div>
      

        <div className="w-full text-xs text-white p-2 bg-black bg-opacity-25">
          <p className="text-xl text-center border-b border-white">DESCRIPTION</p>
          <p className="p-2">{mechanicDetails?.mech_description?.toUpperCase()}</p>
        </div>

      </section>
      
      </div>
    </div>
  )
}

export default MechanicDetails;