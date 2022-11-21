import { AppStateType } from "./store";

export const getIsInit = (state: AppStateType) => {
   return state.app.isInit;
}
export const getIsDarkMode = (state: AppStateType) => {
   return state.app.isDarkMode;
}
export const getErrorText = (state: AppStateType) => {
   return state.app.errorText
}
export const getIsSetData = (state: AppStateType) => {
   return state.app.isSetData
}