import withAuth from "../../hocs/withAuth";

import { useState } from "react";
import { ReactSVG } from "react-svg";
import { Oval } from "react-loader-spinner";
import twodown from "../../assets/svgs/twodown.svg"
import { env } from "process";


function Login (){

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
    <div className="absolute top-0 left-0 flex items-center justify-center flex-grow w-full h-full p-4 ">
      <div className="flex items-center h-full max-w-5xl">
      
    
        <form className="flex flex-col gap-4 p-6 bg-black rounded-md bg-opacity-40 sm:w-96 w-95pct">
          <div className="flex justify-center w-full">   
            <ReactSVG className="text-green-400 fill-current "  src={twodown}/>
            
          </div>
          <div className="p-2 text-4xl font-bold text-center text-green-400 text-opacity-0 rounded-md font-cyan-outline font-ocera">LOG IN</div>
          
          <input className="p-2 text-xs text-white transition-all duration-200 bg-black bg-opacity-25 rounded-md caret-white outline-1 outline outline-gray-800 focus:outline-green-300" 
          name="user_email" type="text" value={loginData.user_email} placeholder="EMAIL"
          required 
          onChange={handleInputChange}/>

          <input className="p-2 text-xs text-white transition-all duration-200 bg-black bg-opacity-25 rounded-md caret-white outline-1 outline outline-gray-800 focus:outline-green-300" 
          name="user_password" type="password" value={loginData.user_password} 
          placeholder="PASSWORD" required
          
          onChange={handleInputChange}/>

          <button className="flex items-center justify-center h-8 p-1 text-sm text-white transition-all bg-gray-700 rounded-md hover:bg-green-300 hover:text-gray-600" onClick={handleLoginSubmit}>
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
export default withAuth(Login);