import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Oval } from "react-loader-spinner";
import Icon from '@mdi/react';
import { mdiCheckAll } from '@mdi/js';

import { MechanicData } from "../types/types";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

import { setDeleteMechanicIsOpen } from "../../mechanics/slice/mechanicsSlice";

interface DeleteMechanicProps {
  mechanic: MechanicData
}

function DeleteMechanic ({ mechanic } : DeleteMechanicProps) {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { deleteMechanicIsOpen } = useSelector((state: RootState) => state.mechanicsSlice)

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
    dispatch(setDeleteMechanicIsOpen({...deleteMechanicIsOpen, open : false}));
  }

  return(
    <div  className="z-50">
      <div id="delete-mechanic-modal-overlay" className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 " onClick={handleClose}></div>
      
      {
      mechanic &&
      <div id="delete-mechanic-modal-container" 
      className="fixed z-50 flex flex-col text-white -translate-x-1/2 -translate-y-1/2 bg-black rounded-md top-1/2 left-1/2">
        <section className="flex items-center justify-between p-4 text-xl rounded-sm">
          <p className="text-red-500 ">Confirm</p>
          <button className="text-sm font-bold text-black" onClick={handleClose}>X</button>
          
        </section>
        
        <section className="flex flex-col w-full gap-6 p-4">
          <div className="flex text-red-500 whitespace-pre-wrap">Are you sure you want to delete this mechanic?</div>

          <div className="flex flex-col gap-2"> 
            
            <div className="flex gap-2 text-sm">
              <p>Name:</p>
              <div className="flex whitespace-pre-wrap break-word">{mechanic.mech_name && mechanic.mech_name}</div> 
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button className="w-24 text-gray-400 transition-all hover:text-gray-200" onClick={handleClose}>CANCEL</button>
            <button className="flex justify-center w-24 p-2 text-black transition-all bg-red-500 rounded-sm hover:bg-red-900"
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