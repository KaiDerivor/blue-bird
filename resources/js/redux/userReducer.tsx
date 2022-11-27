import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";

const INIT_USERS = 'user/INIT_USERS'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'
const UPDATE_USER = 'user/UPDATE_USER'
export type UserRecordType = {
   name?: string
   id?: string | number
   email?: string
   role?: string
}
const initialState = {
   listUsers: [] as Array<UserRecordType>,
   errorText: ''
}
type StateType = typeof initialState;

const userReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT_USERS: {
         return {
            ...state,
            listUsers: action.list
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
      case UPDATE_USER: {
         let isSetted = false;
         for (let i = 0; i < state.listUsers.length; i++) {
            if (state.listUsers[i].id === action.user.id) {
               state.listUsers.splice(i, 1, action.user);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listUsers.push(action.user)
         }
         return {
            ...state,
            listUsers: [...state.listUsers]
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof userActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const userActions = {
   init: (list: Array<UserRecordType>) => { return { type: INIT_USERS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateUser: (user: UserRecordType) => { return { type: UPDATE_USER, user } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsersInit = (name = '', email = '', role = ''): ThunksTypes => {
   return async (dispatch) => {
      api.getUsers(name, email, role)?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(userActions.setErrorText(res))
         } else {
            dispatch(userActions.init(res))
         }
      })
   }
}
// export const createuser = (user: string): ThunksTypes => {
//    return async (dispatch) => {
//       api.createuser(user)?.then(res => {
//          if (res) {
//             if (typeof res === 'string') {
//                dispatch(appActions.setErrorText(res))
//             } else {
//                dispatch(appActions.setErrorText('Created'))
//                dispatch(userActions.updateuser(res))
//             }
//          }
//       })
//    }
// }
export const updateUser = (id: number | string, user: UserRecordType): ThunksTypes => {
   return async (dispatch) => {
      api.updateUser(id, user)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(userActions.updateUser(res))
         }

      })
   }
}
export const deleteuser = (id: number | string): ThunksTypes => {
   return async (dispatch) => {
      api.deleteUser(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(userActions.init(res))
         }

      })
   }
}


export default userReducer;



