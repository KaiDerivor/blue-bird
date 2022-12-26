import { AppStateType } from "./store";

export const getIsInit = (state: AppStateType) => {
   return state.app.isInit;
}
export const getIsFetching = (state: AppStateType) => {
   return state.app.isFetching || state.category.isFetching || state.event.isFetching 
   || state.task.isFetching || state.user.isFetching || state.theme.isFetching 
   || state.rule.isFetching
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
   return state.category.listCats
}
export const getTags = (state: AppStateType) => {
   return state.tag.listTags
}
export const getTasks = (state: AppStateType) => {
   return state.task.listTasks
}
export const getUsers = (state: AppStateType) => {
   return state.user.listUsers
}
export const getTest = (state: AppStateType) => {
   return state.task.test
}
export const getTaskFilter = (state: AppStateType) => {
   return [state.task.filterCategory, state.task.filterTag]
}
export const getTableOfResult = (state: AppStateType) => {
   return state.task.result;
}
export const getResultTables = (state: AppStateType) => {
   return state.task.results
}
export const getLikedTasks = (state: AppStateType) => {
   return state.app.likedTasks;
}
export const getLikedCategories = (state: AppStateType) => {
   return state.app.likedCategories
}
export const getListEvents = (state: AppStateType) => {
   return state.event.listEvents
}
export const getAppTheme = (state: AppStateType) => {
   return state.app.appTheme
}
export const getChapterInfo = (state: AppStateType) => {
   return JSON.parse(state.app.chart)
}
export const getCategoryTagList = (state: AppStateType) => {
   return state.category.listCategoryTags;
}
export const getSavedTasks = (state: AppStateType) => {
   return state.task.savedTasks
}
export const getThemesList = (state: AppStateType) => {
   return state.theme.listThemes
}
export const getRulesList = (state: AppStateType) => {
   return state.rule.listRules
}