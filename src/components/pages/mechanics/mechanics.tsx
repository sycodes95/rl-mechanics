import { useEffect, useState } from "react";

import getMechanics from "../../utils/getMechanics";
import { FilterData, Mechanic, PaginationData, SelectedSortColumn } from "../../types/mechanicsAdmin/types";
import MechanicsTable from "./mechanicsTable";
import '../../../styles/mechanics.css'
import useDebounce from "../../hooks/useDebounce";
function Mechanics() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([])

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue, 300);

  const [filterData, setFilterData] = useState<FilterData | null>(null);

  const [selectedSortColumn, setSelectedSortColumn] = useState<SelectedSortColumn>({
    column: null,
    value: false
  });

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 0,
    pageSize: 50,
    totalCount: null
  });

  const mechanicsStatusOptions = {
    'consistent': 2,
    'inconsistent': 1,
    'notlearned': 0,
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

  useEffect(()=>{
    console.log(searchValue);
  },[searchValue])

  return (
    <div className="text-white w-full min-w-fit flex justify-center p-8">
      <div className=" flex flex-col ">
        <section className="w-full">
          <section className="w-full">
            <input className="text-white bg-black bg-opacity-10 p-1 outline-none caret-white" 
            type="text" value={searchValue} placeholder="Search..." onChange={(e)=> setSearchValue(e.target.value)}/>
          </section>
          <section className="w-full">
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