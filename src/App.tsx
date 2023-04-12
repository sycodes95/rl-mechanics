import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/pages/header/header';

function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-waves'>

        
        <Header/>
        
      

        <Routes>
          <Route/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
