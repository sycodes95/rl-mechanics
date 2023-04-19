import { useEffect, useState } from "react";
import Rating from "react-rating";

interface AddMechanicProps {
  addMechanicIsOpenContext: {
    addMechanicIsOpen: boolean;
    setAddMechanicIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface MechanicData {
  mech_name: string | undefined;
  mech_description: string | undefined;
  mech_difficulty: number | undefined;
  mech_importance: number | undefined;
  mech_yt_url_controller: string | undefined;
  mech_yt_url_kbm: string | undefined;
}

function AddMechanic ({ addMechanicIsOpenContext }: AddMechanicProps) {

  const { addMechanicIsOpen, setAddMechanicIsOpen } = addMechanicIsOpenContext;

  const [mechanicData, setMechanicData] = useState<MechanicData>({
    mech_name: undefined,
    mech_description: undefined,
    mech_difficulty: undefined,
    mech_importance: undefined,
    mech_yt_url_controller: undefined,
    mech_yt_url_kbm: undefined,
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMechanicData({...mechanicData, [name]: value})

  }

  useEffect(()=>{
    console.log(mechanicData);
  },[mechanicData]);  

  return (
    <div>
            
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" id="add-mechanic-overlay" >
      </div>
      
      <div className="flex flex-col gap-4 bg-black rounded-md fixed 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 sm: w-96">
        <div className="flex justify-between text-xl text-orange-500">
          <p>ADD MECH</p>
          <button className="text-white" onClick={()=> setAddMechanicIsOpen(false)}>X</button>
        </div>
        <input className="text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800 p-1" 
        name="mech_name" type="text" placeholder="NAME" value={mechanicData.mech_name} onChange={handleInputChange}/>
        <textarea className="h-32 text-xs text-white bg-black rounded-sm outline outline-1 outline-slate-800 p-1"  
        name="mech_description" placeholder="DESCRIPTION" value={mechanicData.mech_description} onChange={handleInputChange}/>
        <div id="add-mechanic-difficulty"
        className="flex gap-4 justify-between items-center ">
        <label className="text-xs text-gray-400">DIFFICULTY :</label>
          <Rating
          className=' text-gray-400 flex justify-between'
          initialRating={mechanicData.mech_difficulty}
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
          initialRating={mechanicData.mech_importance}
          emptySymbol="fa fa-star-o"
          fullSymbol="fa fa-star "
          fractions={1}
          stop={5}
          onChange={(value: number)=> setMechanicData({...mechanicData, mech_importance: value})}
          />
        </div>
        
        <input className="text-xs text-white bg-black p-1 outline outline-1 outline-slate-800 rounded-sm" 
        name="mech_yt_url_controller" type="text" placeholder="YOUTUBE URL CONTROLLER" 
        value={mechanicData.mech_yt_url_controller} onChange={handleInputChange}/>

        <input className="text-xs text-white bg-black p-1 outline outline-1 outline-slate-800 rounded-sm"
        name="mech_yt_url_kbm" type="text" placeholder="YOUTUBE URL KBM" 
        value={mechanicData.mech_yt_url_kbm} onChange={handleInputChange}/>

        <button className="text-sm bg-orange-500 hover:bg-orange-400 transition-all p-1 rounded-md">SUBMIT</button>

        <button className="text-sm bg-red-800 hover:bg-red-700 transition-all p-1 rounded-md" onClick={()=> setAddMechanicIsOpen(false)}>CANCEL</button>

      </div>

    </div>
  )
}

export default AddMechanic;