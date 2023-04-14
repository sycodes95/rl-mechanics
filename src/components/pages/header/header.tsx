
import '../../../styles/header.css'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import rllogo from '../../../assets/images/rl-vector-black.png'
import triangleneon from '../../../assets/images/triangle-neon.png'
import triangledouble from '../../../assets/images/triangle-double.png'

import getUserFromToken from '../../utils/getUserFromToken';

function Header() {

  const [user_details, set_user_details] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getUserFromToken = () => {

    const token = localStorage.getItem('rlmechanics_token')
  
    if(!token) return 
  
    if(token){
  
      fetch(`${import.meta.env.VITE_API_HOST_URL}/users/verify-token-get`, {
        method: 'GET',
        headers: { 'authorization': `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(data =>{
        const userDetails =  data.user.user.rows[0]
        delete userDetails.user_password
        set_user_details(userDetails)
      })
      
    }
  }

  useEffect(()=> {

    const token = localStorage.getItem('rlmechanics_token') as string
    console.log(token);
    token ? setIsLoggedIn(true) : setIsLoggedIn(false)
    getUserFromToken()
    
  },[])

  useEffect(()=>{
    console.log(user_details);
  },[user_details])
  return(
    <div className=' h-12 w-full p-4 flex justify-center items-center bg-jet-dark-green z-50'>

      <div className='w-full max-w-7xl flex justify-between'>

        <section className='flex items-center w-full gap-x-2'>

          <img className='h-8' src={triangleneon} alt=''/>
          <p className='sm:flex items-center hidden text-white text-3xl font-silkscreen
          font-black-outline'>
            RL MECHANICS
          </p>

        </section>

        {

        isLoggedIn ?

        <section className='flex justify-end items-center w-full gap-x-4'>

          <Link to='/' className='h-6 w-20 flex justify-center items-center 
          bg-slate-800 bg-opacity-100 p-2 text-xs font-bold text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>MECHANICS</p>
          </Link>

          <Link to='/account' className='h-6 w-20 flex justify-center items-center 
          bg-slate-800 bg-opacity-100 p-2 text-xs font-bold text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>ACCOUNT</p>
          </Link>

          <button className='h-6 flex items-center bg-gradient-red-pink bg-opacity-100 p-2 text-xs text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>♥ SUPPORT ME ♥</p>
          </button>

          
           
        </section>

        :
        
        <section className='flex justify-end items-center w-full gap-x-4'>
  
          <Link to='/log-in' className='h-6 w-20 flex justify-center items-center 
          bg-gradient-green-blue bg-opacity-100 p-2 text-xs font-bold text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>LOG IN</p>
          </Link>
          
          <Link to='/register' className='h-6  w-20 flex justify-center items-center 
          bg-gradient-orange-yellow bg-opacity-100 p-2 text-xs font-bold text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>REGISTER</p>
          </Link>

          <button className='h-6 hidden sm:flex items-center bg-gradient-red-pink bg-opacity-100 p-2 text-xs text-white rounded-lg
          hover:bg-opacity-75 transition-all mw-768px-hidden'>
            <p>♥ SUPPORT ME ♥</p>
          </button>
            
        </section>
        }
      </div>

    </div>
  )
}

export default Header;