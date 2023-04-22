import { useEffect, useState } from "react";
import { Mechanic } from "./admin";

import { IsDeleteOpen } from "./adminMechTable";
interface DeleteMechanicProps {
  isDeleteOpenContext: {
    isDeleteOpen: IsDeleteOpen;
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<IsDeleteOpen>>
  };
  mechanic: Mechanic
}

function DeleteMechanic ({ isDeleteOpenContext, mechanic } : DeleteMechanicProps) {
  const { isDeleteOpen, setIsDeleteOpen } = isDeleteOpenContext
  // const handleDeleteMechanicSubmit = () => {
  //   fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-delete?mech_id=${}`)
  // }

  const handleClose = () => {
    setIsDeleteOpen({...isDeleteOpen, open : false});
  }

  useEffect(()=>{
    console.log(mechanic);
  },[])
  return(
    <div className="z-50 fixed top-0 left-0 ">
      <div id="delete-mechanic-modal-overlay" className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-25 "></div>
      
      {
      mechanic &&
      <div className="bg-slate-800 text-white fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-4 rounded-md">
        <div>
          <p>DELETE MECHANIC?</p>
          <button onClick={handleClose}>X</button>
          
        </div>
        <div>
        <p>{mechanic.mech_id}</p>
        <p>{mechanic.mech_name}</p>
        <p>{mechanic.mech_description}</p>
        </div>
      </div>
      }
      
    </div>
  )
}

export default DeleteMechanic;