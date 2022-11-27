import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../../redux/appSelector'
import { createTag, deleteTag, getTagsInit, updateTag } from '../../redux/tagReducer'
import { TableSimpleItem } from './TableSimpleItem'

export const Tags = () => {

   const dispatch: any = useDispatch();
   const tasgs = useSelector(getTags)
   const [switchHandler, setSwitchHandler] = useState('save')

   useEffect(() => {
      return () => {
         if (!tasgs || tasgs.length <= 0)
            dispatch(getTagsInit())
      }
   }, [])
   const handleConfirm = (tagId = '' as string | number, field = '' as string) => {
      switch (switchHandler) {
         case 'save': {
            dispatch(createTag(field))
            break;
         }
         case 'update': {
            dispatch(updateTag(tagId, field))
            break;
         }
         case 'delete': {
            dispatch(deleteTag(tagId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={tasgs} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} />
   )
}
