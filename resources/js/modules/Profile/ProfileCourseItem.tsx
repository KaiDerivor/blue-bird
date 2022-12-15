import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//@ts-ignore
import styles from './style.module.scss'
import { NavLink } from 'react-router-dom';



type ItemGridType = {
   title: string
   text?: string,
   isEmpty?: boolean
   navLink?: string
   stateItem?: string
}
export const ProfileCourseItem: React.FC<ItemGridType> = React.memo(({ title, text = '', isEmpty, navLink, stateItem }) => {
   if (isEmpty) {
      return (

         <Card sx={{ backgroundColor: 'bgmode.main', '&:hover': { backgroundColor: 'bgmode.light' } }} className={styles.profileCard}>
            <CardContent sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100%' }}>
               <Typography gutterBottom variant="h5" component="p" sx={{ p: 0, m: 0 }}>
                  Нічого не знайдено
               </Typography>
            </CardContent>
         </Card>
      )
   }
   const renderCard = () => {
      return (<Card sx={{
         backgroundColor: 'bgmode.main', pb: 2,
         '&:hover': { backgroundColor: 'bgmode.light' }
      }} className={styles.profileCard}>

         <CardContent>
            <Typography gutterBottom variant="h4" component="div" color='fpage.dark'>
               {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {text}
            </Typography>
         </CardContent>
         {!navLink && <CardActions>
            <Button size="small" sx={{ color: 'fpage.main' }}>delete</Button>
         </CardActions>
         }
         <CardActions>
            <Typography variant="body2" color="fpage.main" sx={{ pl: 1 }}>{stateItem}</Typography>
         </CardActions>
      </Card>)
   }
   if (navLink) {
      return (
         <NavLink to={navLink}>
            {renderCard()}
         </NavLink>
      )
   } else {
      return renderCard();
   }
})
