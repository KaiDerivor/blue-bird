
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";

const INIT_EVENTS = 'event/INIT_EVENTS'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'
const UPDATE_EVENT = 'event/UPDATE_EVENT'
export type EventRecordType = {
   id?: number,
   title?: string,
   description?: string
   eventType?: string
   time?: string,
   categoryId?: number

}
const initialState = {
   listEvents: [] as Array<EventRecordType>,
   errorText: ''
}
type StateType = typeof initialState;
const eventReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT_EVENTS: {
         return {
            ...state,
            listEvents: action.list
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
      case UPDATE_EVENT: {
         let isSetted = false;
         for (let i = 0; i < state.listEvents.length; i++) {
            if (state.listEvents[i].id === action.tag.id) {
               state.listEvents.splice(i, 1, action.tag);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listEvents.push(action.tag)
         }
         return {
            ...state,
            listEvents: [...state.listEvents]
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof tagActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const tagActions = {
   init: (list: Array<EventRecordType>) => { return { type: INIT_EVENTS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTag: (tag: EventRecordType) => { return { type: UPDATE_EVENT, tag } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getEventsInit = (): ThunksTypes => {
   return async (dispatch) => {
      api.getEvents()?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(tagActions.setErrorText(res))
         } else {
            dispatch(tagActions.init(res))
         }
      })
   }
}
export const createEvent = (tag: EventRecordType): ThunksTypes => {
   return async (dispatch) => {


      api.createEvent(tag)?.then(res => {
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
export const updateEvent = (id: number, tag: EventRecordType): ThunksTypes => {
   return async (dispatch) => {
      api.updateEvent(id, tag)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(tagActions.updateTag(res))
         }

      })
   }
}
export const deleteEvent = (id: number): ThunksTypes => {
   return async (dispatch) => {
      api.deleteEvent(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(tagActions.init(res))
         }

      })
   }
}


export default eventReducer;



