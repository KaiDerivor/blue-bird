import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { AppStateType, InferActionsTypes } from "./store";

const TOGGLE_THEME_MODE = 'TOGGLE_THEME_MODE';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const INIT = 'INIT'

const initialState = {
   isFetching: false,
   isInit: false,
   isDarkMode: true
}
type StateType = typeof initialState;
const appReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            isInit: true
         }
      }
      case TOGGLE_THEME_MODE: {
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
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const actions = {
   toggleThemeMod: () => { return { type: TOGGLE_THEME_MODE } as const },
   toggleFetching: () => { return { type: TOGGLE_FETCHING } as const },
   init: () => { return { type: INIT } as const }
}

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// export const getInfoUser = (): ThunksTypes => {
//    return async (dispatch) => {
//       dispatch(actions.toggleFetching())
//       // const result1 = new Promise((resolve) =>
//       //    setTimeout(() => { resolve(dispatch(init(testState))) }, 1000)
//       // );
//       api.me().then((response: any) => {
//          dispatch(actions.init(response))
//          dispatch(actions.setCurrentDay())
//          dispatch(actions.toggleFetching())
//       })
//    }
// }
export const toggleThemeMode = (): ThunksTypes => {
   return async (dispatch) => {

   }
}

export default appReducer;
