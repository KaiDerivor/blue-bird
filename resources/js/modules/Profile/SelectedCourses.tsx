import React, { useEffect } from 'react'
import { ItemGrid } from "../common/ItemGrid"
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'
import { ProfileCourseItem } from "./ProfileCourseItem"
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getLikedCategories } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'


export const SelectedCourses = React.memo(() => {
   const dispatch: any = useDispatch()

   const likedCategories = useSelector(getLikedCategories)
   const categories = useSelector(getCategories)
   useEffect(() => {
      return () => {
         if (categories.length === 0)
            dispatch(getCategoriesInit())
      };
   }, [])
   const renderSavingsCategories = () => {
      let categoryItems = [] as Array<JSX.Element>
      for (const category of categories) {
         if (likedCategories.includes(category.id)) {
            categoryItems.push(<ProfileCourseItem key={category.id} text={category.description} title={category.title} navLink={`/courses/${category.textUrl}`}
            />)
         }
      }
      return categoryItems
   }
   return (
      <>
         {likedCategories.length > 0 &&
            <Box sx={{ mb: 4 }}>
               <Typography variant="h3" color="fpage.main" sx={{ pb: 3 }}>Збережені курси</Typography>
               <Box className={styles.listSelected}>
                  {renderSavingsCategories()}
               </Box>
            </Box>
         }
      </>
   )
})