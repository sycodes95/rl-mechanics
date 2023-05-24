import { useEffect, useState } from "react";
import Icon from '@mdi/react';

import { ThreeDots } from "react-loader-spinner";
import { mdiCheckAll } from '@mdi/js';
import { MechanicData } from "./types";
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsTypeOptions } from "./options";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../redux/store";

import { setAddMechanicIsOpen, setEditMechanicIsOpen} from '../../../redux/slices/modalSlice';

function AddMechanic () {

  const dispatch = useDispatch()

  const { addMechanicIsOpen } = useSelector((state: RootState) => state.modalSlice)

  const [isFetching, setIsFetching] = useState(false);

  const [fetchSuccessful, setFetchSuccessful] = useState(false);

  const [fetchErrors, setFetchErrors] = useState<string[]>([]);

  const [mechanicData, setMechanicData] = useState<MechanicData>({
    mech_name: "",
    mech_description: "",
    mech_difficulty: "",
    mech_importance: "",
    mech_yt_url_controller: "",
    mech_yt_url_kbm: "",
    mech_url: "",
    mech_type: "",
    mech_gif: ""
  });

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //reset fetch errors
    setFetchErrors([]);

    const { name, value, files } = e.target;

    if (name === 'mech_gif' && files && files.length > 0) {
      // Update the mechanicData with the selected file
      setMechanicData({ ...mechanicData, mech_gif: files[0] });
    } else {
      // Update other input values as before
      setMechanicData({ ...mechanicData, [name]: value });
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    //reset fetch errors
    setFetchErrors([]);

    const { name, value } = e.target;
      
    setMechanicData({ ...mechanicData, [name]: value });
    
  };

  const handleAddMechanicSubmit = () => {

    setIsFetching(true);

    const formData = new FormData();

    Object.keys(mechanicData).forEach((field, index) => {
      formData.append(field, mechanicData[field])
    })

    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-post`, {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setIsFetching(false);

      if(data && data.mechanic) {
        setFetchSuccessful(true);
        setTimeout(()=>{
          window.location.href = '/'
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
            
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50" id="add-mechanic-overlay" >
      </div>
      
      <div className="fixed z-50 flex flex-col gap-4 p-6 -translate-x-1/2 -translate-y-1/2 bg-black rounded-md top-1/2 left-1/2 sm: w-96">

        <div className="flex justify-between text-xl text-yellow-500">
          <p>ADD MECH</p>
          <button className="text-white" onClick={()=> dispatch(setAddMechanicIsOpen(false))}>X</button>
        </div>

        <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800" 
        name="mech_name" type="text" placeholder="NAME" value={mechanicData.mech_name ?? ''} onChange={handleInputChange}/>

        <textarea className="h-32 p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800"  
        name="mech_description" placeholder="DESCRIPTION" value={mechanicData.mech_description ?? ''} onChange={handleTextAreaChange}/>

        <div id="add-mechanic-difficulty"
        className="flex items-center justify-between gap-4 ">
          <label className="text-xs text-gray-400 whitespace-nowrap">DIFFICULTY :</label>
          <select className="w-32 text-sm bg-black border rounded-sm outline-none border-slate-800 focus:outline-none" value={mechanicData.mech_difficulty}
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
        className="flex items-center justify-between gap-4 ">
          <label className="text-xs text-gray-400 whitespace-nowrap">IMPORTANCE :</label>
          <select className="w-32 text-sm bg-black border rounded-sm outline-none border-slate-800 focus:outline-none" value={mechanicData.mech_importance}
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
        className="flex items-center justify-between gap-4 ">
          <label className="text-xs text-gray-400 whitespace-nowrap">TYPE :</label>
          <select className="w-32 text-sm bg-black border rounded-sm outline-none border-slate-800 focus:outline-none" value={mechanicData.mech_type ?? ""} 
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
        
        <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800" 
        name="mech_yt_url_controller" type="text" placeholder="YOUTUBE URL CONTROLLER" 
        value={mechanicData.mech_yt_url_controller} onChange={handleInputChange}/>

        <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800"
        name="mech_yt_url_kbm" type="text" placeholder="YOUTUBE URL KBM" 
        value={mechanicData.mech_yt_url_kbm} onChange={handleInputChange}/>

        <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800"
        name="mech_url" type="text" placeholder="MECH URL" 
        value={mechanicData.mech_url} onChange={handleInputChange}/>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-gray-400 whitespace-nowrap">MECH GIF:</p>
          <input className="text-xs w-44" type="file" name="mech_gif" onChange={handleInputChange}/>
        </div>

        <button className="flex justify-center p-1 text-sm text-black transition-all bg-yellow-500 rounded-sm hover:bg-yellow-400" onClick={handleAddMechanicSubmit}>
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

        <button className="p-1 text-sm transition-all bg-red-800 rounded-sm hover:bg-red-700" 
        onClick={()=> dispatch(setAddMechanicIsOpen(false))}>CANCEL</button>
          
        <div id="add-mechanic-fetch-errors">
          {
          fetchErrors.map((err, index) => (
            <p className="text-xs text-red-600" key={index}>{err}</p>
          ))
          }
        </div>
      </div>

    </div>
  )
}

export default AddMechanic;