import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getListEvents } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { TableSimpleItem } from './TableSimpleItem'
import { createEvent, deleteEvent, EventRecordType, getEventsInit, updateEvent } from '../../redux/eventReducer'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'

export const EVENT = 'EVENT'

const DataEvents = React.memo(() => {
   const dispatch: any = useDispatch();
   const events = useSelector(getListEvents)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)
   const categories = useSelector(getCategories)

   useEffect(() => {
      return () => {
         if (!events || events.length <= 0)
            dispatch(getEventsInit())
         if (!categories || categories.length <= 0)
            dispatch(getCategoriesInit())
      }
   }, [])
   const handleConfirm = (eventId = 0, event = {} as EventRecordType) => {
      switch (switchHandler) {
         case CREATE: {
            dispatch(createEvent(event))
            break;
         }
         case UPDATE: {
            dispatch(updateEvent(eventId, event))
            break;
         }
         case DELETE: {
            dispatch(deleteEvent(eventId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={events} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} typeDialog={EVENT} switchHandler={switchHandler} />
   )
})

export default DataEvents
