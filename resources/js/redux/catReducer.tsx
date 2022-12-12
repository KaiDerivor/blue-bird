import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { appActions } from "./appReducer";
import store, { AppStateType, InferActionsTypes } from "./store";
import { TagRecordType } from "./tagReducer";

const INIT = 'cat/INIT'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'
const ERASE_ERROR = 'app/ERASE_ERROR'
const UPDATE_CATEGORIES = 'cat/UPDATE_CATEGORIES'
const INIT_CATEGORY_TAGS = 'cat/INIT_CATEGORY_TAGS'
const UPDATE_CATEGORY_TAGS = 'cat/UPDATE_CATEGORY_TAGS'

export type CategoryRecordType = {
   id?: number,
   title: string,
   description?: string
   img?: any,
   textUrl: string,
   tags?: Array<TagRecordType>
}
export type CategoryType = {
   id: number,
   title: string,
   description?: string
   img?: any,
   textUrl: string,
   tags?: Array<TagRecordType>
}
export type CategoryTagType = {
   id: number
   maxTime: number
   table200img: string
   table12img: string
   tag: TagRecordType
   category: CategoryType
}
export type CategoryTagRecordType = {
   maxTime?: number | string
   table200img?: any
   table12img?: any
}
const initialState = {
   listCats: [] as Array<CategoryType>,
   errorText: '',
   listCategoryTags: [] as Array<CategoryTagType>
}
type StateType = typeof initialState;
const catReducer = (state = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            listCats: action.list
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
      case UPDATE_CATEGORIES: {
         let isSetted = false;
         for (let i = 0; i < state.listCats.length; i++) {
            if (state.listCats[i].id === action.category.id) {
               state.listCats.splice(i, 1, action.category);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listCats.push(action.category)
         }
         return {
            ...state,
            listCats: [...state.listCats]
         }
      }
      case INIT_CATEGORY_TAGS: {
         return {
            ...state,
            listCategoryTags: action.categoryTags
         }
      }
      case UPDATE_CATEGORY_TAGS: {
         let isSetted = false;
         for (let i = 0; i < state.listCategoryTags.length; i++) {
            if (state.listCategoryTags[i].id === action.categoryTag.id) {
               state.listCategoryTags.splice(i, 1, action.categoryTag);
               isSetted = true;
               break;
            }
         }
         if (!isSetted) {
            state.listCategoryTags.push(action.categoryTag)
         }
         return {
            ...state,
            listCategoryTags: [...state.listCategoryTags]
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof catActions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const catActions = {
   init: (list: Array<CategoryType>) => { return { type: INIT, list } as const },
   setErrorText: (err: string) => { return { type: SET_ERROR_MESSAGE, errorText: err } as const },
   eraseError: () => { return { type: ERASE_ERROR } as const },
   updateCategory: (category: CategoryType) => { return { type: UPDATE_CATEGORIES, category } as const },
   initCategoryTags: (categoryTags: Array<CategoryTagType>) => { return { type: INIT_CATEGORY_TAGS, categoryTags } as const },
   updateCategoryTag: (categoryTag: CategoryTagType) => { return { type: UPDATE_CATEGORY_TAGS, categoryTag } as const }

}

export type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getCategoriesInit = (): ThunksTypes => {
   return async (dispatch) => {
      api.getCategories()?.then(res => {
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(catActions.init(res))
         }
      })
   }
}
export const createCategory = (category: CategoryRecordType): ThunksTypes => {
   return async (dispatch) => {
      api.createCategory(category)?.then(res => {
         if (res) {
            if (typeof res === 'string') {
               dispatch(appActions.setErrorText(res))
            } else {
               dispatch(appActions.setErrorText('Created'))
               dispatch(catActions.updateCategory(res))
            }
         }
      })
   }
}
export const updateCategory = (id: number, category: CategoryRecordType): ThunksTypes => {
   return async (dispatch) => {
      if (!category?.img?.name) {
         delete category.img
      }
      api.updateCategory(id, category)?.then(res => {

         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(catActions.updateCategory(res))
         }

      })
   }
}
export const deleteCategory = (id: number): ThunksTypes => {
   return async (dispatch) => {
      api.deleteCategory(id)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(catActions.init(res))
         }

      })
   }
}
export const getCategoryTagsInit = (categoryId = '', tagId = ''): ThunksTypes => {
   return async (dispatch) => {
      api.getCategoryTags(categoryId, tagId)?.then(res => {


         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(catActions.initCategoryTags(res))
         }
      })
   }
}
export const updateCategoryTag = (id: number, categoryTag: CategoryTagRecordType): ThunksTypes => {
   return async (dispatch) => {
      api.updateCategoryTag(id, categoryTag)?.then(res => {
         console.log(res)
         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Updated'))
            dispatch(catActions.updateCategoryTag(res))
         }
      })
   }
}
export const deleteCategoryTag = (id: number): ThunksTypes => {
   return async (dispatch) => {
      api.deleteCategoryTag(id)?.then(res => {

         if (typeof res === 'string') {
            dispatch(appActions.setErrorText(res))
         } else {
            dispatch(appActions.setErrorText('Deleted'))
            dispatch(catActions.initCategoryTags(res))
         }
      })
   }
}
export default catReducer;



