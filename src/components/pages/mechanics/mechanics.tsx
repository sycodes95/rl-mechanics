import { useEffect, useRef, useState } from "react";

import MechanicsTable from "./mechanicsTable";
import "../../../styles/mechanics.css";
import useDebounce from "../../hooks/useDebounce";
import {
  MechanicData,
  MechanicsDifficultyOptions,
  MechanicsStatusOptions,
} from "./types";
import MechanicsFilters from "./mechanicsFilters";
import getUserFromToken from "../../utils/getUserFromToken";
import AddMechanic from "./addEditMechanic";

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../../redux/slices/userSlice';
import { setAddMechanicIsOpen, setEditMechanicIsOpen} from '../../../redux/slices/modalSlice';
import { RootState } from "../../../redux/store";
import { clearMechanicsData, setMechanicsData } from "../../../redux/slices/mechanicSlice";
// import { RootState } from "../../../redux/store";

export type PaginationData = {
  pageNumber: number;
  pageSize: number;
  totalCount: null | number;
}

function Mechanics() {
  const dispatch = useDispatch();

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { addMechanicIsOpen, editMechanicIsOpen } = useSelector((state: RootState) => state.modalSlice)

  const { filterValues, searchValue, sortColumn } = useSelector((state: RootState) => state.filterSlice)

  const { mechanicsData } = useSelector((state: RootState) => state.mechanicSlice)

  const debouncedSearch = useDebounce(searchValue, 300);
  
  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 0,
    pageSize: 50,
    totalCount: null,
  });

  const handlePageChange = (page: number) => {
    setPaginationData({ ...paginationData, pageNumber: page });
  };

  useEffect(() => {
    console.log(filterValues);
    fetch(
      `${
        import.meta.env.VITE_API_HOST_URL
      }/mechanics-get?searchValue=${debouncedSearch}&filterValues=${JSON.stringify(
        filterValues
      )}&sortColumn=${JSON.stringify(
        sortColumn
      )}&paginationData=${JSON.stringify(paginationData)}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.mechanics && data.count) {
          dispatch(setMechanicsData(data.mechanics));
        } else {
          dispatch(clearMechanicsData());
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [
    debouncedSearch,
    filterValues,
    sortColumn,
    paginationData.pageNumber,
  ]);

  useEffect(() => {
    //if current page number is higher than maximum possible, and there is data, reset pageNumber to 0
    if (paginationData && paginationData.totalCount) {
      !mechanicsData.length &&
        setPaginationData({ ...paginationData, pageNumber: 0 });
    }
  }, [paginationData.totalCount]);

  

  useEffect(() => {
    getUserFromToken()?.then((user_details) => {
      user_details && dispatch(setUserDetails(user_details));
    });
  }, []);

  return (
    <div className="flex justify-center flex-1 text-white">
      <div className="flex flex-col w-full gap-4 max-w-fit">
        <section className="flex justify-between">
          <div className="text-xl font-bold">MECHANICS LIST</div>
            {
            user_details && user_details.user_is_admin && 
            <button
              className="p-2 text-xs text-black transition-colors bg-yellow-400 rounded-sm hover:bg-yellow-500"
              onClick={() => dispatch(setAddMechanicIsOpen(true))}>
            
              <p>ADD MECHANIC</p>
            </button>
            }

            {addMechanicIsOpen && (
            <AddMechanic/>
            )}
        </section>

        <section className="flex">
          <MechanicsFilters/>
        </section>

        <section className="flex overflow-auto">
          <MechanicsTable/>
        </section>
      </div>
    </div>
  );
}

export default Mechanics;
