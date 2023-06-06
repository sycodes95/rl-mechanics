import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/menu/menu';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Mechanics from './pages/mechanics/mechanics';
import 'react-tooltip/dist/react-tooltip.css'
import MechanicDetails from './pages/mechanicDetails/mechanicDetails';
import Footer from './components/footer/footer';



function App() {

  return (
    <BrowserRouter>
      <div id='app' className='flex flex-col w-full min-h-screen bg-gradient'>
        <div>
          <Menu/>
        </div>
        <div className='flex-1 p-12 mb-12'>
        <Routes>
          <Route path='/' element={<Mechanics/>}/>
          <Route path='/mechanics' element={<Mechanics/>}/>
          <Route path='/mechanics/:mech_url' element={<MechanicDetails/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/log-in' element={<Login/>}/>
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
