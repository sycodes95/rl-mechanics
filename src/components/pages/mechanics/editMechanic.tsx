import { useEffect, useState } from "react";
import Rating from "react-rating";
import Icon from '@mdi/react';


import { ThreeDots } from "react-loader-spinner";
import { mdiCheckAll } from '@mdi/js';
import { useNavigate } from "react-router-dom";
import { IsEditMechanicOpen } from "../../types/mechanicsAdmin/types";
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsTypeOptions } from "./options";

type EditMechanicProps = {
  editMechanicIsOpenContext: {
    editMechanicIsOpen: IsEditMechanicOpen;
    setEditMechanicIsOpen: React.Dispatch<React.SetStateAction<IsEditMechanicOpen>>;
  };
  mechanic: EditMechanicData
}

type EditMechanicData = {
  mech_id: number;
  mech_name: string;
  mech_description: string;
  mech_difficulty: string;
  mech_importance: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
  mech_url: string;
  mech_type: string; 
}

function EditMechanic ({ editMechanicIsOpenContext, mechanic }: EditMechanicProps) {
  const navigate = useNavigate()

  const { editMechanicIsOpen, setEditMechanicIsOpen } = editMechanicIsOpenContext;

  const [isFetching, setIsFetching] = useState(false);

  const [fetchSuccessful, setFetchSuccessful] = useState(false);

  const [fetchErrors, setFetchErrors] = useState<string[]>([]);

  const [mechanicData, setMechanicData] = useState<EditMechanicData>({
    mech_id: 0,
    mech_name: "",
    mech_description: "",
    mech_difficulty: "",
    mech_importance: "",
    mech_yt_url_controller: "",
    mech_yt_url_kbm: "",
    mech_url: "",
    mech_type: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //reset fetch errors
    setFetchErrors([]);

    const { name, value } = e.target;
    setMechanicData({...mechanicData, [name]: value});
  };

  const handleAddMechanicSubmit = () => {

    setIsFetching(true);

    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-patch`, {
      method: 'PATCH',
      body: JSON.stringify(mechanicData),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setIsFetching(false);
      if(data && data.command === 'UPDATE'){
        setFetchSuccessful(true)
        setTimeout(()=>{
          navigate(0)
        },1000)
      }
      
    })
    .catch(error => {
      console.error('Error:', error);
      setIsFetching(false);
      setFetchErrors([...fetchErrors, error.message]);
    });
  };

  useEffect(()=>{
    if(mechanic){
      setMechanicData(mechanic)
    } 
  },[mechanic])
  

  return (
    <div className="z-50">
            
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" id="add-mechanic-overlay" >
      </div>
      
      <div className="flex flex-col gap-4 bg-black rounded-md fixed 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 sm: w-96">
        <div className="flex justify-between text-xl text-yellow-500">
          <p>EDIT MECH</p>
          <button className="text-white" onClick={()=> setEditMechanicIsOpen({...editMechanicIsOpen, open:false})}>X</button>
        </div>
        <input className="text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800 p-1" 
        name="mech_name" type="text" placeholder="NAME" value={mechanicData.mech_name ?? ''} onChange={handleInputChange}/>
        <textarea className="h-32 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800 p-1"  
        name="mech_description" placeholder="DESCRIPTION" value={mechanicData.mech_description ?? ''} onChange={handleInputChange}/>
        <div id="add-mechanic-difficulty"
        className="flex gap-4 justify-between items-center ">
          <label className="text-xs text-gray-400">DIFFICULTY :</label>
          <select className="text-sm bg-black border border-slate-800 rounded-sm 
          outline-none focus:outline-none w-32" value={mechanicData.mech_difficulty}
          onChange={(e)=> e.target.value
          ? setMechanicData({...mechanicData, mech_difficulty: e.target.value})
          : setMechanicData({...mechanicData, mech_difficulty:  ""})}>

            <option value=""></option>
            {
            mechanicsDifficultyOptions.map((option, index) => (
            <option key={index} className={`text-sm`} 
            value={option} >{option}</option>
            ))
            }
          </select>
        </div>

        <div id="add-mechanic-importance" 
        className="flex gap-4 justify-between items-center ">
          <label className="text-xs text-gray-400">IMPORTANCE :</label>
          <select className="text-sm bg-black border border-slate-800 rounded-sm 
          outline-none focus:outline-none w-32" value={mechanicData.mech_importance}
          onChange={(e)=> e.target.value
          ? setMechanicData({...mechanicData, mech_importance: e.target.value})
          : setMechanicData({...mechanicData, mech_importance:  ""})}>

            <option value=""></option>
            {
            mechanicsImportanceOptions.map((option, index) => (
            <option key={index} className={`text-sm`} 
            value={option}>{option}</option>
            ))
            }
          </select>
        </div>

        <div id="add-mechanic-type"
        className="flex gap-4 justify-between items-center ">
          <label className="text-xs text-gray-400 whitespace-nowrap">TYPE :</label>
          <select className="text-sm bg-black border border-slate-800 rounded-sm 
          outline-none focus:outline-none w-32" value={mechanicData.mech_type ?? ""} 
          onChange={(e)=> e.target.value
          ? setMechanicData({...mechanicData, mech_type: e.target.value})
          : setMechanicData({...mechanicData, mech_type:  ""})}>

            <option value=""></option>
            {
            
            mechanicsTypeOptions.map((option, index) => (
              <option key={index} className={`text-sm`} 
              value={option} >{option}</option>
            ))
            }
          </select>
        </div>
        
        <input className="text-xs text-white bg-black p-1 outline outline-1 outline-slate-800 rounded-sm" 
        name="mech_yt_url_controller" type="text" placeholder="YOUTUBE URL CONTROLLER" 
        value={mechanicData.mech_yt_url_controller ?? ''} onChange={handleInputChange}/>

        <input className="text-xs text-white bg-black p-1 outline outline-1 outline-slate-800 rounded-sm"
        name="mech_yt_url_kbm" type="text" placeholder="YOUTUBE URL KBM" 
        value={mechanicData.mech_yt_url_kbm ?? ''} onChange={handleInputChange}/>

        <input className="text-xs text-white bg-black p-1 outline outline-1 outline-slate-800 rounded-sm"
        name="mech_url" type="text" placeholder="MECH URL" 
        value={mechanicData.mech_url ?? ''} onChange={handleInputChange}/> 

        <button className="flex justify-center text-sm bg-yellow-500 hover:bg-yellow-400 
        text-black transition-all p-1 rounded-sm" 
        onClick={handleAddMechanicSubmit}>
          {
          !isFetching && !fetchSuccessful &&
          <p>EDIT</p>
          }
          {
          isFetching &&
          <ThreeDots 
          height="24" 
          width="24" 
          radius="9"
          color="#000000" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
          />
          }
          {
          fetchSuccessful && 
          <Icon path={mdiCheckAll} size={1} />
          }
          
        </button>

        <button className="text-sm bg-red-800 hover:bg-red-700 transition-all p-1 rounded-sm" 
        onClick={()=> setEditMechanicIsOpen({...editMechanicIsOpen, open:false})}>CANCEL</button>
          
        <div id="add-mechanic-fetch-errors">
          {
          fetchErrors.map((err, index) => (
            <p className="text-red-600 text-xs" key={index}>{err}</p>
          ))
          }
        </div>
      </div>

    </div>
  )
}

export default EditMechanic;