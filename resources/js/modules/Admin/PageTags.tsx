import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'
import { getTags } from '../../redux/appSelector'
import { createTag, deleteTag, getTagsInit, TagRecordType, updateTag } from '../../redux/tagReducer'
import { TableSimpleItem } from './TableSimpleItem'

export const TAG = 'TAG'

const Tags = React.memo(() => {
   const dispatch: any = useDispatch();
   const tasgs = useSelector(getTags)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)

   useEffect(() => {
      return () => {
         if (!tasgs || tasgs.length <= 0)
            dispatch(getTagsInit())
      }
   }, [])
   const handleConfirm = (tagId = 0, tag = {} as TagRecordType) => {
      switch (switchHandler) {
         case CREATE: {
            dispatch(createTag(tag))
            break;
         }
         case UPDATE: {
            dispatch(updateTag(tagId, tag))
            break;
         }
         case DELETE: {
            dispatch(deleteTag(tagId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={tasgs}
         handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler}
         typeDialog={TAG} switchHandler={switchHandler} />
   )
})

export default Tags