import { ItemGrid } from "../common/ItemGrid"
import Box from '@mui/material/Box'
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'
import { ProfileCourseItem } from "./ProfileCourseItem"


export const SelectedCourses = () => {
   return (
      <Box sx={{mb:4}}>
         <Typography variant="h3" color="fpage.main" sx={{pb:3}}>Збережені курси</Typography>
         <Box className={styles.listSelected}>
            <ProfileCourseItem text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Consectecteetir'} navLink={'/courses/Consectecteetir'} stateItem={'2/54'}/>
            <ProfileCourseItem text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'adpsicing'} navLink={'/courses/adpsicing'} stateItem={'14/58'} />
            <ProfileCourseItem text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Elit'} navLink={'/courses/Elit'} stateItem={'14/40'} />
         </Box>
      </Box>
   )
}