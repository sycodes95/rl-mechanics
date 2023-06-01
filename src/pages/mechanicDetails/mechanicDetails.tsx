import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMechanicDetails from "../../features/mechanicDetails/services/getMechanicDetails";
import { mechanicsDifficultyOptions } from "../../constants/options";
import { difficultyColors } from "../../constants/colors";
import { importanceColors } from "../../constants/colors";
import { mechanicsImportanceOptions } from "../../constants/options";
import Clipboard from 'clipboard';

import Icon from '@mdi/react';
import { mdiContentCopy, mdiCheckBold } from '@mdi/js';


type MechanicDetails = {
  mech_created_at: string;
  mech_description: string;
  mech_difficulty: number;
  mech_id: number;
  mech_importance: number;
  mech_name: string;
  mech_url: string;
  mech_yt_url_controller: string[];
  mech_yt_url_kbm: string[];
  mech_training_packs: string[];
};

function MechanicDetails() {
  const { mech_url } = useParams();

  const [showKbmVideos, setShowKbmVideos] = useState(false)
  
  const [showControllerVideos, setShowControllerVideos] = useState(true)

  const [trainingPackToCopy, setTrainingPackToCopy] = useState("")

  const [descriptionReadMore, setDescriptionReadMore] = useState(false)

  const [mechanicDetails, setMechanicDetails] = useState<MechanicDetails>({
    mech_created_at: "",
    mech_description: "",
    mech_difficulty: 0,
    mech_id: 0,
    mech_importance: 0,
    mech_name: "",
    mech_url: "", 
    mech_yt_url_controller: Array(3).fill(""),
    mech_yt_url_kbm: Array(3).fill(""),
    mech_training_packs: Array(8).fill("")
  });

  
  useEffect(() => {
    if (mech_url)
      getMechanicDetails(mech_url)?.then((details) =>
        setMechanicDetails(details)
      );
  }, [mech_url]);

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setTrainingPackToCopy("")
    },1000)
    
    return () => {
      clearTimeout(timeout);
    };
  }, [trainingPackToCopy]);



  return (
    <div className="flex justify-center w-full "> 
      <div className="flex flex-col w-full max-w-5xl gap-4 rounded-md ">

        <section className="flex justify-between"> 
          <div className="flex items-end text-xl font-thin text-white font-enigma">
            {mechanicDetails?.mech_name} 
          </div>
          
          <div className="flex justify-between gap-4 p-2 text-sm text-white bg-black rounded-md bg-opacity-20">
            <div className="flex justify-between gap-2 pl-2 pr-2 bg-black bg-opacity-25 rounded-md">
              <p className="text-gray-500">Difficulty:</p>
              <p className={`${difficultyColors[mechanicDetails?.mech_difficulty]}`}>{mechanicsDifficultyOptions[mechanicDetails?.mech_difficulty]}</p>
            </div>
            <div className="flex justify-between gap-2 pl-2 pr-2 bg-black bg-opacity-25 rounded-md">
              <p className="text-gray-500">Importance:</p>
              <p className={`${importanceColors[mechanicDetails?.mech_importance]}`}>{mechanicsImportanceOptions[mechanicDetails?.mech_importance]}</p>
            </div>
            <div>
              <p className="text-gray-500">Rated Diff.: N/A</p>
            </div>
            <div>
              <p className="text-gray-500">Rated Imp: N/A.</p>
            </div>
          </div>
        </section>

        <section className="flex h-full gap-2 p-2 bg-black bg-opacity-25 rounded-md">
          <div className="relative w-full rounded-md ">
            <div className="relative h-96">
            {mechanicDetails?.mech_yt_url_controller && (
              <div className="h-96"
                dangerouslySetInnerHTML={{
                  __html: mechanicDetails.mech_yt_url_controller[0],
                }}
              ></div>
            )}
            </div>
            <div className="z-50 flex items-center justify-center w-full h-8 gap-4 bg-black bg-opacity-80 font-enigma">
              <button className="w-6 h-3 border border-green-400 rounded-md hover:bg-green-400"></button>
              <button className="w-6 h-2 border border-green-400 rounded-md hover:bg-green-400"></button>
              <button className="w-6 h-2 border border-green-400 rounded-md hover:bg-green-400"></button>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto bg-black bg-opacity-25 rounded-md w-80">
            <p className="flex justify-center p-2 text-sm text-white bg-opacity-50 border border-green-400 rounded-md whitespace-nowrap">Related Training Packs</p>
            <div className="flex flex-col gap-2 ">
              {
              mechanicDetails.mech_training_packs.map((packCode, index) => (
                packCode !== "" && (
                  <button className="relative flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md hover:bg-gray-200 hover:bg-opacity-10" key={index} 
                  onClick={()=> {
                    navigator.clipboard.writeText(packCode)
                    setTrainingPackToCopy(packCode)
                  }}>
                    {
                    trainingPackToCopy === packCode &&
                    <div className="absolute left-0 z-50 flex items-center justify-center w-full h-4 mt-1 text-xs text-green-700 bg-white rounded-md backdrop-blur-sm top-full">Copied</div>
                    }
                    {
                    trainingPackToCopy !== packCode &&
                    <Icon path={mdiContentCopy} size={0.6} />
                    }
                    {
                    trainingPackToCopy === packCode &&
                    <Icon className="text-green-500" path={mdiCheckBold} size={0.6} />
                    }
                    <p>{packCode}</p>
                  </button>
                )
              ))
              }
              
            </div>
          </div>
        </section>
        
        <section className="bg-black bg-opacity-25 rounded-md">
          <div className="w-full p-2 overflow-hidden text-xs text-white ">
            <p className="p-2 text-xl font-bold text-gray-500 text-opacity-25">
              DESCRIPTION
            </p>
            <p className="p-2 text-sm whitespace-pre-line overflow-ellipsis">
              {mechanicDetails?.mech_description}
            </p>
          </div>

        </section>
      </div>
    </div>
  );
}

export default MechanicDetails;
