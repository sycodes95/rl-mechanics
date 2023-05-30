import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMechanicDetails from "../../utils/getMechanicDetails";
import { mechanicsDifficultyOptions } from "./options";
import { difficultyColors } from "./colors";
import { importanceColors } from "./colors";
import { mechanicsImportanceOptions } from "./options";

import Icon from '@mdi/react';
import { mdiContentCopy } from '@mdi/js';


type MechanicDetails = {
  mech_created_at: string;
  mech_description: string;
  mech_difficulty: number;
  mech_id: number;
  mech_importance: number;
  mech_name: string;
  mech_url: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
};

function MechanicDetails() {
  const { mech_url } = useParams();
  const [mechanicDetails, setMechanicDetails] = useState<MechanicDetails>({
    mech_created_at: "",
    mech_description: "",
    mech_difficulty: 0,
    mech_id: 0,
    mech_importance: 0,
    mech_name: "",
    mech_url: "", 
    mech_yt_url_controller: "",
    mech_yt_url_kbm: "",
  });
  const [descriptionReadMore, setDescriptionReadMore] = useState(false)
  useEffect(() => {
    if (mech_url)
      getMechanicDetails(mech_url)?.then((details) =>
        setMechanicDetails(details)
      );
  }, [mech_url]);

  useEffect(() => {
    console.log(mechanicDetails);
  }, [mechanicDetails]);

  return (
    <div className="flex justify-center w-full "> 
      <div className="flex flex-col w-full max-w-5xl gap-4 rounded-md ">
        
        <section>
          
        </section>

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

        <section className="flex gap-2 p-2 bg-black bg-opacity-25 rounded-md h-96">
          <div className="relative w-full rounded-md ">
            {mechanicDetails?.mech_yt_url_controller && (
              <div
                dangerouslySetInnerHTML={{
                  __html: mechanicDetails.mech_yt_url_controller,
                }}
              ></div>
            )}
          </div>

          <div className="flex flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto bg-black bg-opacity-25 rounded-md w-80">
            <p className="flex justify-center p-2 text-sm text-white bg-opacity-50 border border-green-400 rounded-md whitespace-nowrap">Training Packs</p>
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-10">
                <Icon path={mdiContentCopy} size={0.6} />
                <p>B5AC-17E0-4133-B8A4</p>
              </div>
              <div className="flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-10">
                <Icon path={mdiContentCopy} size={0.6} />
                <p>B5AC-17E0-4133-B8A4</p>
              </div>
              <div className="flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-10">
                <Icon path={mdiContentCopy} size={0.6} />
                <p>B5AC-17E0-4133-B8A4</p>
              </div>
              <div className="flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-10">
                <Icon path={mdiContentCopy} size={0.6} />
                <p>B5AC-17E0-4133-B8A4</p>
              </div>
              <div className="flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-10">
                <Icon path={mdiContentCopy} size={0.6} />
                <p>B5AC-17E0-4133-B8A4</p>
              </div>
              <div className="flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-10">
                <Icon path={mdiContentCopy} size={0.6} />
                <p>B5AC-17E0-4133-B8A4</p>
              </div>
              
              
            </div>
          </div>

         
        </section>

        
        <section className="bg-black bg-opacity-25 rounded-md">
          <div className="w-full p-2 overflow-hidden text-xs text-white ">
            <p className="p-2 text-xl font-bold text-gray-500 text-opacity-25">
              DESCRIPTION
            </p>
            <p className="p-2 text-sm overflow-ellipsis">
              {mechanicDetails?.mech_description}
            </p>
          </div>

        </section>
      </div>
    </div>
  );
}

export default MechanicDetails;
