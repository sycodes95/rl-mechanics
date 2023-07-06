import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMechanicDetails from "../../features/mechanicDetails/services/getMechanicDetails";
import { mechanicsDifficultyOptions, mechanicsStatusOptions } from "../../constants/options";
import { difficultyColors } from "../../constants/colors";
import { importanceColors } from "../../constants/colors";
import { mechanicsImportanceOptions } from "../../constants/options";
import ReactPlayer from 'react-player';
import Icon from '@mdi/react';
import { mdiContentCopy, mdiCheckBold, mdiKeyboard, mdiController } from '@mdi/js';
import getUserFromToken from "../../services/getUserFromToken";
import { setUserDetails } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setMechanicsStatus } from "../../features/mechanics/slice/mechanicsSlice";
import { getMechanicsStatus} from "../../services/getMechanicStatuses";
import { defaultTitle } from "../../constants/title";


type MechanicDetailsType = {
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
  mech_prerequisites: string[];
  mech_gif: string;
};

function MechanicDetails() {
  const dispatch = useDispatch()

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { mechanicsStatus } = useSelector((state: RootState) => state.mechanicsSlice)

  const { mech_url } = useParams();

  const [showVideo, setShowVideo] = useState("")

  const [showControllerVideos, setShowControllerVideos] = useState(true)

  const [showKbmVideos, setShowKbmVideos] = useState(false)

  const [trainingPackToCopy, setTrainingPackToCopy] = useState("")

  const [mechanicDetails, setMechanicDetails] = useState<MechanicDetailsType>({
    mech_created_at: "",
    mech_description: "",
    mech_difficulty: 0,
    mech_id: 0,
    mech_importance: 0,
    mech_name: "",
    mech_url: "", 
    mech_yt_url_controller: Array(3).fill(""),
    mech_yt_url_kbm: Array(3).fill(""),
    mech_training_packs: [],
    mech_prerequisites: [],
    mech_gif: "",
  });

  
  useEffect(() => {
    if (mech_url)
      getMechanicDetails(mech_url)?.then((details) =>
        setMechanicDetails(details)
      );
  }, [mech_url]);

  useEffect(()=>{
    if(mechanicDetails.mech_yt_url_controller[0] && !showVideo) setShowVideo(mechanicDetails.mech_yt_url_controller[0])
  },[mechanicDetails])

  useEffect(()=>{
    if(mechanicDetails.mech_yt_url_controller[0] && showControllerVideos){
      setShowVideo(mechanicDetails.mech_yt_url_controller[0])
    }
    if(mechanicDetails.mech_yt_url_kbm[0] && showKbmVideos){
      setShowVideo(mechanicDetails.mech_yt_url_kbm[0])
    }
  },[showControllerVideos, showKbmVideos])

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setTrainingPackToCopy("")
    },1000)
    
    return () => {
      clearTimeout(timeout);
    };
  }, [trainingPackToCopy]);

  useEffect(()=> {
    window.scrollTo(0,0)
  },[])

  useEffect(()=> {
    if(mechanicDetails.mech_name){
      document.title = mechanicDetails.mech_name
    }

    return ()=> {
      document.title = defaultTitle
    }
  },[mechanicDetails])

  return (
    <div className="flex justify-center w-full "> 
      <div className="flex flex-col w-full max-w-5xl gap-4 rounded-md ">

        <section className="flex justify-between"> 
          <div className="flex items-end text-4xl font-thin text-white font-rajdhani">
            {mechanicDetails?.mech_name} 
          </div>
          
        </section>

        <section className="flex h-full gap-2 p-2 border-2 border-black border-opacity-25 rounded-lg shadow-md bg-jet-dark ">
          <div className="relative w-full bg-black rounded-lg">
            <div className="relative bg-jet-dark h-96">
            {mechanicDetails?.mech_yt_url_controller && (
              showVideo && (
                <ReactPlayer
                  url={`${showVideo}`}
                  width="100%"
                  height="100%"
                  controls
                />
              )
            )}
            </div>
            {
            
            <nav className="z-50 flex items-center justify-between w-full gap-2 pl-4 pr-4 text-xs bg-black ">
              <div className="flex gap-2 text-white">
                {
                mechanicDetails.mech_yt_url_controller.some(el => el !== "") &&
                
                <button className="flex items-center gap-1 p-1 text-gray-500 rounded-md hover:text-white"
                onClick={()=> {
                  setShowKbmVideos(false) 
                  setShowControllerVideos(true)
                }}>
                  <Icon className={`${showControllerVideos && 'text-white'}`} path={mdiController} size={2}/>
                </button>
                }
                {
                mechanicDetails.mech_yt_url_kbm.some(el => el !== "") &&
                
                <button className="flex items-center gap-2 text-gray-500 hover:text-pink-400" onClick={()=> {
                  setShowKbmVideos(true) 
                  setShowControllerVideos(false)
                }}>
                  <Icon className={`${showKbmVideos && 'text-pink-400'}`} path={mdiKeyboard} size={2}/>
                </button>
                }

              </div>
              {
              showControllerVideos &&
              <ul className="flex gap-4 ">
                {
                mechanicDetails.mech_yt_url_controller.length &&
                mechanicDetails.mech_yt_url_controller.map((url, index) => (
                  url &&
                  <li className={`w-6 h-6 flex items-center text-green-400 text-opacity-0 font-green-outline justify-center rounded-sm hover:text-green-400 font-enigma text-3xl 
                  cursor-pointer ${showVideo === url && 'text-opacity-100'}`}
                  onClick={()=> setShowVideo(url)}>{index + 1}</li>
                ))
                }
              </ul>
              }

              {
              showKbmVideos &&
              <ul className="flex gap-2">
              {
              showKbmVideos &&
              mechanicDetails.mech_yt_url_kbm.length &&
              mechanicDetails.mech_yt_url_kbm.map((url, index) => (
                url &&
                <li className={`w-6 h-6 flex items-center text-green-400 text-opacity-0 font-green-outline justify-center rounded-sm hover:text-green-400 font-enigma text-3xl 
                cursor-pointer ${showVideo === url && 'text-opacity-100'}`}
                onClick={()=> setShowVideo(url)}>{index + 1}</li>
              ))
              }
              </ul>
              }
            </nav>
            }
            
          </div>
          
        </section>

        <section className="grid w-full grid-cols-none gap-4 rounded-md md:grid-cols-3 h-fit">
          <div className="flex flex-col justify-between w-full gap-2 text-sm text-white h-fit">
            
            <div className="flex flex-col gap-2 ">
              <label className="text-xl text-white font-rajdhani">Info</label>

              <div className="flex flex-col gap-2 p-2 border-2 border-black border-opacity-25 rounded-lg shadow-md bg-jet-dark">
                {
                user_details && mechanicsStatus[mechanicDetails.mech_id] &&
                <div className="flex justify-between w-full gap-2 whitespace-nowrap">
                  <div className="text-gray-500 ">Status</div>
                  <div className={`flex items-center gap-2 ${mechanicsStatusOptions[mechanicsStatus[mechanicDetails.mech_id]].color}`}>
                    <Icon className={``}
                      path={mechanicsStatusOptions[mechanicsStatus[mechanicDetails.mech_id]].src} size={0.7} />
                    <em>{mechanicsStatusOptions[mechanicsStatus[mechanicDetails.mech_id]].tooltip}</em>
                  </div>
                </div>
                }
                <div className="flex justify-between w-full gap-2 rounded-md whitespace-nowrap">
                  <p className="text-gray-500 ">Difficulty</p>
                  <p className={`${difficultyColors[mechanicDetails?.mech_difficulty]}`}><em>{mechanicsDifficultyOptions[mechanicDetails?.mech_difficulty]}</em></p>
                </div>
                <div className="flex justify-between w-full gap-2 rounded-md whitespace-nowrap">
                  <p className="text-gray-500">Importance</p>
                  <p className={`${importanceColors[mechanicDetails?.mech_importance]}`}><em>{mechanicsImportanceOptions[mechanicDetails?.mech_importance]}</em></p>
                </div>
                <div className="flex justify-between w-full gap-2 rounded-md whitespace-nowrap">
                  <p className="text-gray-500">Rated Diff.</p>
                  <p className="text-gray-500">N/A</p>
                </div>
                <div className="flex justify-between w-full gap-2 rounded-md whitespace-nowrap">
                  <p className="text-gray-500">Rated Imp.</p>
                  <p className="text-gray-500">N/A</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="text-xl text-white font-rajdhani">PREVIEW</p>

              <div className="relative flex w-full h-64 p-2 border-2 border-black border-opacity-25 rounded-md shadow-md bg-jet-dark backdrop-blur-lg">
                {/* <img className="z-50" key={mechanicHoverGif.mech_id} src={mechanicHoverGif.gif_url} /> */}
                <iframe className="h-64 p-2" src={mechanicDetails.mech_gif} allowFullScreen></iframe>
              </div>
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="text-xl text-white font-rajdhani">Training Packs</label>
              <div className="flex flex-col gap-2 p-2 border-2 border-black border-opacity-25 rounded-md bg-jet-dark">
                {
                mechanicDetails.mech_training_packs.length ?
                mechanicDetails.mech_training_packs.map((packCode, index) => (
                  packCode !== "" && (
                    <button className="relative flex items-center justify-center w-full gap-2 p-1 text-sm text-white border border-white border-opacity-25 rounded-sm hover:bg-gray-200 hover:bg-opacity-10" key={index} 
                    onClick={()=> {
                      navigator.clipboard.writeText(packCode)
                      setTrainingPackToCopy(packCode)
                    }}>
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
                :
                <p className="text-white">N/A</p>
                }
                
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm ">
              <label className="text-xl text-white font-rajdhani">Prerequisites</label>
              <div className="flex flex-col w-full p-2 border-2 border-black border-opacity-25 rounded-md shadow-md bg-jet-dark">
                {
                mechanicDetails.mech_prerequisites.length ?
                mechanicDetails.mech_prerequisites.map((prereq, index) => (
                  <a className="w-full p-1 text-white underline break-words transition-all rounded-sm cursor-pointer hover:text-green-300" 
                  key={index} href={`/mechanics/${prereq}`} target="_blank">{prereq}</a>
                ))
                :
                <p className="text-white">N/A</p>
                }
              </div>
            </div>

          </div>

          <div className="flex flex-col w-full gap-2 overflow-hidden text-white md:col-span-2">
            <label className="text-xl text-white font-rajdhani">
              Description
            </label>
            
            <div className="p-2 text-sm whitespace-pre-line border-2 border-black border-opacity-25 rounded-md shadow-md bg-jet-dark overflow-ellipsis">
              {
              mechanicDetails.mech_description ? 
              
              <p>{mechanicDetails?.mech_description}</p>
              :
              <p className="text-white">N/A</p>
              }
            </div>
          </div>

        </section>

        
      </div>
    </div>
  );
}

export default MechanicDetails;
