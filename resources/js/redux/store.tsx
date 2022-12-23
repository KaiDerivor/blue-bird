import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import appReducer, { ActionsTypes, ThunksTypes } from "./appReducer";
import catReducer from "./catReducer";
import eventReducer from "./eventReducer";
import ruleReducer from "./ruleReducer";
import tagReducer from "./tagReducer";
import taskReducer from "./taskReducer";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

let rootReducer = combineReducers({
   app: appReducer,
   category: catReducer,
   tag:tagReducer,
   task:taskReducer,
   user:userReducer,
   event:eventReducer,
   rule:ruleReducer,
   theme:themeReducer
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
