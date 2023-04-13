import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import withAuth from "../../hocs/withAuth"
import rankOptions from "./rankOptions"
import emailRegex from "./emailRegex"


function Register () {
  const navigate = useNavigate()
  const [registerationData, setRegisterationData] = useState({
    user_email: "",
    user_password: "",
    user_confirm_password: "",
    user_first_name: "",
    user_last_name: "",
    user_rank: "",
    user_is_verified: false,
  })

  const handleInputChange = (e: any) => {
    
    const { name, value } = e.target
    setRegisterationData({...registerationData, [name]: value})
  }

  const handleRegisterSubmit = () => {
    fetch(`${process.env.REACT_APP_API_HOST_URL}/users/register-post`, {
      method: 'POST',
      body: JSON.stringify(registerationData),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      
      const user = data.user;
      const errors = data.errors;
      if(data && user){
        setTimeout(()=>{
          navigate('/log-in')
        },1500)
      } 

      if(data && errors) {
        console.log(errors);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="relative w-full flex flex-grow justify-center items-center p-4 border border-gray-300">
      <div className="max-w-7xl flex justify-between">
      
        <form className="absolute top-1/3 -translate-x-1/2 -translate-y-1/3 p-6 flex flex-col gap-4 
        border border-gray-400 border-opacity-60 rounded-md bg-white">
          <div className="text-2xl font-bold text-orange-400">REGISTERATION</div>
          
          <input className="text-black text-xs caret-black rounded-md p-2 outline-1 outline outline-gray-300  
          focus:outline-orange-400 transition-all duration-500" 
          name="user_email" type="text" value={registerationData.user_email} placeholder="EMAIL"
          required 
          onChange={handleInputChange}/>

          <input className="text-black text-xs caret-black rounded-md p-2 outline-1 outline outline-gray-300  
          focus:outline-orange-400 transition-all duration-500" 
          name="user_password" type="text" value={registerationData.user_password} placeholder="PASSWORD"
          required
          onChange={handleInputChange}/>

          <input className="text-black text-xs caret-black rounded-md p-2 outline-1 outline outline-gray-300  
          focus:outline-orange-400 transition-all duration-500" 
          name="user_confirm_password" type="text" value={registerationData.user_password} placeholder="CONFIRM PASSWORD"
          required
          onChange={handleInputChange}/>

          
          <select className="text-black text-xs caret-black rounded-md p-2 outline-1 outline outline-gray-300  
          focus:outline-orange-400 transition-all duration-500" name="user_rank" value={registerationData.user_rank} 
          onChange={handleInputChange}>
            <option className="rounded-md" hidden>Highest Rank</option>
            {
            rankOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
            ))
            }
            
          </select>

          <button className="bg-gray-300 text-sm p-1 hover:bg-orange-300 transition-all">SUBMIT</button>
          
        </form>
      </div>
    </div>
  )
}

export default withAuth(Register);
