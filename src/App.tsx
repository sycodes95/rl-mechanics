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



function App() {
  useEffect(()=> {
    console.log(import.meta.env.VITE_HOST_API_URL);
  },[])
  return (
    <BrowserRouter>
      <div id='app' className='flex flex-col w-full min-h-screen bg-gradient'>
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
