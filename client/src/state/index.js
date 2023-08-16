import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode: "dark",
    userId: "63c6734ed410c98e961ede31",
    currentUser: null,
    openLogin: false,
    loading: false,
    alert: { open: false, severity: 'info', message: '' },
    profile: { open: false, file: null, photoURL: '' },
    images: [],
    users: [],
    crimeData:[],
    crime:null,
    details: { date_rptd: '', date_occ: '', time_occ: '', area:'',area_name:'',crm_cd:'',crm_cd_desc:'',vict_age:'',vict_sex:'',premis_desc:'',weapon_desc:'',status_desc:'',crossStreet:'',lat:'',lon:''},
    updatedCrimeData: null   
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      isOpenLogin: (state)=>{
        state.openLogin = state.openLogin = true;
      },
      isCloseLogin: (state)=>{
        state.openLogin = state.openLogin = false;
      }, 
      isLoading: (state)=>{
        state.loading = state.loading = true;
      },
      notLoading: (state)=>{
        state.loading = state.loading = false;
      },
      setAlert: (state, action) => {
        state.alert = state.alert =action.payload
      },
      updateprofile: (state, action) => {
        state.profile = state.profile =action.payload
      },
      updateUser: (state, action) => {
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        state.currentUser = state.currentUser =action.payload
      },
      updateUsers: (state, action) => {
        state.users = state.users =action.payload
      },
      updatecrime: (state, action) => {
        state.crime = state.crime =action.payload
      },
      updateCrimeData: (state, action) => {
        return { ...state, crimeData: action.payload };
      },
      updateDetails:(state, action) => {
        return { ...state, details: { ...state.details, ...action.payload } };
     },
     deleteCrimeData:(state, action) => {
      return { ...state, crimeData: state.crimeData.filter(Data=>Data._id !==action.payload) };
   },
   UpdateUpdeatedCrimeData:(state, action) => {
    return { ...state, updatedCrimeData: action.payload  };
 },
     resetDetails:(state, action) => {
      return {
        ...state,
           details: { date_rptd: '', date_occ: '', time_occ: '', area:'',area_name:'',crm_cd:'',crm_cd_desc:'',vict_age:'',vict_sex:'',premis_desc:'',weapon_desc:'',status_desc:'',crossStreet:'',lat:'',lon:'' },
           updatedCrimeData: null,
     }
      
    }},
  });

export const { setMode,updatecrime, isOpenLogin, isCloseLogin, isLoading,notLoading, setAlert, updateprofile, updateUser, updateUsers, updateCrimeData,updateDetails,resetDetails,deleteCrimeData,UpdateUpdeatedCrimeData } = globalSlice.actions;

export default globalSlice.reducer;
 