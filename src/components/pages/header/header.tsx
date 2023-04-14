
import '../../../styles/header.css'
import rllogo from '../../../assets/images/rl-vector-black.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=> {

    const token = JSON.parse(localStorage.getItem('rlmechanics_token') as string)
    console.log(token);
    token ? setIsLoggedIn(true) : setIsLoggedIn(false)

  },[])
  return(
    <div className=' h-12 w-full p-4 flex justify-center items-center bg-white z-50'>

      <div className='w-full max-w-7xl flex justify-between'>

        <section className='flex items-center w-full'>

          <img className='h-8' src={rllogo} alt=''/>
          <p className='sm:flex items-center hidden text-black text-3xl font-silkscreen'>RL MECHANICS</p>

        </section>

        {

        isLoggedIn ?

        <section className='flex justify-end items-center w-full gap-x-4'>

          <Link to='/log-in' className='h-6 w-20 flex justify-center items-center 
          bg-gray-600 bg-opacity-100 p-2 text-xs font-bold text-white rounded-lg
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