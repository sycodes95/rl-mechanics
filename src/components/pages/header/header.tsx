
import '../../../styles/header.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import triangleneon from '../../../assets/images/triangle-neon.png'
import getUserFromToken from '../../utils/getUserFromToken';
import ProfileDropMenu from './profileDropMenu';

function Header() {

  const [user_details, set_user_details] = useState<object | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  useEffect(()=> {

    const token = localStorage.getItem('rlmechanics_token') as string;
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
   getUserFromToken()?.then(userDetails => set_user_details(userDetails))
    
  },[]);

  useEffect(()=> {
    console.log(user_details);
    
  },[user_details]);


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
          bg-orange-500 bg-opacity-100 p-2 text-xs font-bold text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>MECHANICS</p>
          </Link>

          <button className='h-6 flex items-center bg-gradient-red-pink bg-opacity-100 p-2 text-xs text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>♥ SUPPORT ME ♥</p>
          </button>
          
          <ProfileDropMenu/>
           
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