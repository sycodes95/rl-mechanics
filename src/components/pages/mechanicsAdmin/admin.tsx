
import { useEffect, useState } from "react";

import AddMechanic from "./addMechanic";

import getMechanics from "../../utils/getMechanics";

import withAuthAdmin from "../../hocs/withAuthAdmin";
import useDebounce from "../../hooks/useDebounce";

import '../../../styles/admin.css'

import AdminMechTable from "./adminMechTable";
import AdminMechFilters from "./adminMechFilters";
import AdminMechSearch from "./adminMechSearch";

import ReactPaginate from "react-paginate";

import { 
  FilterData, 
  MechTableColumns, 
  Mechanic, 
  ColumnSortOrder, 
  SelectedSortColumn,
  PaginationData
} from "../../types/mechanicsAdmin/types";


function Admin () {

  const [addMechanicIsOpen, setAddMechanicIsOpen] = useState(false);

  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([]);
  
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue, 300);
  
  const [filterData, setFilterData] = useState<FilterData | null>(null);

  const [selectedSortColumn, setSelectedSortColumn] = useState<SelectedSortColumn>({
    column: null,
    value: false
  });

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 0,
    pageSize: 2,
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

  

  return(
    <div className="flex justify-center text-white w-full h-full pt-12 pb-12">
      <div className="flex flex-col gap-4 w-full max-w-7xl  rounded-md p-4">

        <section className="flex flex-col sm:flex-row justify-between gap-4 z-50"> 

          <div className="flex items-center">
            <p className="flex items-center text-4xl font-bold whitespace-nowrap ">ADMIN </p>
          </div>
          
          <div >
            <button className="p-4 w-full sm:w-fit bg-orange-500 hover:bg-orange-400 text-sm font-bold 
            rounded-md whitespace-nowrap transition-all" onClick={()=> setAddMechanicIsOpen(true)}>ADD MECHANIC</button>

            
          </div>
          
        </section>

        <section className="z-50">
          {
          addMechanicIsOpen &&
          <AddMechanic addMechanicIsOpenContext={{addMechanicIsOpen, setAddMechanicIsOpen}}/>
          }
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 p-4 rounded-md min-w-fit">

          <AdminMechSearch searchValueContext={{searchValue, setSearchValue}}/>

          <AdminMechFilters filterDataContext={{filterData, setFilterData}}/>
          
        </section>

        <section className="flex flex-col gap-4 bg-black bg-opacity-20 rounded-md overflow-auto">

          {
          mechanicsData &&
          <AdminMechTable 
          mechanicsDataContext={{mechanicsData, setMechanicsData}} 
          selectedSortColumnContext={{selectedSortColumn, setSelectedSortColumn}}
          />
          
          }
          
        </section>

        <section className="flex w-full justify-end">
          {
          paginationData.totalCount &&
          <ReactPaginate
          className="flex gap-x-4 p-1 rounded-md"
          breakLabel="..."
          nextLabel="NEXT"
          onPageChange={(page)=> handlePageChange(page.selected)}
          pageRangeDisplayed={5}
          activeClassName="text-blue-300"
          previousClassName={`text-xs flex items-center hover:text-slate-400 transition-all
          ${paginationData.pageNumber === 0 && `text-slate-400 pointer-events-none`}`}
          nextClassName={`text-xs flex items-center hover:text-slate-400 transition-all
          ${(paginationData.pageNumber + 1) * paginationData.pageSize >= paginationData.totalCount && `text-slate-400 pointer-events-none`}`}
          pageCount={Math.ceil(paginationData.totalCount / paginationData.pageSize)}
          previousLabel="PREV"
          renderOnZeroPageCount={null}
          />
          }
        </section>

        
      </div>
    </div>
  )
}

export default withAuthAdmin(Admin);