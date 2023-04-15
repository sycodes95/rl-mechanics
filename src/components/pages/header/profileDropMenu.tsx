
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown, mdiAccountCircleOutline, mdiExitRun } from '@mdi/js';

import handleLogOut from './handleLogOut';

function ProfileDropMenu(){
  const [showProfileDropMenu, setShowProfileDropMenu] = useState(false);
  
  const menuItems = [
    <button className='flex items-center gap-2 text-red-500 bg-black hover:text-red-700 hover:bg-slate-950 transition-all
    whitespace-nowrap' onClick={handleLogOut}><p>SIGN OUT</p> <Icon path={mdiExitRun} size={0.6} /></button> 
  ];

  return (
    <div className='h-6 flex justify-center items-center 
    p-2 text-xs font-bold text-white rounded-lg
    hover:bg-opacity-75 transition-all relative'>
      <p className='flex items-center cursor-pointer' onClick={()=> setShowProfileDropMenu(true)}>
        <Icon className='' path={mdiAccountCircleOutline} size={1}/>
        <Icon className='' path={mdiTriangleSmallDown} size={0.8}/>
      </p>
      {
      showProfileDropMenu &&
      <div id='profile-drop-menu-overlay' 
      className='fixed top-0 left-0 z-20 h-screen w-screen'
      onClick={()=> setShowProfileDropMenu(false)}>

      </div>
      
      }
      {
      showProfileDropMenu && 
      <div className='absolute flex flex-col gap-2 top-full right-0 mt-2 bg-black text-white rounded-md 
       p-4 z-30 font-thin'>
        {
        menuItems.map((item, index) => (
          <div key={index} className='w-full h-full'>{item}</div>
        ))
        }
      </div>
      }
      
    </div>
  )
}

export default ProfileDropMenu;