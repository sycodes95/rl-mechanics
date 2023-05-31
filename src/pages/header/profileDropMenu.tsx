
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown, mdiAccountCircleOutline, mdiExitRun } from '@mdi/js';

import handleLogOut from './handleLogOut';

function ProfileDropMenu(){
  const [showProfileDropMenu, setShowProfileDropMenu] = useState(false);
  
  const menuItems = [
    <button className='flex items-center gap-2 text-red-500 transition-all bg-black hover:text-red-700 hover:bg-slate-950 whitespace-nowrap' onClick={handleLogOut}><p>SIGN OUT</p> <Icon path={mdiExitRun} size={0.6} /></button> 
  ];

  return (
    <div className='relative flex items-center justify-center h-6 p-2 text-xs font-bold text-white transition-all rounded-lg hover:bg-opacity-75'>
      <p className='flex items-center cursor-pointer' onClick={()=> setShowProfileDropMenu(true)}>
        <Icon className='' path={mdiAccountCircleOutline} size={1}/>
        <Icon className='' path={mdiTriangleSmallDown} size={0.8}/>
      </p>
      {
      showProfileDropMenu &&
      <div id='profile-drop-menu-overlay' 
      className='fixed top-0 left-0 z-20 w-screen h-screen'
      onClick={()=> setShowProfileDropMenu(false)}>

      </div>
      
      }
      {
      showProfileDropMenu && 
      <div className='absolute right-0 z-30 flex flex-col gap-2 p-4 mt-2 font-thin text-white bg-black rounded-md top-full'>
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