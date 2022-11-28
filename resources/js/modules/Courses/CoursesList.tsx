import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { ItemGrid } from "../common/ItemGrid"
import React, { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../../redux/appSelector"
import { getCategoriesInit } from "../../redux/catReducer"
import { URL_STORAGE } from "../../redux/appReducer"


export const CoursesList = () => {

   const dispatch: AppDispatch = useDispatch();

   const categories = useSelector(getCategories)

   useEffect(() => {
      return () => {
         if (categories) { //@ts-ignore
            dispatch(getCategoriesInit())
         }
      };
   }, [])
   return (
      <Box className={styles.listSavings}>

         {categories && categories.map(category => {
            return <ItemGrid key={category.id} text={category.description}
               title={category.title} navLink={category.textUrl} imgUrl={category.img && `${URL_STORAGE}${category.img}`} />
         })}

      </Box>
   )
}