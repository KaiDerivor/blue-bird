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
export const getUserName = (state: AppStateType) => {
   return state.app.name;
}
export const getUserRole = (state: AppStateType) => {
   return state.app.role;
}
export const getCategories = (state: AppStateType) => {
   return state.category.list
}
export const getTags = (state: AppStateType) => {
   return state.tag.list
}
export const getTask = (state: AppStateType) => {
   return state.task.list
}