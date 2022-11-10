import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { AppStateType, InferActionsTypes } from "./store";


const initialState: any = {

   isFetching: false,
   isInit: false,

}
const appReducer = (state = initialState, action: ActionsTypes): any => {
   switch (action.type) {

      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const actions = {

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

export default appReducer;
