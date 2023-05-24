import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/pages/header/header';
import Register from './components/pages/register/register';
import Login from './components/pages/login/login';
import Mechanics from './components/pages/mechanics/mechanics';
import Admin from './components/pages/mechanicsAdmin/admin';
import 'react-tooltip/dist/react-tooltip.css'
import MechanicDetails from './components/pages/mechanics/mechanicDetails';



function App() {

  return (
    <BrowserRouter>
      <div id='app' className='flex flex-col w-full min-h-screen bg-brown-plum-gradient'>
        <div>
          <Header/>
        </div>
        <div className='flex-1 w-full h-full p-12'>
        <Routes>
          <Route path='/' element={<Mechanics/>}/>
          <Route path='/mechanics' element={<Mechanics/>}/>
          <Route path='/mechanics/:mech_url' element={<MechanicDetails/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/log-in' element={<Login/>}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
