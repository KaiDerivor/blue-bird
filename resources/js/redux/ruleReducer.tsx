
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { AppStateType, InferActionsTypes } from "./store";


const INIT_RULES = 'rule/INIT_RULES'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const UPDATE_RULE = 'rule/UPDATE_RULE'
const ON_TOGGLE_FETCHING = 'rule/ON_TOGGLE_FETCHING'
const OFF_TOGGLE_FETCHING = 'rule/OFF_TOGGLE_FETCHING'

export type RuleRecordType = {
   id?: number,
   title?: string,
   description?: string
   categoryId?: number
}
export type RuleType = {
   id?: number,
   title: string,
   description: string
   categoryId: number
}

const initialState = {
   isFetching: false,
   listRules: [] as Array<RuleType>,
   errorText: ''
}
type StateType = typeof initialState;
const ruleReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT_RULES: {
         return {
            ...state,
            listRules: action.list
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
      case UPDATE_RULE: {
         let isSetted = false;
         for (let i = 0; i < state.listRules.length; i++) {
            if (state.listRules[i].id === action.tag.id) {
               state.listRules.splice(i, 1, action.tag);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listRules.push(action.tag)
         }
         return {
            ...state,
            listRules: [...state.listRules]
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

export type ActionsTypes = InferActionsTypes<typeof ruleActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const ruleActions = {
   init: (list: Array<RuleType>) => { return { type: INIT_RULES, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTag: (tag: RuleType) => { return { type: UPDATE_RULE, tag } as const },
   toggleFetchingOn: () => { return { type: ON_TOGGLE_FETCHING } as const },
   toggleFetchingOff: () => { return { type: OFF_TOGGLE_FETCHING } as const },
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getRulesInit = (categoryId = ''): ThunksTypes => {
   return async (dispatch) => {
      dispatch(ruleActions.toggleFetchingOn())
      api.getRules(categoryId)?.then(res => {
         if (typeof res === 'string' || res === undefined) {
            dispatch(ruleActions.setErrorText(res))
         } else {
            dispatch(ruleActions.init(res))
         }
      }).finally(() => {
         dispatch(ruleActions.toggleFetchingOff())
      })
   }
}
export const createRule = (rule: RuleRecordType): ThunksTypes => {
   return async (dispatch) => {

      dispatch(ruleActions.toggleFetchingOn())

      api.createRule(rule)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(ruleActions.updateTag(res))
            }
         }
      }).finally(() => {
         dispatch(ruleActions.toggleFetchingOff())
      })
   }
}
export const updateRule = (id: number, rule: RuleRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(ruleActions.toggleFetchingOn())
      api.updateRule(id, rule)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(ruleActions.updateTag(res))
         }

      }).finally(() => {
         dispatch(ruleActions.toggleFetchingOff())
      })
   }
}
export const deleteRule = (id: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(ruleActions.toggleFetchingOn())

      api.deleteRule(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(ruleActions.init(res))
         }

      }).finally(() => {
         dispatch(ruleActions.toggleFetchingOff())
      })
   }
}


export default ruleReducer;



