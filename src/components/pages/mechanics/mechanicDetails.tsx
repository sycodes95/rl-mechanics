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
    <div>
      {
      mechanicDetails?.mech_yt_url_controller &&
      <div dangerouslySetInnerHTML={{__html: mechanicDetails.mech_yt_url_controller}}></div>
      }
    </div>
  )
}

export default MechanicDetails;