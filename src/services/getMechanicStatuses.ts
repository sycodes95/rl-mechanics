import { useDispatch } from "react-redux";
import { setMechanicsStatus} from "../features/mechanics/slice/mechanicsSlice";


type MechanicStatus = {
  mech_id: number;
  mechanic_status_id: number;
  mechanic_status_value: number;
  user_id: number;
}


export const getMechanicsStatus = (user_id : number) => {

  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-status-get?user_id=${user_id}`)
  .then(res => res.json())
  .then(data => {
    let mechanicsStatusData : { [key: number] : any } = {}
    data.mechanics_statuses.forEach((mech: MechanicStatus) => {
      mechanicsStatusData[mech.mech_id] = mech.mechanic_status_value
    })
    return mechanicsStatusData
  })
  .catch((error) => {
    console.error("Error occurred during data fetch for mechanic statuses:", error);
  });
}