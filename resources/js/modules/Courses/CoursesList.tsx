import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { ItemGrid } from "../common/ItemGrid"
import React from "react"

const styleBoxTitle = {
   pl: 3,
   pb: 5,
   pt: 8
}

export const CoursesList = () => {
   return (
      <Box className={styles.listSavings}>
         <ItemGrid text={'Lizards are a widespread group of squamate reptiles, with over 6,000\nspecies, ranging across all continents except Antarctica'}
            title={'Lizard'} navLink={'tttr'} imgUrl='https://source.unsplash.com/random/?math'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Lorem'} navLink={'/courses/lorem'} imgUrl='https://source.unsplash.com/random/?sand'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Sipumd'} navLink={'/courses/sipumd'} imgUrl='https://source.unsplash.com/random/?dragon'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Dolor'} navLink={'/courses/dolor'} imgUrl='https://source.unsplash.com/random/?paradice'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Sit'} navLink={'/courses/sit'} imgUrl='https://source.unsplash.com/random/?happy'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Consectecteetir'} navLink={'/courses/consectecteetir'} imgUrl='https://source.unsplash.com/random/?cat'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'adpsicing'} navLink={'/courses/adpsicing'} imgUrl='https://source.unsplash.com/random/?love'/>
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Elit'} navLink={'/courses/elit'} imgUrl='https://source.unsplash.com/random/?ukraine' />
      </Box>
   )
}