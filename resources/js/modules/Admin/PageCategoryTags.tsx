import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'
import { getCategories, getCategoryTagList, getTags } from '../../redux/appSelector'
import { CategoryTagRecordType, deleteCategoryTag, getCategoriesInit, getCategoryTagsInit, updateCategoryTag } from '../../redux/catReducer'
import { getTagsInit } from '../../redux/tagReducer'
import { SearchBarCategoryTag } from './SearchBarCategoryTag'
import { TableCategoryTag } from './TableCategoryTags'

const CategoryTags = React.memo(() => {

   const dispatch: any = useDispatch();
   const categoryTags = useSelector(getCategoryTagList)
   const tags = useSelector(getTags)
   const categories = useSelector(getCategories)

   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)
   const searchFilter = (categoryId = '', tagId = '') => {
      dispatch(getCategoryTagsInit(categoryId, tagId))
   }
   useEffect(() => {
      if (!categoryTags || categoryTags.length <= 0)
         dispatch(getCategoryTagsInit())
      if (!tags || tags.length <= 0)
         dispatch(getTagsInit())
      if (!categories || categories.length <= 0)
         dispatch(getCategoriesInit())
   }, [])

   const handleConfirm = (categoryTagId = 0, categoryTag = {} as CategoryTagRecordType) => {
      switch (switchHandler) {
         case CREATE: {
            // dispatch(createResultTable (categoryTag))
            break;
         }
         case UPDATE: {
            dispatch(updateCategoryTag(categoryTagId, categoryTag))
            break;
         }
         case DELETE: {
            dispatch(deleteCategoryTag(categoryTagId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <>
         <SearchBarCategoryTag categories={categories} tags={tags} fnSearch={searchFilter} />
         <TableCategoryTag
            list={categoryTags}
            handleConfirm={handleConfirm}
            setSwitchHandler={setSwitchHandler}
            switchHandler={switchHandler}
         />
      </>
   )
})
export default CategoryTags
