import React, { useEffect } from 'react'
import { ItemGrid } from "../common/ItemGrid"
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'
import { ProfileCourseItem } from "./ProfileCourseItem"
import { useSelector } from 'react-redux'
import { getLikedCategories } from '../../redux/appSelector'
import { CategoryType } from '../../redux/catReducer'

type SelectedCoursesType = {
   categories: CategoryType[]
}
export const SelectedCourses: React.FC<SelectedCoursesType> = React.memo(({ categories }) => {

   const likedCategories = useSelector(getLikedCategories)
   const renderSavingsCategories = () => {
      let categoryItems = [] as Array<JSX.Element>
      for (const category of categories) {
         if (likedCategories.includes(category.id)) {
            categoryItems.push(<ProfileCourseItem key={category.id} text={category.description} title={category.title} navLink={`/courses/${category.slug}`}
            />)
         }
      }
      return categoryItems
   }
   return (
      <>
         {likedCategories.length > 0 &&
            <Box sx={{ mb: 4 }}>
               <Typography variant="h4" color="fpage.main" sx={{ pb: 3 }}>Збережені курси</Typography>
               <Box className={styles.listSelected}>
                  {renderSavingsCategories()}
               </Box>
            </Box>
         }
      </>
   )
})