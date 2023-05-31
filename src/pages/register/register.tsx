import withAuth from "../../hocs/withAuth";
import { useState} from "react";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import rankOptions from "./rankOptions";
import validEmail from "../../utils/validEmail";
import validPassword from "../../utils/validPassword";
import { Oval } from "react-loader-spinner";

import twodown from "../../assets/svgs/twodown.svg"

function Register () {
  
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);

  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  const [emailFormatErr, setEmailFormatErr] = useState(false);

  const [passwordLengthErr, setPasswordLengthErr] = useState(false);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [registerationData, setRegisterationData] = useState({
    user_email: "",
    user_password: "",
    user_confirm_password: "",
    user_first_name: "",
    user_last_name: "",
    user_rank: "",
    user_is_verified: false,
  });

  const handleInputChange = (e: any) => {
    //reset error msgs to empty array on any input change
    setErrorMsgs([])

    const { name, value } = e.target

    setRegisterationData({...registerationData, [name]: value})
  };

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();

    //reset email & password errors back to default value (false) when user submits form
    setEmailFormatErr(false);
    setPasswordLengthErr(false);

    //Exit if email or password is invalid and set error flags
    if(!validEmail(registerationData.user_email)) return setEmailFormatErr(true)
    if(!validPassword(registerationData.user_password)) return setPasswordLengthErr(true)

    setIsFetching(true);

    fetch(`${import.meta.env.VITE_API_HOST_URL}/users/register-post`, {
      method: 'POST',
      body: JSON.stringify(registerationData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      setIsFetching(false);
      console.log(data);
      const user = data.user;
      const errors = data.errors;
      
      if(data && user){
        setRegisterSuccess(true);
        setTimeout(()=>{
          navigate('/log-in')
        },1000);
      };
      
      if(data && errors) {
        if(errors.code === '23505' && !errorMsgs.includes('Email Already Exists *')){
          setErrorMsgs([...errorMsgs, 'Email Already Exists *']);
        }

        errors.forEach((err: {msg: string}) => {
          if(err.msg === 'Passwords don\'t match' && !errorMsgs.includes('Passwords don\'t match')){
            setErrorMsgs([...errorMsgs, 'Passwords don\'t match *']);
          } 
        })
        
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="relative flex items-center justify-center flex-grow w-full p-4 ">
      <div className="flex justify-between max-w-7xl">
        
      
        <form className="absolute flex flex-col gap-4 p-6 -translate-x-1/2 rounded-md sm:w-96 w-95pct top-1/3 -translate-y-1/3 bg-jet-dark">
          <div className="flex justify-center w-full">   
            <ReactSVG className="text-orange-400 fill-current "  src={twodown}/>
            
          </div>
          <div className="p-2 text-4xl font-bold text-center text-white text-orange-400 rounded-md">REGISTRATION</div>
          
          <input className="p-2 text-xs text-white transition-all duration-500 rounded-md bg-jet-dark caret-white outline-1 outline outline-gray-800 focus:outline-orange-400" 
          name="user_email" type="text" value={registerationData.user_email} placeholder="EMAIL"
          required 
          onChange={handleInputChange}/>

          <input className="p-2 text-xs text-white transition-all duration-500 rounded-md bg-jet-dark caret-white outline-1 outline outline-gray-800 focus:outline-orange-400" 
          name="user_password" type="password" value={registerationData.user_password} 
          placeholder="PASSWORD (MIN 8 CHARACTERS)" required
          
          onChange={handleInputChange}/>
          
          <input className="p-2 text-xs text-white transition-all duration-500 rounded-md bg-jet-dark caret-white outline-1 outline outline-gray-800 focus:outline-orange-400" 
          name="user_confirm_password" type="password" value={registerationData.user_confirm_password} 
          placeholder="CONFIRM PASSWORD "
          required
          onChange={handleInputChange}/>

          
          <select className="p-2 text-xs text-white transition-all duration-500 rounded-md bg-jet-dark caret-white outline-1 outline outline-gray-800 focus:outline-orange-400" name="user_rank" value={registerationData.user_rank} 
          onChange={handleInputChange}>
            <option className="rounded-md" hidden>Highest Rank</option>
            {
            rankOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
            ))
            }
            
          </select>

          <button className="flex items-center justify-center h-8 p-1 text-sm transition-all bg-gray-700 rounded-md hover:bg-orange-400" onClick={handleRegisterSubmit}>
            {
            isFetching &&
            <Oval
            height={20}
            width={20}
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
            registerSuccess && 
            <p className="font-bold text-green-400">SUCCESS!</p>
            }

            {
            !isFetching && !registerSuccess &&
            <p className="font-bold text-white">SUBMIT</p>
            }
          </button>
          
          {
          emailFormatErr &&
          <p className="h-4 text-xs text-red-500">Incorrect email format *</p>
          }
          {
          passwordLengthErr &&
          <p className="text-xs text-red-500">Password length must be minimum 8 characters *</p>
          }
          
          {
          errorMsgs.length !== 0 &&
          <div>
          {
          errorMsgs.map((msg:string, index:number)=>(
            <p className="text-xs text-red-500" key={index}>{msg}</p>
          ))
          }
          </div>
          }
          
          
        </form>
      </div>
    </div>
  )
}

export default withAuth(Register);
