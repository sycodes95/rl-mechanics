import { useEffect, useRef, useState } from "react";

import getMechanics from "../../utils/getMechanics";
import { FilterData, Mechanic, PaginationData, SelectedSortColumn } from "../../types/mechanicsAdmin/types";
import MechanicsTable from "./mechanicsTable";
import '../../../styles/mechanics.css'
import useDebounce from "../../hooks/useDebounce";
import { FilterValues } from "../../types/mechanics/types";
import { MechanicsDifficultyOptions, MechanicsStatusOptions } from "./types";
import MechanicsFilters from "./mechanicsFilters";
import getUserFromToken from "../../utils/getUserFromToken";


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

  const [filterValues, setFilterValues] = useState<FilterValues>({
    mechanic_status_value: 0,
    mech_difficulty: 0,
    mech_importance: 0,
    rating_difficulty: 0,
    rating_importance: 0,
  })


  

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

  useEffect(()=> {
    getUserFromToken()?.then(user => user && setUserIsLoggedIn(true))
  },[])

  useEffect(()=> {
    console.log(userIsLoggedIn);
  },[userIsLoggedIn])

  

  return (
    <div className="text-white w-full min-w-fit flex justify-center p-8">
      <div className=" flex flex-col ">
        <section className="w-full">
          
          <MechanicsFilters 
          searchValueContext={{searchValue, setSearchValue}} 
          filterValuesContext={{filterValues, setFilterValues}}
          userIsLoggedIn={userIsLoggedIn}
          />
          
        </section>
        <section className="overflow-x-auto">
          <MechanicsTable mechanicsData={mechanicsData} selectedSortColumnContext={{selectedSortColumn, setSelectedSortColumn}}/>
        </section>
        
      </div>
    </div>
  )
}

export default Mechanics;