export type FilterData = {
  mech_difficulty: { firstInput: number; secondInput: number };
  mech_importance: { firstInput: number; secondInput: number };
  mech_created_at: { firstInput: string; secondInput: string };
  rating_difficulty: { firstInput: number; secondInput: number };
  rating_importance: { firstInput: number; secondInput: number };
}

export type MechTableColumns = {
  mech_id: string;
  mech_name: string;
  mech_description: string;
  mech_difficulty: string;
  mech_importance: string;
}

export type Mechanic = {
  mech_id: number;
  mech_name: string
  mech_description: string;
  mech_difficulty: number;
  mech_importance: number;
  mech_created_at: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;

}

export type ColumnSortOrder = {
  [key: string]: number;
}

export type IsDeleteOpen = {
  open: boolean;
  mech_id: null | number;
}

export type IsEditMechanicOpen = {
  open: boolean;
  mech_id: null | number;
}

export type SelectedSortColumn = {
  column: null | string;
  value: boolean;
}

export type PaginationData = {
  pageNumber: number;
  pageSize: number;
}
