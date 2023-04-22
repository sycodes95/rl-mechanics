import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/pages/header/header';
import Register from './components/pages/register/register';
import Login from './components/pages/login/login';
import Mechanics from './components/pages/mechanics/mechanics';
import Admin from './components/pages/mechanicsAdmin/admin';
import 'react-tooltip/dist/react-tooltip.css'

function App() {

  return (
    <BrowserRouter>
      <div id='app' className='flex flex-col min-h-screen bg-jet-light'>
        <Header/>
        <Routes>
          <Route path='/' element={<Mechanics/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/log-in' element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
