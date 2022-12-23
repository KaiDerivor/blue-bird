import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getListEvents, getThemesList } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { TableSimpleItem } from './TableSimpleItem'
import { createEvent, deleteEvent, EventRecordType, getEventsInit, updateEvent } from '../../redux/eventReducer'
import { createTheme, deleteTheme, getThemesInit, ThemeRecordType, ThemeType, updateTheme } from '../../redux/themeReducer'
import { SearchBarCategory } from './SearchBarCategory'

const Themes = React.memo(() => {

   const dispatch: any = useDispatch();
   const themes = useSelector(getThemesList)
   const [switchHandler, setSwitchHandler] = useState('save')
   const categories = useSelector(getCategories)
   const searchFilter = (categoryId = '') => {
      dispatch(getThemesInit(categoryId))
   }
   useEffect(() => {
      return () => {
         if (!themes || themes.length <= 0)
            dispatch(getThemesInit())
         if (!categories || categories.length <= 0)
            dispatch(getCategoriesInit())
      }
   }, [])
   const handleConfirm = (eventId = 0, theme = {} as ThemeRecordType) => {
      switch (switchHandler) {
         case 'save': {
            dispatch(createTheme(theme))
            break;
         }
         case 'update': {
            dispatch(updateTheme(eventId, theme))
            break;
         }
         case 'delete': {
            dispatch(deleteTheme(eventId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <>
      <SearchBarCategory categories={categories} fnSearch={searchFilter} />
      <TableSimpleItem list={themes} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} typeDialog="THEME" />
      </>
   )
})

export default Themes
