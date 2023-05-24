
export type MechanicsStatusOptions = {
  [key: string] : { value : number, color: string };
}

export type MechanicsDifficultyOptions = {
  [key: string] : { value : number, color: string };
}

export type MechanicsImportanceOptions = {
  [key: string] : { value : number, color: string };
}

export type MechanicsTypeOptions = {
  [key: string] : { value : number };
}

export type DifficultyColors = {
  [key: string] : string
}

export type ImportanceColors = {
  [key: string] : string
}

export type MechanicData = {
  mech_id?: number;
  mech_type?: string;
  mech_name?: string;
  mech_description?: string;
  mech_difficulty?: string;
  mech_importance?: string;
  mech_created_at?: string;
  mech_yt_url_controller?: string;
  mech_yt_url_kbm?: string;
  mech_url?: string;
}

//props

export type AddMechanicProps = {
  addMechanicIsOpenContext: {
    addMechanicIsOpen: boolean;
    setAddMechanicIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}


