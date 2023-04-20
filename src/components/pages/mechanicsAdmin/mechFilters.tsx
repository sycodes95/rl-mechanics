
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { FilterData } from "./admin"

interface MechFiltersProps{
  filterDataContext: {
    filterData: FilterData | null;
    setFilterData: React.Dispatch<React.SetStateAction<FilterData | null>>;
  };
}

function MechFilters({ filterDataContext }: MechFiltersProps){
  
  const {filterData, setFilterData} = filterDataContext;

  const [filterValues, setFilterValues] = useState<FilterData>({
    mech_difficulty: { firstInput: 0, secondInput: 0},
    mech_importance: { firstInput: 0, secondInput: 0},
    mech_created_at: { firstInput:  "", secondInput: ""},
    rating_difficulty: { firstInput: 0, secondInput: 0},
    rating_importance: { firstInput: 0, secondInput: 0},
  })

  const filterDataDefault = {
    mech_difficulty: { firstInput: 0, secondInput: 0},
    mech_importance: { firstInput: 0, secondInput: 0},
    mech_created_at: { firstInput:  "", secondInput: ""},
    rating_difficulty: { firstInput: 0, secondInput: 0},
    rating_importance: { firstInput: 0, secondInput: 0},
  }

  const handleClearFilters = () => {
    setFilterValues(filterDataDefault);
    setFilterData(null)
  }
    
  const handleApplyFilter = () => setFilterData(filterValues)

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
            initialRating={filterValues.mech_difficulty.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, mech_difficulty: {...filterValues.mech_difficulty, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterValues.mech_difficulty.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, mech_difficulty: {...filterValues.mech_difficulty, secondInput: value}})}
            />
            <button className="bg-black bg-opacity-25 hover:bg-opacity-50 text-xs text-red-800 p-1 rounded-md transition-all" 
            onClick={()=> setFilterValues({...filterValues, mech_difficulty: {firstInput: 0, secondInput: 0}})}>
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
            initialRating={filterValues.mech_importance.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, mech_importance: {...filterValues.mech_importance, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterValues.mech_importance.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, mech_importance: {...filterValues.mech_importance, secondInput: value}})}
            />
          </div>
        </div>
        <div id="rating-difficuty-filter" className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs whitespace-nowrap">DIFFICULTY RATING</p>
          <div className="flex w-full justify-evenly">
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterValues.rating_difficulty.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, rating_difficulty: {...filterValues.rating_difficulty, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterValues.rating_difficulty.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, rating_difficulty: {...filterValues.rating_difficulty, secondInput: value}})}
            />
          </div>
        </div>
        <div id="rating-importance-filter" className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs whitespace-nowrap">IMPORTANCE RATING</p>
          <div className="flex w-full justify-evenly">
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterValues.rating_importance.firstInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, rating_importance: {...filterValues.rating_importance, firstInput: value}})}
            />
            <p>-</p>
            <Rating
            className=' text-gray-400 flex justify-between'
            initialRating={filterValues.rating_importance.secondInput}
            emptySymbol="fa fa-star-o"
            fullSymbol="fa fa-star "
            fractions={1}
            stop={5}
            onChange={(value: number)=> setFilterValues({...filterValues, rating_importance: {...filterValues.rating_importance, secondInput: value}})}
            />
          </div>
        </div>

        <div className="flex flex-grow items-center pl-2 pr-2 rounded-md gap-4 text-lg bg-black bg-opacity-10
        border border-gray-900">
          <p className="text-xs whitespace-nowrap">DATE CREATED</p>
          <div className="flex w-full justify-evenly">
            <input className="bg-black bg-opacity-25 p-1 text-xs"  type="date" value={filterValues.mech_created_at.firstInput} onChange={(e)=>{
              setFilterValues({...filterValues, mech_created_at: {firstInput: e.target.value, secondInput: filterValues.mech_created_at.secondInput} })
            }}/>
            <p>-</p>
            <input className="bg-black bg-opacity-25 p-1 text-xs"  type="date" value={filterValues.mech_created_at.secondInput} onChange={(e)=>{
              setFilterValues({...filterValues, mech_created_at: {firstInput: filterValues.mech_created_at.firstInput, secondInput: e.target.value} })
            }}/>
          </div>
        </div>

        <div className="flex gap-4">

          <button className="text-xs bg-green-900 p-1 rounded-md hover:bg-green-800 transition-all"
          onClick={handleApplyFilter}>APPLY</button>

          <button className="text-xs bg-red-900 p-1 rounded-md hover:bg-red-800 transition-all" 
          onClick={handleClearFilters}>CLEAR</button>

        </div>
      </section>
    </div>
  );
};

export default MechFilters;