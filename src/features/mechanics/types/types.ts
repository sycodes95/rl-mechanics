
export type MechanicData = {
  mech_id?: number;
  mech_type?: string;
  mech_name?: string;
  mech_description?: string; 
  mech_difficulty?: number;
  mech_importance?: number;
  mech_created_at?: string;
  mech_yt_url_controller: string[];
  mech_yt_url_kbm: string[];
  mech_url?: string;
  mech_gif?: File | string;
  mech_training_packs: string[];
  mech_gif_url?: string;
  [key: string] : any;
}  





