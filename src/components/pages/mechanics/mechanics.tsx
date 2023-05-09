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
    fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${""}&filterValues=${JSON.stringify(null)}&selectedSortColumn=${JSON.stringify({ column: null, value: false})}&paginationData=${JSON.stringify({ pageNumber: 0, pageSize: 50, totalCount: null})}`)
    .then(res => res.json())
    .then(data => {
      setMechanicsData(data.mechanics)
      
    })
    .catch(err => {
      console.error(err);
    });
  },[])

  return (
    <div className="text-white w-full flex justify-center ">
      <div className="max-w-4xl w-full flex flex-col items-center">

      <section className="mt-44">
        <MechanicsTable mechanicsData={mechanicsData} selectedSortColumnContext={{selectedSortColumn, setSelectedSortColumn}}/>
      </section>
      {/* {
      mechanicsData.map(mechanic => (
        <div className="bg-black bg-opacity-30 w-full flex flex-col items-center">
          <div>{mechanic.mech_name}</div>
          <div>{mechanic.mech_url}</div>
          <div hidden dangerouslySetInnerHTML={{__html: mechanic.mech_yt_url_controller}}></div>
          
        </div>
      ))
      } */}
      </div>
    </div>
  )
}

export default Mechanics;