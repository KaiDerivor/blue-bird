import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { StringDecoder } from "string_decoder";
import { api } from "../api/api";
import { AppStateType, InferActionsTypes } from "./store";

export const URL_STORAGE = '/storage/'


const TOGGLE_THEME_MODE = 'app/TOGGLE_THEME_MODE'
const TOGGLE_FETCHING = 'app/TOGGLE_FETCHING'
const INIT = 'app/INIT'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const LOGOUT = 'app/LOGOUT'
const SET_THEME = 'app/SET_THEME'

const initialState = {
   isFetching: false,
   isInit: localStorage.access_token ? true : false,
   isDarkMode: localStorage.appThemeMode ? JSON.parse(localStorage.appThemeMode) : true,
   errorText: '',
   isSetData: false,
   name: 'User',
   role: 'user',
   likedTasks: [] as Array<number>,
   likedCategories: [] as Array<number>,
   appTheme: localStorage.appTheme ? localStorage.appTheme : 'RED',
   chart: JSON.stringify({})
}
type StateType = typeof initialState;
const appReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            isInit: !!action.data,
            isSetData: true,
            ...action.data,
         }
      }
      case TOGGLE_THEME_MODE: {
         localStorage.appThemeMode = JSON.stringify(!state.isDarkMode);
         return {
            ...state,
            isDarkMode: !state.isDarkMode
         }
      }
      case TOGGLE_FETCHING: {
         return {
            ...state,
            isFetching: !state.isFetching
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
      case LOGOUT: {
         return {
            ...state,
            isInit: false
         }
      }
      case SET_THEME: {
         localStorage.appTheme = action.appTheme;
         return {
            ...state,
            appTheme: action.appTheme
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof appActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const appActions = {
   toggleThemeMod: () => { return { type: TOGGLE_THEME_MODE } as const },
   toggleFetching: () => { return { type: TOGGLE_FETCHING } as const },
   init: (data: any) => { return { type: INIT, data } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   logout: () => { return { type: LOGOUT } as const },
   setTheme: (appTheme: AppThemesType) => { return { type: SET_THEME, appTheme } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const toggleThemeMode = (): ThunksTypes => {
   return async (dispatch) => {
   }
}

export const loginThunk = (formData: FormDataLogType): ThunksTypes => {
   return async (dispatch) => {
      api.login(formData)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            console.log(res)
            api.me().then(res => {
               dispatch(appActions.init(res))
            })
         }
      })
   }
}
export const logoutThunk = (): ThunksTypes => {
   return async (dispatch) => {
      api.logout()?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))

         } else {
            dispatch(appActions.logout())

         }
      })
   }
}
export const registerThunk = (formData: FormDataRegType): ThunksTypes => {
   return async (dispatch) => {
      api.register(formData)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            api.me().then(res => {

               dispatch(appActions.init(res))
            })
         }
      })
   }
}

export const setData = (): ThunksTypes => {
   return async (dispatch) => {
      api.me().then(res => {

         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
            return Promise.reject();
         }
         console.log(res)
      }).then(() => {
         if (localStorage.access_token)
            api.meInfo()?.then(res => {

               if (typeof res === 'string') {
                  dispatch(appActions.setErrorText(res))
               } else {
                  dispatch(appActions.init(res))
               }
            })
      })
   }
}
export const updateMe = (me: FormDataMeUpdateType): ThunksTypes => {
   return async (dispatch) => {
      api.meUpdate(me)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.init(res))
         }
      })
   }
}
export default appReducer;



export type FormDataLogType = {
   email: string
   password: string
}
export type FormDataRegType = {
   name: string,
   email: string,
   password: string
   password_confirmation: string
}
export type FormDataMeUpdateType = {
   name?: StringDecoder
   email?: string
   likedTasks?: Array<number>
   chart?: JSON
}
export type AppThemesType = 'RED' | 'GREEN' | 'YELLOW' | 'PURPLE';