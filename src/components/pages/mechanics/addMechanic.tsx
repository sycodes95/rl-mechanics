import { useEffect, useState } from "react";
import Icon from '@mdi/react';

import { ThreeDots } from "react-loader-spinner";
import { mdiCheckAll } from '@mdi/js';
import { AddMechanicProps, MechanicData } from "./types";
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsTypeOptions } from "./options";


function AddMechanic ({ addMechanicIsOpenContext }: AddMechanicProps) {

  const { addMechanicIsOpen, setAddMechanicIsOpen } = addMechanicIsOpenContext;

  const [isFetching, setIsFetching] = useState(false);

  const [fetchSuccessful, setFetchSuccessful] = useState(false);

  const [fetchErrors, setFetchErrors] = useState<string[]>([]);

  const [mechanicData, setMechanicData] = useState<MechanicData>({
    mech_name: "",
    mech_description: "",
    mech_difficulty: 0,
    mech_importance: 0,
    mech_yt_url_controller: "",
    mech_yt_url_kbm: "",
    mech_url: "",
    mech_type: 0
  });

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //reset fetch errors
    setFetchErrors([]);

    const { name, value } = e.target;
    setMechanicData({...mechanicData, [name]: value});
  };

  const handleAddMechanicSubmit = () => {

    setIsFetching(true);

    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-post`, {
      method: 'POST',
      body: JSON.stringify(mechanicData),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setIsFetching(false);

      if(data && data.mechanic) {
        setFetchSuccessful(true);
        setTimeout(()=>{
          window.location.href = '/admin'
        },1000);
      };

      if(data && data.name === 'error'){
        if(data.code === '23502' && data.column === 'mech_name' && !fetchErrors.includes('Name is required')){
          setFetchErrors([...fetchErrors, 'Name is required']);
        };
        if(data.code === '23502' && data.column === 'mech_url' && !fetchErrors.includes('Mechanic URL is required')){
          setFetchErrors([...fetchErrors, 'Mechanic URL is required']);
        };
        if(data.code === '23505' && !fetchErrors.includes('Mechanic name exists')){
          setFetchErrors([...fetchErrors, 'Mechanic name exists']);
        };
      };
    })
    .catch(error => {
      console.error('Error:', error);
      setIsFetching(false);
      setFetchErrors([...fetchErrors, error.message]);
    });
  };

  useEffect(()=>{
    console.log(mechanicData);
  },[mechanicData]);
  

  return (
    <div className="absolute">
            
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" id="add-mechanic-overlay" >
      </div>
      
      <div className="flex flex-col gap-4 bg-black rounded-md fixed 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 sm: w-96 z-50">

        <div className="flex justify-between text-xl text-orange-500">
          <p>ADD MECH</p>
          <button className="text-white" onClick={()=> setAddMechanicIsOpen(false)}>X</button>
        </div>

        <input className="text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800 p-1" 
        name="mech_name" type="text" placeholder="NAME" value={mechanicData.mech_name ?? ''} onChange={handleInputChange}/>

        <textarea className="h-32 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800 p-1"  
        name="mech_description" placeholder="DESCRIPTION" value={mechanicData.mech_description ?? ''} onChange={handleInputChange}/>

        <div id="add-mechanic-difficulty"
        className="flex gap-4 justify-between items-center ">
          <label className="text-xs text-gray-400 whitespace-nowrap">DIFFICULTY :</label>
          <select className="text-sm bg-black border border-slate-800 rounded-sm 
          outline-none focus:outline-none w-32" value={mechanicData.mech_difficulty}
          onChange={(e)=> e.target.value
          ? setMechanicData({...mechanicData, mech_difficulty: parseInt(e.target.value)})
          : setMechanicData({...mechanicData, mech_difficulty:  0})}>

            <option value=""></option>
            {
            Object.keys(mechanicsDifficultyOptions).map((option, index) => (
            <option key={index} className={`${mechanicsDifficultyOptions[option].color} text-sm`} 
            value={mechanicsDifficultyOptions[option].value} >{option}</option>
            ))
            }
          </select>
        </div>

        <div id="add-mechanic-importance"
        className="flex gap-4 justify-between items-center ">
          <label className="text-xs text-gray-400 whitespace-nowrap">IMPORTANCE :</label>
          <select className="text-sm bg-black border border-slate-800 rounded-sm 
          outline-none focus:outline-none w-32" value={mechanicData.mech_importance}
          onChange={(e)=> e.target.value
          ? setMechanicData({...mechanicData, mech_importance: parseInt(e.target.value)})
          : setMechanicData({...mechanicData, mech_importance:  0})}>

            <option value=""></option>
            {
            Object.keys(mechanicsImportanceOptions).map((option, index) => (
            <option key={index} className={`${mechanicsImportanceOptions[option].color} text-sm`} 
            value={mechanicsImportanceOptions[option].value} >{option}</option>
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
          ? setMechanicData({...mechanicData, mech_type: parseInt(e.target.value)})
          : setMechanicData({...mechanicData, mech_type:  0})}>

            <option value=""></option>
            {
            
            Object.keys(mechanicsTypeOptions).map((option, index) => (
              <option key={index} className={`text-sm`} 
              value={mechanicsTypeOptions[option].value} >{option}</option>
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

        <button className="flex justify-center text-sm bg-orange-500 hover:bg-orange-400 transition-all p-1 rounded-md" onClick={handleAddMechanicSubmit}>
          {
          !isFetching && !fetchSuccessful &&
          <p>SUBMIT</p>
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

        <button className="text-sm bg-red-800 hover:bg-red-700 transition-all p-1 rounded-md" onClick={()=> setAddMechanicIsOpen(false)}>CANCEL</button>
          
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

export default AddMechanic;