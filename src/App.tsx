import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/menu/menu';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Mechanics from './pages/mechanics/mechanics';
import 'react-tooltip/dist/react-tooltip.css'
import MechanicDetails from './pages/mechanicDetails/mechanicDetails';
import Footer from './components/footer/footer';
import NotFound from './pages/notFound/notFound';
import { useEffect } from 'react';

import 'react-tooltip/dist/react-tooltip.css'
import getUserFromToken from './services/getUserFromToken';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './slices/userSlice';
import { RootState } from './store';
import { getMechanicsStatus } from './services/getMechanicStatuses';
import { setMechanicsStatus } from './features/mechanics/slice/mechanicsSlice';

function App() {
  const dispatch = useDispatch()

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  useEffect(() => {
    getUserFromToken()?.then((user_details) => {
      user_details && dispatch(setUserDetails(user_details));
    });
  }, []);

  useEffect(()=>{
    if(user_details){
      getMechanicsStatus(user_details.user_id)?.then((mechanicsStatusData) => {
        mechanicsStatusData && dispatch(setMechanicsStatus(mechanicsStatusData));
      });
    }
  },[user_details])
  return (
    <BrowserRouter>
      <div id='app' className='flex flex-col w-full min-h-screen bg-jet-darker'>
        <div>
          <Menu/>
        </div>
        <div className='relative flex-1 p-4 mb-12 sm:p-12'>
          <Routes>
            <Route path='/' element={<Mechanics/>}/>
            <Route path='/mechanics' element={<Mechanics/>}/>
            <Route path='/mechanics/:mech_url' element={<MechanicDetails/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/log-in' element={<Login/>}/>
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
