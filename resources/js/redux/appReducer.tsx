import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { api } from "../api/api"
import { errorStringHandler } from "../modules/utils/errorStringHandler"
import { AppStateType, InferActionsTypes } from "./store"

export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export type ACTION_OF_CRUD = typeof CREATE | typeof UPDATE | typeof DELETE

const TOGGLE_THEME_MODE = 'app/TOGGLE_THEME_MODE'
const ON_TOGGLE_FETCHING = 'app/ON_TOGGLE_FETCHING'
const OFF_TOGGLE_FETCHING = 'app/OFF_TOGGLE_FETCHING'
const INIT = 'app/INIT'
const CANSEL_INIT = 'CANSEL_INIT'
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
   chart: JSON.stringify({}),
}
type StateType = typeof initialState;
const appReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            isInit: true,
            isSetData: true,
            ...action.data,
         }
      }
      case CANSEL_INIT: {
         return {
            ...state,
            isInit: false
         }
      }
      case TOGGLE_THEME_MODE: {
         localStorage.appThemeMode = JSON.stringify(!state.isDarkMode);
         return {
            ...state,
            isDarkMode: !state.isDarkMode
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
      case SET_ERROR_MESSAGE: {
         return {
            ...state,
            errorText: action.errorText
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
            isInit: false,
            isSetData: false
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
   toggleFetchingOn: () => { return { type: ON_TOGGLE_FETCHING } as const },
   toggleFetchingOff: () => { return { type: OFF_TOGGLE_FETCHING } as const },
   init: (data: any) => { return { type: INIT, data } as const },
   canselInit: () => { return { type: CANSEL_INIT } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   logout: () => { return { type: LOGOUT } as const },
   setTheme: (appTheme: AppThemesType) => { return { type: SET_THEME, appTheme } as const },
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const loginThunk = (formData: FormDataLogType): ThunksTypes => {
   return async (dispatch) => {
      api.login(formData)?.then(res => {
         if (typeof res === 'string') {
            let msg = errorStringHandler(res)
            dispatch(appActions.setErrorText(msg))
         } else {
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
         typeof res === 'string'
            ? dispatch(appActions.setErrorText(errorStringHandler(res)))
            : dispatch(appActions.logout())

      })
   }
}
export const registerThunk = (formData: FormDataRegType): ThunksTypes => {
   return async (dispatch) => {
      api.register(formData)?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(appActions.setErrorText(errorStringHandler(res)))
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
         if (!localStorage?.access_token) {
            dispatch(appActions.canselInit())
            // dispatch(appActions.setErrorText('Authorize please'))
            return
         }
         typeof res === 'string'
            ? dispatch(appActions.setErrorText(errorStringHandler(res)))
            : dispatch(appActions.init(res))
      })
   }
}
export const updateMe = (me: FormDataMeUpdateType, isShowMessage = false): ThunksTypes => {
   return async (dispatch) => {
      api.meUpdate(me)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(errorStringHandler(res)))
            return;
         }
         isShowMessage && dispatch(appActions.setErrorText(errorStringHandler('Updated')))
         dispatch(appActions.init(res))
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
   name?: string
   email?: string
   password?: string
   likedTasks?: Array<number>
   chart?: string
}
export type AppThemesType = 'RED' | 'GREEN' | 'YELLOW' | 'PURPLE';