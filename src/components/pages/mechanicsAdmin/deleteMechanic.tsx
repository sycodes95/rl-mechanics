import { useEffect, useState } from "react";

import { IsDeleteOpen } from "./adminMechTable";
import { useNavigate } from "react-router-dom";

import { Oval } from "react-loader-spinner";
import Icon from '@mdi/react';
import { mdiCheckAll } from '@mdi/js';
import { Mechanic } from "./admin";

interface DeleteMechanicProps {
  isDeleteOpenContext: {
    isDeleteOpen: IsDeleteOpen;
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<IsDeleteOpen>>
  };
  mechanic: Mechanic
}

function DeleteMechanic ({ isDeleteOpenContext, mechanic } : DeleteMechanicProps) {
  const navigate = useNavigate()

  const { isDeleteOpen, setIsDeleteOpen } = isDeleteOpenContext

  const [deleteIsSuccessful, setDeleteIsSuccessful] = useState(false)

  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteMechanicSubmit = () => {


    setDeleteIsLoading(true)

    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-delete?mech_id=${mechanic.mech_id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {

      setDeleteIsLoading(false)

      if(data && data.mechanics > 0) {
        setDeleteIsSuccessful(true)
        setTimeout(()=>{
          navigate(0)
        },1000)
      }

      
    })
  }

  const handleClose = () => {
    setIsDeleteOpen({...isDeleteOpen, open : false});
  }

  useEffect(()=>{
    console.log(mechanic);
  },[])
  return(
    <div  className="z-50">
      <div id="delete-mechanic-modal-overlay" className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-25 " onClick={handleClose}></div>
      
      {
      mechanic &&
      <div id="delete-mechanic-modal-container" 
      className="flex flex-col bg-black text-white fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md">
        <section className="flex justify-between items-center pl-4 pr-4 rounded-sm text-xl bg-red-800">
          <p className="text-black font-bold">DELETE MECHANIC</p>
          <button className="text-black text-sm font-bold" onClick={handleClose}>X</button>
          
        </section>
        
        <section className="flex flex-col gap-6 p-4 w-full">
          <div className="flex whitespace-pre-wrap text-red-500">Are you sure you want to delete this mechanic?</div>

          <div className="flex flex-col gap-2"> 
            
            <div className="flex gap-2">
              <p>NAME:</p>
              <div className="flex whitespace-pre-wrap break-word">{mechanic.mech_name && mechanic.mech_name.toUpperCase()}</div> 
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button className="text-gray-400 hover:text-gray-200 transition-all w-24" onClick={handleClose}>CANCEL</button>
            <button className="flex justify-center bg-red-800 hover:bg-red-900 text-black rounded-sm p-2 transition-all w-24"
            onClick={handleDeleteMechanicSubmit}>
              {
                !deleteIsLoading && !deleteIsSuccessful &&
                <p>DELETE</p>
              }
              {
                deleteIsLoading && 
                <Oval
                height={10}
                width={10}
                color="#000000"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#111111"
                strokeWidth={6}
                strokeWidthSecondary={6}
                />
              }
              {
                deleteIsSuccessful && 
                <Icon path={mdiCheckAll} size={0.6} />
              }
              
            </button>
          </div>
        
        </section>
      </div>
      }
      
    </div>
  )
}

export default DeleteMechanic;