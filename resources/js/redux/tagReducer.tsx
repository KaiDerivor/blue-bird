import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";

const INIT_TAGS = 'cat/INIT_TAGS'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'
const UPDATE_TAG = 'cat/UPDATE_TAG'
export type TagRecordType = {
   title: string,
   id: string | number,
   description?: string
   img?: string
}
const initialState = {
   listTags: [] as Array<TagRecordType>,
   errorText: ''
}
type StateType = typeof initialState;
const tagReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT_TAGS: {
         return {
            ...state,
            listTags: action.list
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
      case UPDATE_TAG: {
         let isSetted=false;
         for (let i = 0; i < state.listTags.length; i++) {
            if (state.listTags[i].id === action.tag.id) {
               state.listTags.splice(i, 1, action.tag);
               isSetted=true;
               break;
            }
         }
         if(!isSetted){
            state.listTags.push(action.tag)
         }
         return {
            ...state,
            listTags: [...state.listTags]
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof tagActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const tagActions = {
   init: (list: Array<TagRecordType>) => { return { type: INIT_TAGS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTag: (tag: TagRecordType) => { return { type: UPDATE_TAG, tag } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getTagsInit = (): ThunksTypes => {
   return async (dispatch) => {
      api.getTags()?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(tagActions.setErrorText(res))
         } else {
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
               dispatch(tagActions.updateTag(res))
            }
         }
      })
   }
}
export const updateTag = (id: number | string, tag: string): ThunksTypes => {
   return async (dispatch) => {
      api.updateTag(id, tag)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(tagActions.updateTag(res))
         }

      })
   }
}
export const deleteTag = (id: number | string): ThunksTypes => {
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



