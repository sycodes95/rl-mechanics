import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/pages/header/header';
import Register from './components/pages/register/register';


function App() {

  return (
    <BrowserRouter>
      <div id='app' className='flex flex-col min-h-screen bg-dot '>
        
        <Header/>
        <Routes>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
