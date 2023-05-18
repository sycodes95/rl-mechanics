import { useEffect, useRef, useState } from "react";

import getMechanics from "../../utils/getMechanics";
import {
  FilterData,
  PaginationData,
  SelectedSortColumn,
} from "../../types/mechanicsAdmin/types";
import MechanicsTable from "./mechanicsTable";
import "../../../styles/mechanics.css";
import useDebounce from "../../hooks/useDebounce";
import {
  FilterValues,
  Mechanic,
  MechanicsDifficultyOptions,
  MechanicsStatusOptions,
  User,
} from "./types";
import MechanicsFilters from "./mechanicsFilters";
import getUserFromToken from "../../utils/getUserFromToken";
import AddMechanic from "./addMechanic";

function Mechanics() {
  const [user, setUser] = useState<User>(null);

  const [addMechanicIsOpen, setAddMechanicIsOpen] = useState(false);

  const [mechanicsData, setMechanicsData] = useState<Mechanic[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce(searchValue, 300);

  const [selectedSortColumn, setSelectedSortColumn] =
    useState<SelectedSortColumn>({
      column: null,
      value: false,
    });

  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNumber: 0,
    pageSize: 50,
    totalCount: null,
  });

  const [filterValues, setFilterValues] = useState<FilterValues>({
    mechanic_status_value: "",
    mech_difficulty: "",
    mech_importance: "",
    mech_type: "",
    rating_difficulty: "",
    rating_importance: "",
  });

  const handlePageChange = (page: number) => {
    setPaginationData({ ...paginationData, pageNumber: page });
  };

  useEffect(() => {
    //when Search, Filters, Column Sort, Page Number values change, refetch mechanics using those new params
    // getMechanics(debouncedSearch, filterData, selectedSortColumn, paginationData)
    // .then(data => {
    //   if(data && data.mechanics){
    //     setMechanicsData(data.mechanics);
    //   } else {
    //     setMechanicsData([]);
    //   };
    //   if(data && data.count) setPaginationData({...paginationData, totalCount: data.count});
    // });
    fetch(
      `${
        import.meta.env.VITE_API_HOST_URL
      }/mechanics-get?searchValue=${debouncedSearch}&filterValues=${JSON.stringify(
        filterValues
      )}&selectedSortColumn=${JSON.stringify(
        selectedSortColumn
      )}&paginationData=${JSON.stringify(paginationData)}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.mechanics && data.count) {
          setMechanicsData(data.mechanics);
        } else {
          setMechanicsData([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [
    debouncedSearch,
    filterValues,
    selectedSortColumn,
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
    getUserFromToken()?.then((user) => {
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div className="flex justify-center w-full p-8 text-white min-w-fit">
      <div className="flex flex-col ">
        <section className="flex justify-between pt-4 pb-4 ">
          <div className="text-xl font-bold">MECHANICS LIST</div>
          {user && user.user_is_admin && (
            <button
              className="p-2 text-xs text-black transition-colors bg-yellow-400 rounded-sm hover:bg-yellow-500"
              onClick={() => setAddMechanicIsOpen(true)}
            >
              <p>ADD MECHANIC</p>
            </button>
          )}

          {addMechanicIsOpen && (
            <AddMechanic
              addMechanicIsOpenContext={{
                addMechanicIsOpen,
                setAddMechanicIsOpen,
              }}
            />
          )}
        </section>

        <section className="w-full">
          <MechanicsFilters
            searchValueContext={{ searchValue, setSearchValue }}
            filterValuesContext={{ filterValues, setFilterValues }}
            user={user}
          />
        </section>

        <section className="overflow-x-auto">
          <MechanicsTable
            mechanicsData={mechanicsData}
            selectedSortColumnContext={{
              selectedSortColumn,
              setSelectedSortColumn,
            }}
            user={user}
          />
        </section>
      </div>
    </div>
  );
}

export default Mechanics;
