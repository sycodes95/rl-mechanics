
import './menu.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import triangleneon from '../../../assets/images/triangle-neon.png'
import getUserFromToken from '../../services/getUserFromToken';
import ProfileDropMenu from './profileDropMenu';
import greenRocket from '../../assets/images/green-rocket.png';

interface user_details {
  user_id: number;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_is_verified: boolean;
  user_is_admin: boolean;
  user_rank: string;
  user_created_At: string;
  
}

function Menu() {
  
  const [user_details, set_user_details] = useState<user_details | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIsAdmin , setUserIsAdmin] = useState(false)

  useEffect(()=> {

    const token = localStorage.getItem('rlmechanics_token') as string;
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    getUserFromToken()?.then(userDetails => set_user_details(userDetails))
    
  },[]);

  useEffect(()=>{
    user_details && user_details.user_is_admin && setUserIsAdmin(true)
  },[user_details])

  return(
    <div className='z-40 flex items-center justify-center w-full h-16 pl-16 pr-16 bg-black bg-opacity-50'>

      <div className='flex justify-between w-full max-w-4xl'>

        <section className='flex items-center w-full h-full gap-x-2' >

          <Link to='/' className='relative flex items-center h-full gap-4 transition-all text-emerald-400 whitespace-nowrap font-1vw font-nakelin hover:text-opacity-50 '>
            <img className='h-8 transition-all duration-500 -rotate-45 hover:rotate-0' src={greenRocket} alt='green-rocket'/>
            <p className='mw-480px-hidden'>RL MECHANICS</p>
          </Link>

        </section>

        {

        isLoggedIn ?

        <section className='flex items-center justify-end w-full gap-x-4'>

          {/* <Link to='/' className='flex items-center justify-center w-20 h-6 p-2 text-xs font-bold text-black transition-all bg-green-400 bg-opacity-100 rounded-sm hover:bg-opacity-50'>
            <p>MECHANICS</p>
          </Link> */}

          {/* {
          !userIsAdmin &&
          
          <button className='flex items-center h-6 p-2 text-xs text-white transition-all bg-opacity-100 rounded-lg bg-gradient-red-pink hover:bg-opacity-75'>
            <p>♥ SUPPORT ME ♥</p>
          </button>
          } */}
          
          <ProfileDropMenu/>
           
        </section>
        :
        <section className='flex items-center justify-end w-full gap-x-4'>
  
          {/* <Link to='/log-in' className='pt-1 pb-1 pl-2 pr-2 text-sm text-green-400 transition-all duration-200 bg-green-400 bg-opacity-0 border border-green-400 rounded-sm font-rajdhani hover:bg-opacity-10'>
            <p>LOG IN</p>
          </Link> */}
          
          {/* <Link to='/register' className='pt-1 pb-1 pl-2 pr-2 text-sm text-white transition-all duration-200 bg-white bg-opacity-0 border border-white rounded-sm font-rajdhani hover:bg-opacity-10'>
            <p>REGISTER</p>
          </Link> */}

          {/* <button className='flex items-center h-6 p-2 text-xs text-white transition-all bg-pink-500 rounded-md font-rajdhani sm:flex hover:bg-opacity-75 '>
            <p className='text-xs font-bold'>♥ SUPPORT ME ♥</p>
          </button> */}
            
        </section>
        }
      </div>

    </div>
  )
}

export default Menu;