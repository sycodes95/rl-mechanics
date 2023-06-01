
import "./mechanics.css";
import { useEffect, useRef, useState } from "react";

import MechanicsTable from "../../features/mechanics/components/mechanicsTable";
import useDebounce from "../../hooks/useDebounce";

import MechanicsFilters from "../../features/mechanics/components/mechanicsFilters";
import getUserFromToken from "../../services/getUserFromToken";

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../slices/userSlice';
import { setAddMechanicIsOpen, setEditMechanicIsOpen} from '../../features/mechanics/slice/mechanicsSlice';
import { RootState } from "../../store";
import { clearMechanicsData, setMechanicsData } from "../../features/mechanics/slice/mechanicsSlice";
import octane from "../../assets/images/octane.webp"
import AddEditMechanic from "../../features/mechanics/components/addEditMechanic";
import { getMechanics } from "../../features/mechanics/services/getMechanics";
// import { RootState } from "../../../redux/store";

export type PaginationData = {
  pageNumber: number;
  pageSize: number;
  totalCount: null | number;
}

function Mechanics() {
  const dispatch = useDispatch();

  const { user_details } = useSelector((state: RootState) => state.userSlice)

  const { addMechanicIsOpen, editMechanicIsOpen } = useSelector((state: RootState) => state.mechanicsSlice)

  const { filterValues, searchValue, sortColumn } = useSelector((state: RootState) => state.mechanicsSlice)

  const { mechanicsData } = useSelector((state: RootState) => state.mechanicsSlice)

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
    const fetchData = async () => {
      try {
        const mechanicsData = await getMechanics(
          debouncedSearch,
          filterValues,
          sortColumn,
          paginationData
        );
        dispatch(setMechanicsData(mechanicsData));
      } catch (err) {
        console.error(err);
        dispatch(clearMechanicsData());
      }
    };

    fetchData();
  }, [debouncedSearch, filterValues, sortColumn, paginationData]);

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
      <div className="flex flex-col w-full max-w-4xl gap-4">
        <section className="relative flex overflow-hidden rounded-md h-44">
          <img className="absolute -translate-y-1/2 opacity-50 top-1/2" src={octane}/>
        </section>
        <section className="flex justify-between">
          <div className="text-xl font-bold">ROCKET LEAGUE MECHANICS LIST</div>
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

        <section className="flex overflow-auto">
          <MechanicsTable/>
        </section>
      </div>
    </div>
  );
}

export default Mechanics;
