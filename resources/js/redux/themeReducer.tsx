
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";


const INIT_THEMES = 'theme/INIT_THEMES'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const UPDATE_THEME = 'theme/UPDATE_THEME'
const ON_TOGGLE_FETCHING = 'theme/ON_TOGGLE_FETCHING'
const OFF_TOGGLE_FETCHING = 'theme/OFF_TOGGLE_FETCHING'

export type ThemeRecordType = {
   title?: string
   description?: string
   slug?: string
   categoryId?: number
   numberOfTheme?:number
}
export type ThemeType = {
   id?: number,
   title: string,
   description: string
   slug: string
   categoryId: number
   numberOfTheme:number
}

const initialState = {
   isFetching:false,
   listThemes: [] as Array<ThemeType>,
   errorText: ''
}
type StateType = typeof initialState;
const themeReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT_THEMES: {
         return {
            ...state,
            listThemes: action.list
         }
      }
      case SET_ERROR_MESSAGE: {
         let errorText = action.errorText;
         if (errorText === 'Unauthorized') {
            errorText = 'Wrong password or email';
         }
         return {
            ...state,
            errorText
         }
      }
      case ERASE_ERROR: {
         return {
            ...state,
            errorText: ''
         }
      }
      case UPDATE_THEME: {
         let isSetted = false;
         for (let i = 0; i < state.listThemes.length; i++) {
            if (state.listThemes[i].id === action.tag.id) {
               state.listThemes.splice(i, 1, action.tag);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listThemes.push(action.tag)
         }
         return {
            ...state,
            listThemes: [...state.listThemes]
         }
      }
      case ON_TOGGLE_FETCHING: {
         return {
            ...state,
            isFetching: true
         }
      }
      case OFF_TOGGLE_FETCHING: {
         return {
            ...state,
            isFetching: false
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof themeActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const themeActions = {
   init: (list: Array<ThemeType>) => { return { type: INIT_THEMES, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTag: (tag: ThemeType) => { return { type: UPDATE_THEME, tag } as const },
   toggleFetchingOn: () => { return { type: ON_TOGGLE_FETCHING } as const },
   toggleFetchingOff: () => { return { type: OFF_TOGGLE_FETCHING } as const },
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getThemesInit = (categoryId=''): ThunksTypes => {
   return async (dispatch) => {
      dispatch(themeActions.toggleFetchingOn())
      api.getThemes(categoryId)?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(themeActions.setErrorText(res))
         } else {
            dispatch(themeActions.init(res))
         }
      }).finally(()=>{
         dispatch(themeActions.toggleFetchingOff())
      })
   }
}
export const createTheme = (theme: ThemeRecordType): ThunksTypes => {
   return async (dispatch) => {

      dispatch(themeActions.toggleFetchingOn())

      api.createTheme(theme)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(themeActions.updateTag(res))
            }
         }
      }).finally(()=>{
         dispatch(themeActions.toggleFetchingOff())
      })
   }
}
export const updateTheme = (id: number, theme: ThemeRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(themeActions.toggleFetchingOn())
      api.updateTheme(id, theme)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(themeActions.updateTag(res))
         }

      }).finally(()=>{
         dispatch(themeActions.toggleFetchingOff())
      })
   }
}
export const deleteTheme = (id: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(themeActions.toggleFetchingOn())

      api.deleteTheme(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(themeActions.init(res))
         }

      }).finally(()=>{
         dispatch(themeActions.toggleFetchingOff())
      })
   }
}


export default themeReducer;



