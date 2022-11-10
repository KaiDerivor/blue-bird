import { AppStateType } from "./store";

export const getIsInit=(state:AppStateType)=>{
   return state.app.isInit;
}