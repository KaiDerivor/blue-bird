import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import { CategoryType } from "./catReducer";
import store, { AppStateType, InferActionsTypes } from "./store";
import { TagType } from "./tagReducer";

export const lettersOfAnswers = ['А', 'Б', 'В', 'Г', 'Д'];
export const WORST_RESULT = 'не склав'

const INIT_TASKS = 'task/INIT_TASKS'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const UPDATE_TASK = 'task/UPDATE_TASK'
const INIT_TEST = 'task/INIT_TEST'
const SET_FILTER = 'task/SET_FILTER'
const SET_RESULT_TABLE = 'task/SET_RESULT_TABLE'
const UPDATE_RESULTS_TABLE = 'task/UPDATE_RESULTS_TABLE'
const INIT_SAVED_TASKS = 'task/INIT_SAVED_INIT_SAVED_TASKS'

const ON_TOGGLE_FETCHING = 'task/ON_TOGGLE_FETCHING'
const OFF_TOGGLE_FETCHING = 'task/OFF_TOGGLE_FETCHING'

export const TASK_IMAGE_FOLDER = 'img-tasks/'
export type ResultTableType = {
   id: number,
   category: string
   tag: string
   value: string

}
export type ResultRecordType = {
   id?: number,
   category?: string
   tag?: string
   value?: string
}
export type TaskRecordType = {
   id?: number
   task?: any
   answer?: string
   content?: string
   category_id?: string
   tag_id?: string
   number_of_task?: number
   task_type?: string
   test_qa?: any
}
export type TaskType = {
   id: number
   task?: any
   answer: string
   content?: string
   category_id: string
   tag_id: string
   number_of_task: number
   task_type: string
   test_qa?: any
}
export type TaskSavedType = {
   id: number
   task?: any
   answer: string
   content?: string
   category: CategoryType
   tag: TagType
   numberOfTask: number
   task_type: string
   test_qa?: any
}
const initialState = {
   isFetching: false,
   listTasks: [] as Array<TaskType>,
   test: [] as Array<TaskType>,
   errorText: '',
   filterCategory: localStorage.categoryId ? localStorage.categoryId : '',
   filterTag: localStorage.tagId ? localStorage.tagId : '',
   result: {} as ResultTableType,
   results: [] as Array<ResultTableType>,
   savedTasks: [] as Array<TaskSavedType>
}
type StateType = typeof initialState;
const taskReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT_TASKS: {

         return {
            ...state,
            listTasks: action.list
         }
      }
      case INIT_TEST: {
         return {
            ...state,
            test: action.list
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
      case UPDATE_TASK: {
         let isSetted = false;
         for (let i = 0; i < state.listTasks.length; i++) {
            if (state.listTasks[i].id === action.task.id) {
               state.listTasks.splice(i, 1, action.task);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listTasks.push(action.task)
         }
         return {
            ...state,
            listTasks: [...state.listTasks]
         }
      }
      case SET_FILTER: {
         return {
            ...state,
            filterCategory: action.categoryId,
            filterTag: action.tagId
         }
      }
      case SET_RESULT_TABLE: {
         return {
            ...state,
            results: action.result
         }
      }
      case UPDATE_RESULTS_TABLE: {
         let isSetted = false;
         for (let i = 0; i < state.results.length; i++) {
            if (state.results[i].id === action.result.id) {
               state.results.splice(i, 1, action.result);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.results.push(action.result)
         }
         return {
            ...state,
            results: [...state.results]
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
      case INIT_SAVED_TASKS: {
         return {
            ...state,
            savedTasks: action.savedTasks
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof taskActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const taskActions = {
   init: (list: Array<TaskType>) => { return { type: INIT_TASKS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTask: (task: TaskType) => { return { type: UPDATE_TASK, task } as const },
   setTest: (list: Array<TaskType>) => { return { type: INIT_TEST, list } as const },
   setFilter: (categoryId: string, tagId: string) => { return { type: SET_FILTER, categoryId, tagId } as const },
   setResultTable: (result: Array<ResultTableType>) => { return { type: SET_RESULT_TABLE, result } as const },
   updateResultTable: (result: ResultTableType) => { return { type: UPDATE_RESULTS_TABLE, result } as const },
   toggleFetchingOn: () => { return { type: ON_TOGGLE_FETCHING } as const },
   toggleFetchingOff: () => { return { type: OFF_TOGGLE_FETCHING } as const },
   initSavedTasks: (savedTasks: Array<TaskSavedType>) => { return { type: INIT_SAVED_TASKS, savedTasks } as const },
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getTasksInit = (categoryId: string = '', tagId: string = ''): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.getTasks(categoryId, tagId)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            if (categoryId || tagId) {
               localStorage.categoryId = categoryId
               localStorage.tagId = tagId

               dispatch(taskActions.setFilter(categoryId, tagId))
            }
            dispatch(taskActions.init(res))
         }
      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}
export const getTestInit = (categoryId: number, tagId: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.getTest(categoryId, tagId)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(taskActions.setTest(res))


            }
         }
      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }

}

export const createTask = (task: TaskRecordType): ThunksTypes => {
   return async (dispatch) => {

      dispatch(taskActions.toggleFetchingOn())
      api.createTask(task)
         ?.then(res => {
            if (res) {
               if (typeof res === 'string') {
                  dispatch(appActions.setErrorText(res))
               } else {
                  dispatch(appActions.setErrorText('Created'))
                  dispatch(taskActions.updateTask(res))
               }
            }
            dispatch(taskActions.toggleFetchingOff())
         }).finally(() => {
            dispatch(taskActions.toggleFetchingOff())
         })
   }
}
export const updateTask = (id: number | string | undefined, task: TaskRecordType): ThunksTypes => {

   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      if (task.task === null)
         delete task.task
      if (id === undefined) {
         dispatch(appActions.setErrorText('Error: id can\'t be undefined'))
         return;
      }
      api.updateTask(id, task)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(taskActions.updateTask(res))
         }

      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}
export const deleteTask = (id: number | string): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.deleteTask(id)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(taskActions.init(res))
         }

      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}

export const getResultTableInit = (categoryId = '', tagId = ''): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.getResult(categoryId, tagId)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(taskActions.setResultTable(res))
         }

      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}
export const createResultTable = (result: ResultRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.createResult(result)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(taskActions.updateResultTable(res))
         }
      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}
export const updateResultTable = (id: number, result: ResultRecordType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.updateResult(id, result)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(taskActions.updateResultTable(res))
         }
      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}
export const deleteResultTable = (id: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())

      api.deleteResult(id)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(taskActions.setResultTable(res))
         }
      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}
export const initSavedTasks = (listTaksIds: Array<number>): ThunksTypes => {
   return async (dispatch) => {
      dispatch(taskActions.toggleFetchingOn())
      api.getTasks('', '', listTaksIds)?.then(res => {
         dispatch(taskActions.initSavedTasks(res))
      }).finally(() => {
         dispatch(taskActions.toggleFetchingOff())
      })
   }
}

export default taskReducer;



