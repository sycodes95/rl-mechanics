import { useEffect, useState } from "react";
import Icon from '@mdi/react';

import { ThreeDots } from "react-loader-spinner";
import { mdiCheckAll } from '@mdi/js';
import { MechanicData } from "../types/types";
import { mechanicsDifficultyOptions, mechanicsImportanceOptions, mechanicsTypeOptions } from "../../../constants/options";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../store";

import { setAddMechanicIsOpen, setEditMechanicIsOpen} from '../../mechanics/slice/mechanicsSlice';
import { getMechUrls } from "../services/getMechUrls";

type AddEditMechanicProps = {
  mechanic?: MechanicData;
}

type MechanicPrerequisitesChoices = {
  mech_name: string;
  mech_url: string;
}

function AddEditMechanic ({ mechanic }: AddEditMechanicProps) {

  const dispatch = useDispatch()

  const { addMechanicIsOpen, editMechanicIsOpen } = useSelector((state: RootState) => state.mechanicsSlice)

  const [isFetching, setIsFetching] = useState(false);

  const [fetchSuccessful, setFetchSuccessful] = useState(false);

  const [fetchErrors, setFetchErrors] = useState<string[]>([]);

  const [mechanicData, setMechanicData] = useState<MechanicData>({
    mech_id: 0,
    mech_name: "",
    mech_description: "",
    mech_difficulty: 0,
    mech_importance: 0,
    mech_url: "",
    mech_type: "",
    mech_yt_url_controller: Array(3).fill(""),
    mech_yt_url_kbm: Array(3).fill(""),
    mech_training_packs: [],
    mech_prerequisites: [],
    mech_gif: "",
  });

  const [mechanicPrerequisitesSelected, setMechanicPrerequisitesSelected] = useState("")

  const [mechanicPrerequisitesChoices, setMechanicPrerequisitesChoices] = useState<MechanicPrerequisitesChoices[]>([])

  const [trainingPackCode, setTrainingPackCode] = useState("")


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFetchErrors([]);

    let { name, value} = e.target;

    setMechanicData({ ...mechanicData, [name]: value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    setFetchErrors([]);

    const { name, value } = e.target;

    setMechanicData({ ...mechanicData, [name]: value });
    
  };

  const handleMechanicSubmit = () => {

    setIsFetching(true);

    const URL = addMechanicIsOpen ? `mechanics-post` : `mechanics-patch`;
    const method = addMechanicIsOpen ? `POST` : `PATCH`;
    fetch(`${import.meta.env.VITE_API_HOST_URL}/${URL}`, {
      method: `${method}`,
      body: JSON.stringify(mechanicData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
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
    mechanic && setMechanicData(mechanic)
  },[mechanic])

  useEffect(()=>{
    getMechUrls().then(data => setMechanicPrerequisitesChoices(data))
  },[])
  
  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">

      <div  className="max-h-full gap-4 overflow-y-auto bg-black rounded-md h-3/4 bg-opacity-60 w-96 backdrop-blur-sm mw-480px-w-95pct">

        <section className="sticky top-0 flex justify-between p-4 text-xl text-green-400 bg-black font-enigma">
          {
          addMechanicIsOpen ? <p>ADD MECH</p> : <p>EDIT MECH</p>
          }
          <button className="text-white " 
          onClick={()=> addMechanicIsOpen ? dispatch(setAddMechanicIsOpen(false)) : dispatch(setEditMechanicIsOpen(false))}>X</button>
        </section>

        <section className="flex flex-col w-full gap-2 p-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-emerald-300">mech_name</label>
            <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800" 
            name="mech_name" type="text" placeholder="name" value={mechanicData.mech_name ?? ''} onChange={handleInputChange}/>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-emerald-300">mech_url</label>
            <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800"
            name="mech_url" type="text" placeholder="url" 
            value={mechanicData.mech_url} onChange={handleInputChange}/>
          </div>

          <div className="flex flex-col w-full h-32 gap-2">
            <label className="text-sm text-emerald-300">mech_description</label>
            <textarea className="w-full h-32 p-1 overflow-y-auto text-xs text-white bg-black rounded-sm resize-none outline outline-1 outline-slate-800"  
            name="mech_description" placeholder="DESCRIPTION" value={mechanicData.mech_description ?? ''} onChange={handleTextAreaChange}/>
          </div>

          <div id="add-mechanic-type"
          className="flex flex-col gap-2 ">
            <label className="text-sm text-emerald-300 whitespace-nowrap">mech_type</label>
            <select className="w-full text-sm bg-black border rounded-sm outline-none border-slate-800 focus:outline-none" value={mechanicData.mech_type ?? ""} 
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

          <div id="add-mechanic-difficulty"                                                                               
          className="flex flex-col gap-2 ">
            <label className="text-sm text-emerald-300 whitespace-nowrap">mech_difficulty</label> 
            <select className="w-full text-sm bg-black border rounded-sm outline-none border-slate-800 focus:outline-none" value={mechanicData.mech_difficulty}
            onChange={(e)=> setMechanicData({...mechanicData, mech_difficulty: parseInt(e.target.value)})}> 

              <option value="0"></option>
              {
              Object.keys(mechanicsDifficultyOptions).map((option, index) => (
              <option key={index} className={`text-sm`} 
              value={option} >{mechanicsDifficultyOptions[Number(option)]}</option>
              ))
              }
            </select>
          </div>

          <div id="add-mechanic-importance"
          className="flex flex-col gap-2 ">
            <label className="text-sm text-emerald-300 whitespace-nowrap">mech_importance</label>
            <select className="w-full text-sm bg-black border rounded-sm outline-none border-slate-800 focus:outline-none" value={mechanicData.mech_importance}
            onChange={(e)=> setMechanicData({...mechanicData, mech_importance: parseInt(e.target.value)})}>

              <option value="0"></option>
              {
              Object.keys(mechanicsImportanceOptions).map((option, index) => (
              <option key={index} className={`text-sm`} 
              value={option} >{mechanicsImportanceOptions[Number(option)]}</option>
              ))
              }
            </select>
          </div>
          
          {
          mechanicData.mech_yt_url_controller.map((url: string, index: number) => (
            <div className="flex flex-col gap-2">
              {
              index === 0 &&
              <label className="text-sm text-emerald-300">mech_yt_url_controller</label>
              }
              <input
                className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800"
                name={`mech_yt_url_controller${index}`}
                type="text"
                placeholder={`Youtube Controller Url #${index + 1}`}
                value={url}
                onChange={e => {
                  let newControllerUrls = [...mechanicData.mech_yt_url_controller];
                  newControllerUrls[index] = e.target.value;
                  setMechanicData({
                    ...mechanicData,
                    mech_yt_url_controller: newControllerUrls
                  });
                }}
              />
            </div>
          ))}

          {
          mechanicData.mech_yt_url_kbm.map((url: string, index: number) => (
            <div className="flex flex-col gap-2">
              {
              index === 0 &&
              <label className="text-sm text-emerald-300">mech_yt_url_kbm</label>
              }
              <input
                className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800"
                name={`mech_yt_url_kbm${index}`}
                type="text"
                placeholder={`Youtube KBM Url ${index + 1}`}
                value={url}
                onChange={e => {
                  let newKbmUrls = [...mechanicData.mech_yt_url_kbm];
                  newKbmUrls[index] = e.target.value;
                  setMechanicData({
                    ...mechanicData,
                    mech_yt_url_kbm: newKbmUrls
                  });
                }}
              />
            </div>
          ))}

          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-emerald-300">mech_training_packs</label>
            <div className="flex gap-2">
              <input className="w-full p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800" 
              name="mech_training_packs" type="text" value={trainingPackCode} 
              onChange={(e)=> setTrainingPackCode(e.target.value) } />
              <button
              className="p-1 text-xs text-black transition-all duration-500 bg-white rounded-sm hover:bg-green-400"
              onClick={() => {
                setMechanicData(() => {
                  let trainingPacks = [...mechanicData.mech_training_packs];
                  return { ...mechanicData, mech_training_packs: [...trainingPacks, trainingPackCode] };
                });
                setTrainingPackCode("");
              }}> 
                <p>Submit</p>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
            {
            mechanicData.mech_training_packs.map((pack: string, index: number) => (
              <div className="flex justify-between w-full gap-2 p-1 text-xs rounded-md bg-slate-700">
                <p className="">{pack}</p>
                <button className="text-white" onClick={()=> setMechanicData(()=> {
                let trainingPacks = [...mechanicData.mech_training_packs];
                trainingPacks.splice(index, 1)
                return {...mechanicData, mech_training_packs: trainingPacks}
                })}>X</button>
              </div>
            ))}
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 text-sm">
            <label className="text-sm text-emerald-300">mech_prerequisites</label>
            <div className="flex w-full gap-2">
              <select className="w-full bg-black border outline-none border-slate-800" name="mech_prerequisites" value={mechanicPrerequisitesSelected} 
              onChange={(e)=> setMechanicPrerequisitesSelected(e.target.value)}>
                <option value=""></option>
                {
                mechanicPrerequisitesChoices.map((choice, index) => (
                  <option value={choice.mech_url}>{choice.mech_url}</option>
                ))
                }
              </select>
              <button className="p-1 text-xs text-black transition-all duration-500 bg-white rounded-sm hover:bg-green-400" onClick={()=> {
                setMechanicData(()=> {
                  let prerequisites = [...mechanicData.mech_prerequisites, mechanicPrerequisitesSelected]
                  return {...mechanicData, mech_prerequisites: prerequisites}
                })
                setMechanicPrerequisitesSelected("")
              }}>
                Submit
              </button>
            </div>
            {
              mechanicData.mech_prerequisites &&
            mechanicData.mech_prerequisites.map((prerequisite: string, index: number) => (
              <div className="flex justify-between w-full gap-2 p-1 text-xs rounded-md bg-slate-700">
                <p className="">{prerequisite}</p>
                <button className="text-white" onClick={()=> setMechanicData(()=> {
                let prerequisites = [...mechanicData.mech_prerequisites];
                prerequisites.splice(index, 1)
                return {...mechanicData, mech_prerequisites: prerequisites}
                })}>X</button>
              </div>
            ))}

            
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-emerald-300 whitespace-nowrap">mech_gif</label>
            <input className="p-1 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800" type="text" name="mech_gif" value={mechanicData.mech_gif} onChange={handleInputChange}/>
          </div>

          <button className="flex items-center justify-center h-8 p-1 text-sm text-black transition-all bg-green-400 rounded-sm hover:bg-green-600" onClick={handleMechanicSubmit}>
            {
            !isFetching && !fetchSuccessful &&
            <p>SUBMIT</p>
            }
            {
            isFetching &&
            <ThreeDots 
            height="14" 
            width="14" 
            radius="9"
            color="#000000" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
            />
            }
            {
            fetchSuccessful && 
            <Icon path={mdiCheckAll} size={0.6} />
            }
            
          </button>

          <button className="h-8 p-1 text-sm transition-all bg-red-800 rounded-sm hover:bg-red-700" 
          onClick={()=> addMechanicIsOpen ? dispatch(setAddMechanicIsOpen(false)) : dispatch(setEditMechanicIsOpen(false))}>CANCEL</button>
            
          <div id="add-mechanic-fetch-errors">
            {
            fetchErrors.map((err, index) => (
              <p className="text-xs text-red-600" key={index}>{err}</p>
            ))
            }
          </div> 

        </section>
      </div>

    </div>
  )
}

export default AddEditMechanic;