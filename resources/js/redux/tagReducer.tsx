import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";

const INIT_TAGS = 'cat/INIT_TAGS'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const UPDATE_TAG = 'cat/UPDATE_TAG'
const ON_TOGGLE_FETCHING = 'tag/ON_TOGGLE_FETCHING'
const OFF_TOGGLE_FETCHING = 'tag/OFF_TOGGLE_FETCHING'

export type TagRecordType = {
   id?: number
   title?: string
   description?: string
   slug?: string
   img?:any
}
export type TagType = {
   id: number,
   title: string,
   description: string
   img: string
   slug: string
}
const initialState = {
   isFetching: false,
   listTags: [] as Array<TagType>,
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
         let isSetted = false;
         for (let i = 0; i < state.listTags.length; i++) {
            if (state.listTags[i].id === action.tag.id) {
               state.listTags.splice(i, 1, action.tag);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listTags.push(action.tag)
         }
         return {
            ...state,
            listTags: [...state.listTags]
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

export type ActionsTypes = InferActionsTypes<typeof tagActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const tagActions = {
   init: (list: Array<TagType>) => { return { type: INIT_TAGS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTag: (tag: TagType) => { return { type: UPDATE_TAG, tag } as const },
   toggleFetchingOn: () => { return { type: ON_TOGGLE_FETCHING } as const },
   toggleFetchingOff: () => { return { type: OFF_TOGGLE_FETCHING } as const },
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getTagsInit = (): ThunksTypes => {
   return async (dispatch) => {
      dispatch(tagActions.toggleFetchingOn())
      api.getTags()?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(tagActions.setErrorText(res))
         } else {
            dispatch(tagActions.init(res))
         }
      }).finally(()=>{
         dispatch(tagActions.toggleFetchingOff())
      })
   }
}
export const createTag = (tag: TagRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(tagActions.toggleFetchingOn())
      api.createTag(tag)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(tagActions.updateTag(res))
            }
         }
      }).finally(()=>{
         dispatch(tagActions.toggleFetchingOff())
      })
   }
}
export const updateTag = (id: number, tag: TagRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(tagActions.toggleFetchingOn())
      //@ts-ignore
      if (!tag.img.name) {
         delete tag.img
      }
      api.updateTag(id, tag)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(tagActions.updateTag(res))
         }

      }).finally(()=>{
         dispatch(tagActions.toggleFetchingOff())
      })
   }
}
export const deleteTag = (id: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(tagActions.toggleFetchingOn())
      api.deleteTag(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(tagActions.init(res))
         }

      }).finally(()=>{
         dispatch(tagActions.toggleFetchingOff())
      })
   }
}

export default tagReducer;



