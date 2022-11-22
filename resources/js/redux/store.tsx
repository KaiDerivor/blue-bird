import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import appReducer, { ActionsTypes, ThunksTypes } from "./appReducer";
import catReducer from "./catReducer";
import tagReducer from "./tagReducer";
import taskReducer from "./taskReducer";

let rootReducer = combineReducers({
   app: appReducer,
   category: catReducer,
   tag:tagReducer,
   task:taskReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store.getState();
export default store;

export type AppDispatch = typeof store.dispatch

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
