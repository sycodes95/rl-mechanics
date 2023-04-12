
import '../../../styles/header.css'
import rllogo from '../../../assets/images/rl-vector-black.png'

const Header = () => {
  return(
    <div className='h-12 w-full p-6 flex justify-center items-center bg-white'>
      <div className='w-full max-w-7xl flex justify-between'>

        <section className='flex items-center w-full'>
          <img className='h-8' src={rllogo} alt=''/>
          <p className='text-black text-2xl '>RL MECHANICS</p>
            
        </section>

        <section className='flex justify-end items-center w-full'>
          <button className='bg-red-400 bg-opacity-100 p-2 text-xs text-white rounded-lg
          hover:bg-opacity-75 transition-all'>
            <p>♥ SUPPORT ME ♥</p>
          </button>
            
        </section>
      </div>
    </div>
  )
}

export default Header;