
import './index.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import triangleneon from '../../../assets/images/triangle-neon.png'
import getUserFromToken from '../../utils/getUserFromToken';
import ProfileDropMenu from './profileDropMenu';

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

function Header() {
  
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
    <div className='z-40 flex items-center justify-center w-full h-16 pl-16 pr-16 bg-black border-b border-black bg-opacity-30 border-opacity-30'>

      <div className='flex justify-between w-full max-w-7xl'>

        <section className='flex items-center w-full h-full gap-x-2' >

          <Link to='/' className='items-center hidden text-white text-opacity-0 transition-all duration-500 font-1vw sm:flex font-ocera font-white-outline hover:text-opacity-25'>
            RL MECHANICS
          </Link>

        </section>

        {

        isLoggedIn ?

        <section className='flex items-center justify-end w-full gap-x-4'>

          <Link to='/' className='flex items-center justify-center w-20 h-6 p-2 text-xs font-bold text-black transition-all bg-green-400 bg-opacity-100 rounded-sm hover:bg-opacity-50'>
            <p>MECHANICS</p>
          </Link>

          {
          !userIsAdmin &&
          
          <button className='flex items-center h-6 p-2 text-xs text-white transition-all bg-opacity-100 rounded-lg bg-gradient-red-pink hover:bg-opacity-75'>
            <p>♥ SUPPORT ME ♥</p>
          </button>
          }


          
          <ProfileDropMenu/>
           
        </section>

        :
        
        <section className='flex items-center justify-end w-full gap-x-4'>
  
          <Link to='/log-in' className='flex items-center justify-center w-20 h-6 p-2 text-xs font-bold text-white transition-all bg-opacity-100 rounded-md bg-gradient-green-blue hover:bg-opacity-75'>
            <p>LOG IN</p>
          </Link>
          
          <Link to='/register' className='flex items-center justify-center w-20 h-6 p-2 text-xs font-bold text-white transition-all bg-opacity-100 rounded-md bg-gradient-orange-yellow hover:bg-opacity-75'>
            <p>REGISTER</p>
          </Link>

          <button className='items-center hidden h-6 p-2 text-xs text-white transition-all bg-opacity-100 rounded-md sm:flex bg-gradient-red-pink hover:bg-opacity-75 mw-768px-hidden'>
            <p>♥ SUPPORT ME ♥</p>
          </button>
            
        </section>
        }
      </div>

    </div>
  )
}

export default Header;