import { useEffect, useRef, useState } from "react";

import getMechanics from "../../utils/getMechanics";
import { FilterData, Mechanic, PaginationData, SelectedSortColumn } from "../../types/mechanicsAdmin/types";
import MechanicsTable from "./mechanicsTable";
import '../../../styles/mechanics.css'
import useDebounce from "../../hooks/useDebounce";
import { FilterValues } from "../../types/mechanics/types";
import { MechanicsStatusOptions } from "./types";


function Mechanics() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([])

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue, 300);

  const [filterData, setFilterData] = useState<FilterData | null>(null);

  const statusFilterRef = useRef<HTMLDivElement>(null)

  const [selectedSortColumn, setSelectedSortColumn] = useState<SelectedSortColumn>({
    column: null,
    value: false
  });

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 0,
    pageSize: 50,
    totalCount: null
  });

  const [filterValues, setFilterValues] = useState<FilterValues>({
    mechanic_status_value: 0,
    mech_difficulty: 0,
    mech_importance: 0,
    rating_difficulty: 0,
    rating_importance: 0,
  })

  const [statusFilter, setStatusFilter] = useState(false)

  const mechanicsStatusOptions : MechanicsStatusOptions = {
    'Consistent': 2,
    'Inconsistent': 1,
    'Not Learned': 0,
  }

  const mechDifficultyOptions = {
    'Very Easy': 1,
    'Easy': 2,
    'Medium': 3,
    'Hard': 4,
    'Insane': 5,
  }

  const handlePageChange = (page: number) => {
    setPaginationData({...paginationData, pageNumber: page});
  };

  useEffect(()=>{
    //when Search, Filters, Column Sort, Page Number values change, refetch mechanics using those new params
    getMechanics(debouncedSearch, filterData, selectedSortColumn, paginationData)
    .then(data => {
      if(data && data.mechanics){
        setMechanicsData(data.mechanics);
      } else {
        setMechanicsData([]);
      };
      if(data && data.count) setPaginationData({...paginationData, totalCount: data.count});
    });

  },[debouncedSearch, filterData, selectedSortColumn, paginationData.pageNumber]);

  useEffect(()=> {
    //if current page number is higher than maximum possible, and there is data, reset pageNumber to 0
    if(paginationData && paginationData.totalCount){
      !mechanicsData.length && setPaginationData({...paginationData, pageNumber: 0});
    };
  },[paginationData.totalCount]);

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${searchValue}&filterValues=${JSON.stringify(filterData)}&selectedSortColumn=${JSON.stringify(selectedSortColumn)}&paginationData=${JSON.stringify(paginationData)}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data && data.mechanics && data.count) {
        setMechanicsData(data.mechanics)
      } else {
        setMechanicsData([])
      }
    })
    .catch(err => {
      console.error(err);
    });

  },[])

  const handleClickOutside = (e: any) => {
    if(statusFilterRef.current && !statusFilterRef.current.contains(e.target)){
      setStatusFilter(false)

    }
  }

  const handleMechanicStatusOptionsClick = (option: string) => {
    const value = mechanicsStatusOptions[option]
    setFilterValues({...filterValues, mechanic_status_value: value})
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="text-white w-full min-w-fit flex justify-center p-8">
      <div className=" flex flex-col ">
        <section className="w-full">
          <section className="w-full">
            <button className="relative text-sm text-gray-400 bg-jet-dark rounded-sm  bg-opacity-25 p-1"
            onClick={()=> setStatusFilter(!statusFilter)} >
              <p>Status</p>
              {
              statusFilter &&
              <div className="absolute top-full left-0 bg-jet-dark mt-1 p-2 rounded-sm" ref={statusFilterRef}>
                {
                Object.keys(mechanicsStatusOptions).map((option, index) => (
                  <button key={index} className=" hover:bg-gray-700 w-full p-1" 
                  onClick={()=> handleMechanicStatusOptionsClick(option)}
                  >{option}</button>
                  
                ))
                }
               
              </div>
              }
            </button>
            <input className="text-white bg-black bg-opacity-10 p-1 outline-none caret-white" 
            type="text" value={searchValue} placeholder="Search..." onChange={(e)=> setSearchValue(e.target.value)}/>
          </section>
          
          
        </section>
        <section className="overflow-x-auto">
          <MechanicsTable mechanicsData={mechanicsData} selectedSortColumnContext={{selectedSortColumn, setSelectedSortColumn}}/>
        </section>
        
      </div>
    </div>
  )
}

export default Mechanics;