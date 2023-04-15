
import { useEffect, useState } from "react";

import Rating from "react-rating";

function Admin () {
  const [addTradeIsOpen, setAddTradeIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const [filterData, setFilterData] = useState({
    mech_difficulty: { firstInput: 2, secondInput: 0},

  })
    

  useEffect(()=>{
    
  },[filterData])

  return(
    <div className="flex justify-center text-white w-full h-full pt-12 pb-12">
      <div className="flex flex-col gap-4 w-full max-w-7xl  rounded-md p-4">
        <section className="flex flex-col sm:flex-row justify-between gap-4">
          <p className="flex items-center text-4xl font-bold whitespace-nowrap ">ADMIN </p>
          <button className="p-4 w-full sm:w-fit bg-orange-500 hover:bg-orange-400 text-sm font-bold 
          rounded-md whitespace-nowrap transition-all">ADD MECHANIC</button>
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md">
          
          <div className="flex items-center gap-4 h-full w-full rounded-md ">
            <label className="text-sm font-bold">SEARCH</label>
            <input className="h-6 w-full bg-jet-dark text-white text-xs caret-white rounded-md p-2 outline-1 outline outline-gray-800  
          focus:outline-gray-600 transition-all duration-300" type="text" placeholder="Search Any..." />
          </div>
          
          <div className="flex items-center  gap-4 w-full rounded-md ">
            <label className="text-sm font-bold">FILTERS</label>
            <div className="flex items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10">
              <p className="text-xs">DIFFICULTY</p>
              <Rating
              className=' text-gray-400 flex justify-between'
              initialRating={filterData.mech_difficulty.firstInput}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star "
              fractions={1}
              stop={5}
              onChange={(value: number)=> setFilterData({...filterData, mech_difficulty: {...filterData.mech_difficulty, firstInput: value}})}
              />
              
            </div>
          </div>
        </section>

        
      </div>
    </div>
  )
}

export default Admin;