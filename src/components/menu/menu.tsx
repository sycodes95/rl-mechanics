
import './menu.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import triangleneon from '../../../assets/images/triangle-neon.png'
import getUserFromToken from '../../services/getUserFromToken';
import ProfileDropMenu from './profileDropMenu';
import greenRocket from '../../assets/images/green-rocket.png';
import octane from '../../assets/images/octane-transparent-logo.png'
import blueOctane from '../../assets/images/blue-octane.png'
import { user_details } from '../../types/user_details';
import Kofi from "../../assets/images/kofi.png"


function Menu() {
  
  const [user_details, set_user_details] = useState<user_details | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIsAdmin , setUserIsAdmin] = useState(false)

  useEffect(()=> {

    // const token = localStorage.getItem('rlmechanics_token') as string;
    // token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    getUserFromToken()?.then(userDetails => set_user_details(userDetails))
    
  },[]);

  useEffect(()=> {
    user_details ? setIsLoggedIn(true) : setIsLoggedIn(false);
  },[user_details])

  useEffect(()=>{
    user_details && user_details.user_is_admin && setUserIsAdmin(true)
  },[user_details])

  return(
    <div className='z-40 flex items-center justify-center w-full h-16 p-4 shadow-md bg-jet-dark sm:pl-16 sm:pr-16'>

      <div className='flex justify-between w-full max-w-4xl'>

        <section className='flex items-center h-full gap-x-2 w-fit' >

          <Link to='/' className='relative flex items-center w-16 h-full gap-4 transition-all whitespace-nowrap font-tracks text-opacity-30'>
            <img className='w-16 transition-all duration-500' src={blueOctane} alt='octane-logo'/>
            <div className='flex flex-col h-full pt-2 mw-480px-hidden'>
              <p className='text-white font-1vw mw-480px-hidden '>rlm</p>
            </div>
            
          </Link>

        </section>

        {

        isLoggedIn ?

        <section className='flex items-center justify-end w-full gap-x-3'>
          
            
          <a className='flex items-center h-8 p-1 text-xs text-pink-500 transition-all duration-200 bg-pink-400 border border-pink-500 rounded-md hover:bg-opacity-10 bg-opacity-5' href='https://ko-fi.com/rlmechanics' target='_blank'>
            <img className='h-8' src={Kofi} alt='kofi-logo'/>
            <p className='p-1 mw-380px-hidden'>SUPPORT ME </p>
          </a>

          
          
          <ProfileDropMenu/>
           
        </section>
        :
        <section className='flex items-center justify-end w-full gap-x-3'>
          <a className='flex items-center h-8 p-1 text-xs text-pink-500 transition-all duration-200 bg-pink-400 border border-pink-500 rounded-md hover:bg-opacity-10 bg-opacity-5' href='https://ko-fi.com/rlmechanics' target='_blank'>
            <img className='h-8' src={Kofi} alt='kofi-logo'/>
            <p className='p-1 mw-380px-hidden'>SUPPORT ME </p>
          </a>
          

          <Link to='/log-in' className='flex items-center h-8 pt-1 pb-1 pl-2 pr-2 text-xs text-green-400 transition-all duration-200 bg-green-400 bg-opacity-0 border border-green-400 rounded-md font-rajdhani hover:bg-opacity-10'>
            <p>LOG IN</p>
          </Link>
          
          <Link to='/register' className='flex items-center h-8 pt-1 pb-1 pl-2 pr-2 text-xs text-white transition-all duration-200 bg-white bg-opacity-0 border border-white rounded-md font-rajdhani hover:bg-opacity-10'>
            <p>REGISTER</p>
          </Link>

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