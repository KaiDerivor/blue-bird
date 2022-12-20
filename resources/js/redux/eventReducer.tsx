
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";


const INIT_EVENTS = 'event/INIT_EVENTS'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const UPDATE_EVENT = 'event/UPDATE_EVENT'
const ON_TOGGLE_FETCHING = 'event/ON_TOGGLE_FETCHING'
const OFF_TOGGLE_FETCHING = 'event/OFF_TOGGLE_FETCHING'

export const UPDATE = 'update'
export const ZNO = 'zno'

export type EventRecordType = {
   id?: number,
   title?: string,
   description?: string
   eventType?: string
   time?: string,
   categoryId?: number
}

export type EventType = {
   id: number,
   title: string,
   description: string
   eventType: string
   time: string,
   categoryId: number
}

const initialState = {
   isFetching:false,
   listEvents: [] as Array<EventType>,
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

export type ActionsTypes = InferActionsTypes<typeof eventActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const eventActions = {
   init: (list: Array<EventType>) => { return { type: INIT_EVENTS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTag: (tag: EventType) => { return { type: UPDATE_EVENT, tag } as const },
   toggleFetchingOn: () => { return { type: ON_TOGGLE_FETCHING } as const },
   toggleFetchingOff: () => { return { type: OFF_TOGGLE_FETCHING } as const },
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getEventsInit = (): ThunksTypes => {
   return async (dispatch) => {
      dispatch(eventActions.toggleFetchingOn())
      api.getEvents()?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(eventActions.setErrorText(res))
         } else {
            dispatch(eventActions.init(res))
         }
      }).finally(()=>{
         dispatch(eventActions.toggleFetchingOff())
      })
   }
}
export const createEvent = (event: EventRecordType): ThunksTypes => {
   return async (dispatch) => {

      dispatch(eventActions.toggleFetchingOn())

      api.createEvent(event)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(eventActions.updateTag(res))
            }
         }
      }).finally(()=>{
         dispatch(eventActions.toggleFetchingOff())
      })
   }
}
export const updateEvent = (id: number, event: EventRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(eventActions.toggleFetchingOn())
      api.updateEvent(id, event)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(eventActions.updateTag(res))
         }

      }).finally(()=>{
         dispatch(eventActions.toggleFetchingOff())
      })
   }
}
export const deleteEvent = (id: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(eventActions.toggleFetchingOn())

      api.deleteEvent(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(eventActions.init(res))
         }

      }).finally(()=>{
         dispatch(eventActions.toggleFetchingOff())
      })
   }
}


export default eventReducer;



