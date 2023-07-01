
import "./mechanics.css";
import { useEffect, useState } from "react";

import MechanicsTable from "../../features/mechanics/components/mechanicsTable";
import useDebounce from "../../hooks/useDebounce";

import MechanicsFilters from "../../features/mechanics/components/mechanicsFilters";
import getUserFromToken from "../../services/getUserFromToken";

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../slices/userSlice';

import { 
  setAddMechanicIsOpen, 
  setEditMechanicIsOpen, 
  clearMechanicsData, 
  setMechanicsData, 
  setMechanicsStatuses 
} from '../../features/mechanics/slice/mechanicsSlice';

import { RootState } from "../../store";
import octane from "../../assets/images/octane.webp"
import AddEditMechanic from "../../features/mechanics/components/addEditMechanic";
import { getMechanics } from "../../features/mechanics/services/getMechanics";
import ReactPaginate from "react-paginate";


// import { RootState } from "../../../redux/store";

export type PaginationData = {
  pageNumber: number;
  pageSize: number;
  totalCount: null | number;
}

type MechanicStatus = {
  mech_id: number;
  mechanic_status_id: number;
  mechanic_status_value: number;
  user_id: number;

}

function Mechanics() {
  const dispatch = useDispatch();

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { 
    addMechanicIsOpen, 
    editMechanicIsOpen,
    filterValues,
    searchValue,
    sortColumn,
    mechanicsData,
    mechanicStatuses
  } = useSelector((state: RootState) => state.mechanicsSlice)

  const debouncedSearch = useDebounce(searchValue, 300);
  
  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 0,
    pageSize: 50,
    totalCount: null,
  });

  const [paginationShowing, setPaginationShowing] = useState({ a: 0, b: 0 })

  const handlePageChange = (page: number) => {
    setPaginationData({ ...paginationData, pageNumber: page });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMechanics(
          debouncedSearch,
          filterValues,
          sortColumn,
          paginationData,
          user_details
        );

        data && data.mechanics && data.mechanics.length
        ? dispatch(setMechanicsData(data.mechanics)) 
        : dispatch(clearMechanicsData());
        
        data && data.count  
        ? setPaginationData({...paginationData, totalCount: data.count}) 
        : setPaginationData({...paginationData, totalCount: null});
        
      } catch (err) {
        console.error(err);
        dispatch(clearMechanicsData());
      }
    };

    fetchData();
  }, [debouncedSearch, filterValues, sortColumn, paginationData.pageNumber, mechanicStatuses]);

  useEffect(()=>{
    //if user is logged in and we have their details, use it to fetch user's mechanic statuses
    if(user_details){

      fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-status-get?user_id=${user_details.user_id}`)
      .then(res => res.json())
      .then(data => {
        let mech_id_to_status_pair : { [key: number] : any } = {}
        data.mechanics_statuses.forEach((mech: MechanicStatus) => {
          mech_id_to_status_pair[mech.mech_id] = mech.mechanic_status_value
        })
        dispatch(setMechanicsStatuses(mech_id_to_status_pair))
      })
    }
  },[user_details])

  useEffect(() => {
    //if current page number is higher than maximum possible, and there is data, reset pageNumber to 0
    if (paginationData && paginationData.totalCount) {
      !mechanicsData.length &&
      setPaginationData({ ...paginationData, pageNumber: 0 });
    }
  }, [paginationData.totalCount]);

  useEffect(() => {
    //if current page number is higher than maximum possible, and there is data, reset pageNumber to 0
    let a = (paginationData.pageNumber * paginationData.pageSize) + 1;
    let b = (paginationData.pageNumber * paginationData.pageSize) + paginationData.pageSize;
    if(paginationData.totalCount && b > paginationData.totalCount) b = paginationData.totalCount;
    setPaginationShowing({a, b})
  }, [paginationData]);

  useEffect(() => {
    getUserFromToken()?.then((user_details) => {
      user_details && dispatch(setUserDetails(user_details));
    });
  }, []);

  return (
    <div className="flex justify-center w-full text-white"> 
      <div className="flex flex-col w-full gap-4 max-w-fit">
        <section className="relative flex overflow-hidden rounded-md h-44">
          <img className="absolute -translate-y-1/2 opacity-50 pointer-events-none top-1/2" src={octane}/>
        </section>
        <section className="flex justify-between">
          <div className="text-xl font-bold ">ROCKET LEAGUE MECHANICS LIST</div>
            {
            user_details && user_details.user_is_admin && 
            <button
              className="p-2 text-xs text-black transition-colors bg-green-400 rounded-sm hover:bg-green-500"
              onClick={() => {
                dispatch(setAddMechanicIsOpen(true))
              }}>
            
              <p>ADD MECHANIC</p>
            </button>
            }

            {
            addMechanicIsOpen && (
            <AddEditMechanic/>
            )}
        </section>
        <section className="flex">
          <MechanicsFilters/>
        </section>

        <section className="flex pt-4 pl-4 pr-4 overflow-x-auto overflow-y-hidden border-2 border-black border-opacity-25 rounded-md shadow-lg bg-jet-dark">
          <MechanicsTable/>
        </section>

        <section className="flex justify-between w-full">
          <div className="flex items-center">
            <p className="text-md font-rajdhani">Showing {paginationShowing.a} to {paginationShowing.b} of {paginationData.totalCount}</p>
          </div>
          {
          paginationData.totalCount &&
          <ReactPaginate
          className="flex p-1 rounded-md text-md gap-x-4"
          breakLabel="..."
          nextLabel="NEXT"
          onPageChange={(page)=> handlePageChange(page.selected)}
          pageRangeDisplayed={5}
          activeClassName="text-white"
          previousClassName={`text-sm flex items-center hover:text-green-400 transition-all
          ${paginationData.pageNumber === 0 && `text-gray-600 pointer-events-none`}`}
          nextClassName={`text-sm flex items-center hover:text-green-400 transition-all
          ${(paginationData.pageNumber + 1) * paginationData.pageSize >= paginationData.totalCount && `text-gray-600 pointer-events-none`}`}
          pageCount={Math.ceil(paginationData.totalCount / paginationData.pageSize)}
          previousLabel="PREV"
          renderOnZeroPageCount={null}
          />
          }
        </section>
      </div>
    </div>
  );
}

export default Mechanics;
