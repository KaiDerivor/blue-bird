import Box from "@mui/material/Box"
import styles from './style.module.scss'
import { ItemGrid } from "../common/ItemGrid"

const styleBoxTitle = {
   pl: 3,
   pb: 5,
   pt: 8
}

export const CoursesList = () => {
   return (
      <Box className={styles.listSavings}>
         <ItemGrid text={'Lizards are a widespread group of squamate reptiles, with over 6,000\nspecies, ranging across all continents except Antarctica'}
            title={'Lizard'} navLink={'/tttr'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Lorem'} navLink={'/courses/lorem'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Sipumd'} navLink={'/courses/sipumd'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Dolor'} navLink={'/courses/dolor'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Sit'} navLink={'/courses/sit'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Consectecteetir'} navLink={'/courses/consectecteetir'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'adpsicing'} navLink={'/courses/adpsicing'} />
         <ItemGrid text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Elit'} navLink={'/courses/elit'} />
      </Box>
   )
}