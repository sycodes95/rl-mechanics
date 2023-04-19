
import { useEffect, useState } from "react";
import Rating from "react-rating";

interface MechSearchProps{
  filterDataContext: {
    filterData: object;
    setFilterData: React.Dispatch<React.SetStateAction<object>>;
  };
}

function MechFilters({ filterDataContext }: MechSearchProps){
  
  const {filterData, setFilterData} = filterDataContext;

  const filterDataDefault = {
    mech_difficulty: { firstInput: 0, secondInput: 0},
    mech_importance: { firstInput: 0, secondInput: 0},
    mech_created_at: { firstInput:  "", secondInput: ""},
    rating_difficulty: { firstInput: 0, secondInput: 0},
    rating_importance: { firstInput: 0, secondInput: 0},
  }

  const handleClearFilters = () => setFilterData(filterDataDefault);
    
  

  useEffect(()=>{
    console.log(filterData);
    console.log(filterDataDefault);
  },[filterData])

  return (
    <div className="flex gap-4 w-full rounded-md ">
      <section>
        <label className="text-sm font-bold">FILTERS</label>
      </section>

      <section className="flex flex-wrap gap-4">
        <div id="mech-difficulty-filter" className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs">DIFFICULTY</p>

          <div className="flex w-full justify-evenly">
          
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.mech_difficulty.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, mech_difficulty: {...filterData.mech_difficulty, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.mech_difficulty.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, mech_difficulty: {...filterData.mech_difficulty, secondInput: value}})}
            />
            <button className="bg-black bg-opacity-25 hover:bg-opacity-50 text-xs text-red-800 p-1 rounded-md transition-all" 
            onClick={()=> setFilterData({...filterData, mech_difficulty: {firstInput: 0, secondInput: 0}})}>
              <p>RESET</p>
            </button>
          </div>
          
        </div>
        <div id="mech-importance-filter" className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs">IMPORTANCE</p>
          <div className="flex w-full justify-evenly">
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.mech_importance.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, mech_importance: {...filterData.mech_importance, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.mech_importance.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, mech_importance: {...filterData.mech_importance, secondInput: value}})}
            />
          </div>
        </div>
        <div id="rating-difficuty-filter" className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs whitespace-nowrap">DIFFICULTY RATING</p>
          <div className="flex w-full justify-evenly">
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.rating_difficulty.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, rating_difficulty: {...filterData.rating_difficulty, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.rating_difficulty.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, rating_difficulty: {...filterData.rating_difficulty, secondInput: value}})}
            />
          </div>
        </div>
        <div id="rating-importance-filter" className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs whitespace-nowrap">IMPORTANCE RATING</p>
          <div className="flex w-full justify-evenly">
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.rating_importance.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, rating_importance: {...filterData.rating_importance, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterData.rating_importance.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterData({...filterData, rating_importance: {...filterData.rating_importance, secondInput: value}})}
            />
          </div>
        </div>

        <div className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs whitespace-nowrap">DATE CREATED</p>
          <div className="flex w-full justify-evenly">
            <input className="bg-black bg-opacity-0 text-xs"  type="date" value={filterData.mech_created_at.firstInput} onChange={(e)=>{
              setFilterData({...filterData, mech_created_at: {firstInput: e.target.value, secondInput: filterData.mech_created_at.secondInput} })
            }}/>
            <p>-</p>
            <input className="bg-black bg-opacity-0 text-xs"  type="date" value={filterData.mech_created_at.secondInput} onChange={(e)=>{
              setFilterData({...filterData, mech_created_at: {firstInput: filterData.mech_created_at.firstInput, secondInput: e.target.value} })
            }}/>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="text-xs bg-green-900 p-1 rounded-md hover:bg-green-800 transition-all">APPLY</button>
          <button className="text-xs bg-red-900 p-1 rounded-md hover:bg-red-800 transition-all" onClick={handleClearFilters}>CLEAR</button>
        </div>
      </section>
    </div>
  );
};

export default MechFilters;