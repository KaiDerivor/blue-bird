import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import store, { AppStateType, InferActionsTypes } from "./store";
import { TagRecordType } from "./tagReducer";

const INIT = 'cat/INIT'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'
const UPDATE_CATEGORIES = 'cat/UPDATE_CATEGORIES'

export type CategoryRecordType = {
   id?: number,
   title: string,
   description?: string
   img?: any,
   textUrl: string,
   tags?: Array<TagRecordType|number>
}
const initialState = {
   listCats: [] as Array<CategoryRecordType>,
   errorText: ''
}
type StateType = typeof initialState;
const catReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            listCats: action.list
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
      case UPDATE_CATEGORIES: {
         let isSetted = false;
         for (let i = 0; i < state.listCats.length; i++) {
            if (state.listCats[i].id === action.category.id) {
               state.listCats.splice(i, 1, action.category);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listCats.push(action.category)
         }
         return {
            ...state,
            listCats: [...state.listCats]
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof catActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const catActions = {
   init: (list: Array<CategoryRecordType>) => { return { type: INIT, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateCategory: (category: CategoryRecordType) => { return { type: UPDATE_CATEGORIES, category } as const }

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
export const createCategory = (category: CategoryRecordType): ThunksTypes => {
   return async (dispatch) => {
      api.createCategory(category)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(catActions.updateCategory(res))
            }
         }
      })
   }
}
export const updateCategory = (id: number, category: CategoryRecordType): ThunksTypes => {
   return async (dispatch) => {
      if (!category?.img?.name) {
         delete category.img
      }
      api.updateCategory(id, category)?.then(res => {

         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(catActions.updateCategory(res))
         }

      })
   }
}
export const deleteCategory = (id: number): ThunksTypes => {
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



