import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import store, { AppStateType, InferActionsTypes } from "./store";

const INIT = 'INIT'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'

export type CategoryRecord = {
   category: string,
   id: string | number,
}
const initialState = {
   list: [] as Array<CategoryRecord>,
   errorText: ''
}
type StateType = typeof initialState;
const catReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            list: action.list
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
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof catActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const catActions = {
   init: (list: Array<CategoryRecord>) => { return { type: INIT, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getCategoriesInit = (): ThunksTypes => {
   return async (dispatch) => {
      api.getCategories()?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(catActions.init(res))
         }
      })
   }
}
export const createCategory = (category: string): ThunksTypes => {
   return async (dispatch) => {
      api.createCategory(category)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(catActions.init(res))
            }
         }
      })
   }
}
export const updateCategory = (id: number|string, category: string): ThunksTypes => {
   return async (dispatch) => {
      api.updateCategory(id, category)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(catActions.init(res))
         }

      })
   }
}
export const deleteCategory = (id: number|string): ThunksTypes => {
   return async (dispatch) => {
      api.deleteCategory(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(catActions.init(res))
         }

      })
   }
}


export default catReducer;



