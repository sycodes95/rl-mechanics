import withAuth from "../../hocs/withAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

import twodown from "../../../assets/svgs/twodown.svg"
import { Oval } from "react-loader-spinner";


function Login (){
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);

  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const [loginData, setLoginData] = useState({
    user_email: "",
    user_password: ""
  })

  const handleInputChange = (e: any) => {
    //reset error msgs to empty array on any input change
    setErrorMsgs([])

    const { name, value } = e.target

    setLoginData({...loginData, [name]: value})
  };

  const handleLoginSubmit = (e: any) => {
    e.preventDefault()

    setIsFetching(true)

    fetch(`${import.meta.env.VITE_API_HOST_URL}/users/log-in-post`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      setIsFetching(false)
      console.log(data);
      const token = data.token

      if(token){
        setLoginSuccess(true)
        localStorage.setItem('rlmechanics_token', token)
        setTimeout(()=>{
          window.location.href = '/'
        },1000)
      } else if (!errorMsgs.includes('Invalid email or password')){
        setErrorMsgs([...errorMsgs, 'Invalid email or password'])
      }
      
    })
  }

  return (
    <div className="relative w-full flex flex-grow justify-center items-center p-4 ">
      <div className="max-w-7xl flex justify-between">
      
    
        <form className="absolute sm:w-96 w-95pct top-1/3 -translate-x-1/2 -translate-y-1/3 p-6 flex flex-col gap-4 
        rounded-md bg-jet-dark">
          <div className="w-full flex justify-center">   
            <ReactSVG className=" text-green-300 fill-current"  src={twodown}/>
            
          </div>
          <div className="text-4xl text-center font-bold text-green-300 rounded-md p-2">LOG IN</div>
          
          <input className="bg-jet-dark text-white text-xs caret-white rounded-md p-2 outline-1 outline outline-gray-800  
          focus:outline-green-300 transition-all duration-500" 
          name="user_email" type="text" value={loginData.user_email} placeholder="EMAIL"
          required 
          onChange={handleInputChange}/>

          <input className="bg-jet-dark text-white text-xs caret-white rounded-md p-2 outline-1 outline outline-gray-800  
          focus:outline-green-300 transition-all duration-500" 
          name="user_password" type="password" value={loginData.user_password} 
          placeholder="PASSWORD" required
          
          onChange={handleInputChange}/>

          <button className="h-8 flex justify-center items-center bg-gray-700 text-sm text-white p-1 rounded-md
          hover:bg-green-300 hover:text-gray-600 transition-all" onClick={handleLoginSubmit}>
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
            loginSuccess && 
            <p className="font-bold text-green-400">SUCCESS!</p>
            }

            {
            !isFetching && !loginSuccess &&
            <p className="font-bold">SUBMIT</p>
            }
          </button>
          
          {
          errorMsgs.length !== 0 &&
          <div>
          {
          errorMsgs.map((msg:string, index:number)=>(
            <p className="text-red-500 text-xs" key={index}>{msg}</p>
          ))
          }
          </div>
          }
          
          
        </form>
      </div>
    </div>
  )
}
export default withAuth(Login);