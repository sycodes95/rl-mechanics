
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

  const [addMechanicIsOpen, setAddMechanicIsOpen] = useState(false)

  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([])
  
  const [searchValue, setSearchValue] = useState<string>("")

  const debouncedSearch = useDebounce(searchValue, 300)
  
  const [filterData, setFilterData] = useState<FilterData | null>(null)

  const [selectedSortColumn, setSelectedSortColumn] = useState<SelectedSortColumn>({
    column: null,
    value: false
  });

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 1,
    pageSize: 2,
  })

  const handlePageChange = (page: number) => {
    console.log(page);
  }

  useEffect(()=>{
    console.log(selectedSortColumn);
  },[selectedSortColumn]) 

  useEffect(()=>{
    //get mechanics when component renders, and when debouncedsearch value changes or filterdata is submitted / applied
    getMechanics(debouncedSearch, filterData, selectedSortColumn).then((mechanics) => setMechanicsData(mechanics))
  },[debouncedSearch, filterData, selectedSortColumn]) 

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

        <section>
          <ReactPaginate
          className="flex"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(page)=> handlePageChange(page.selected)}
          pageRangeDisplayed={5}
          pageCount={10}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          />
        </section>

        
      </div>
    </div>
  )
}

export default withAuthAdmin(Admin);