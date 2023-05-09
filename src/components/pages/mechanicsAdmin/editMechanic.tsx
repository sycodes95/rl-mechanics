import { useEffect, useState } from "react";
import Rating from "react-rating";
import Icon from '@mdi/react';


import { ThreeDots } from "react-loader-spinner";
import { mdiCheckAll } from '@mdi/js';
import { useNavigate } from "react-router-dom";
import { IsEditMechanicOpen } from "../../types/mechanicsAdmin/types";

interface EditMechanicProps {
  editMechanicIsOpenContext: {
    editMechanicIsOpen: IsEditMechanicOpen;
    setEditMechanicIsOpen: React.Dispatch<React.SetStateAction<IsEditMechanicOpen>>;
  };
  mechanic: MechanicData
}

interface MechanicData {
  mech_id: number | null,
  mech_name: string | null;
  mech_description: string | null;
  mech_difficulty: number | null;
  mech_importance: number | null;
  mech_yt_url_controller: string | null;
  mech_yt_url_kbm: string | null;
  mech_url: string | null;
  mech_type: string | null; 
}

function EditMechanic ({ editMechanicIsOpenContext, mechanic }: EditMechanicProps) {
  const navigate = useNavigate()

  const { editMechanicIsOpen, setEditMechanicIsOpen } = editMechanicIsOpenContext;

  const [isFetching, setIsFetching] = useState(false);

  const [fetchSuccessful, setFetchSuccessful] = useState(false);

  const [fetchErrors, setFetchErrors] = useState<string[]>([]);

  const [mechanicData, setMechanicData] = useState<MechanicData>({
    mech_id: null,
    mech_name: null,
    mech_description: null,
    mech_difficulty: null,
    mech_importance: null,
    mech_yt_url_controller: null,
    mech_yt_url_kbm: null,
    mech_url: null,
    mech_type: null
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
        <div className="flex justify-between text-xl text-orange-500">
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
          <Rating
          className=' text-gray-400 flex justify-between'
          initialRating={mechanicData.mech_difficulty ?? 0}
          emptySymbol="fa fa-star-o"
          fullSymbol="fa fa-star "
          fractions={1}
          stop={5}
          onChange={(value: number)=> setMechanicData({...mechanicData, mech_difficulty: value})}
          />
        </div>

        <div id="add-mechanic-importance" 
        className="flex gap-4 justify-between items-center ">
          <label className="text-xs text-gray-400">IMPORTANCE :</label>
          <Rating
          className=' text-gray-400 flex justify-between'
          initialRating={mechanicData.mech_importance ?? 0}
          emptySymbol="fa fa-star-o"
          fullSymbol="fa fa-star "
          fractions={1}
          stop={5}
          onChange={(value: number)=> setMechanicData({...mechanicData, mech_importance: value})}
          />
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

        <input className="text-xs text-white bg-black p-1 outline outline-1 outline-slate-800 rounded-sm"
        name="mech_type" type="text" placeholder="MECH TYPE" 
        value={mechanicData.mech_type ?? ''} onChange={handleInputChange}/>

        <button className="flex justify-center text-sm bg-orange-500 hover:bg-orange-400 transition-all p-1 rounded-md" onClick={handleAddMechanicSubmit}>
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

        <button className="text-sm bg-red-800 hover:bg-red-700 transition-all p-1 rounded-md" onClick={()=> setEditMechanicIsOpen({...editMechanicIsOpen, open:false})}>CANCEL</button>
          
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