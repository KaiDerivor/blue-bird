import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import store, { AppStateType, InferActionsTypes } from "./store";

const INIT = 'INIT'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'

export type TagRecordType = {
   tag: string,
   id: string | number,
}
const initialState = {
   list: [] as Array<TagRecordType>,
   errorText: ''
}
type StateType = typeof initialState;
const tagReducer = (state = initialState, action: ActionsTypes): StateType => {
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

export type ActionsTypes = InferActionsTypes<typeof tagActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const tagActions = {
   init: (list: Array<TagRecordType>) => { return { type: INIT, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getTagsInit = (): ThunksTypes => {
   return async (dispatch) => {
      api.getTags()?.then(res => {
         if (typeof res === 'string'||res===undefined) {
            dispatch(appActions.setErrorText(res))
         } else {
            console.log(res)
            dispatch(tagActions.init(res))
         }
      })
   }
}
export const createTag = (tag: string): ThunksTypes => {
   return async (dispatch) => {
      api.createTag(tag)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(tagActions.init(res))
            }
         }
      })
   }
}
export const updateTag = (id: number|string, tag: string): ThunksTypes => {
   return async (dispatch) => {
      api.updateTag(id, tag)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(tagActions.init(res))
         }

      })
   }
}
export const deleteTag = (id: number|string): ThunksTypes => {
   return async (dispatch) => {
      api.deleteTag(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(tagActions.init(res))
         }

      })
   }
}


export default tagReducer;



