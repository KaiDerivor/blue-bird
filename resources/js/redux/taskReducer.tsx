import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import store, { AppStateType, InferActionsTypes } from "./store";

const INIT_TASKS = 'task/INIT_TASKS'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
const ERASE_ERROR = 'ERASE_ERROR'
const UPDATE_TASK = 'task/UPDATE_TASK'
const INIT_TEST = 'task/INIT_TEST'
export const TASK_IMAGE_FOLDER = 'img-tasks/'

export type TaskRecordType = {
   id?: string | number
   task?: any
   answer?: string
   content?: string
   category_id?: string
   tag_id?: string
   number_of_task: number
   task_type: string
   test_qa:any
}
const initialState = {
   listTasks: [] as Array<TaskRecordType>,
   test: [] as Array<TaskRecordType>,
   errorText: ''
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
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof taskActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const taskActions = {
   init: (list: Array<TaskRecordType>) => { return { type: INIT_TASKS, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateTask: (task: TaskRecordType) => { return { type: UPDATE_TASK, task } as const },
   setTest: (list: Array<TaskRecordType>) => { return { type: INIT_TEST, list } as const }
}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getTasksInit = (categoryId: string = '', tagId: string = ''): ThunksTypes => {
   return async (dispatch) => {
      api.getTasks(categoryId, tagId)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(taskActions.init(res))
         }
      })
   }
}
export const getTestInit = (categoryId: number, tagId: number): ThunksTypes => {
   return async (dispatch) => {
      api.getTest(categoryId, tagId)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(taskActions.setTest(res))
            }
         }
      });
   }

}

export const createTask = (task: TaskRecordType): ThunksTypes => {
   return async (dispatch) => {

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
         })
   }
}
export const updateTask = (id: number | string | undefined, task: TaskRecordType): ThunksTypes => {

   return async (dispatch) => {
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

      })
   }
}
export const deleteTask = (id: number | string): ThunksTypes => {
   return async (dispatch) => {
      api.deleteTask(id)?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(taskActions.init(res))
         }

      })
   }
}


export default taskReducer;



