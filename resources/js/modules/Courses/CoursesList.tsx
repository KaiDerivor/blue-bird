import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { ItemGrid } from "../common/ItemGrid"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../../redux/appSelector"
import { getCategoriesInit } from "../../redux/catReducer"

const CoursesList: React.FC = React.memo(() => {

   const dispatch: any = useDispatch();

   const categories = useSelector(getCategories)

   useEffect(() => {
      if (categories.length < 1) {
         dispatch(getCategoriesInit())
      }
   }, [])
   return (
      <Box className={styles.listSavings}>

         {categories && categories.map(category => {
            return <ItemGrid key={category.id} text={category.description}
               title={category.title} navLink={category.slug} imgUrl={category.img && `${category.img}`} />
         })}

      </Box>
   )
})
export default CoursesList