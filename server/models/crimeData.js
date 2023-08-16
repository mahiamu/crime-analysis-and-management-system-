import mongoose from "mongoose";

const CrimeDataSchema = new mongoose.Schema(
  {
    
    dr_no: String, 
    date_rptd:String,
    date_occ:String,
    time_occ: String,
    area:String,
    area_name:String,
    rpt_dist_no:String,
    part_1_2: String,    
    crm_cd: String,
    crm_cd_desc: String,
    mocodes: String,
    vict_age: String,
    vict_sex: String,
    vict_descent: String,
    premis_cd: String,
    premis_desc: String,
    weapon_used_cd: String,
    weapon_desc: String,
    status: String,
    status_desc: String,
    crm_cd_1: String,
    crm_cd_2: String,
    crm_cd_3: String,
    crm_cd_4: String,
    location: String,
    crossStreet: String,
    lat: Number,
    lon: Number    
  },
  { timestamps: true }
);

const CrimeData = mongoose.model("CrimeData", CrimeDataSchema);
export default CrimeData;