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
import Box from '@mui/material/Box'

type ItemGridType = {
   title: string
   text: string | undefined
   imgUrl?: string
   isEmpty?: boolean
   navLink?: string
}
export const ItemGrid: React.FC<ItemGridType> = ({ title, text = '', isEmpty, navLink, imgUrl }) => {
   if (isEmpty) {
      return (
         <Card sx={{ backgroundColor: 'bgmode.main', '&:hover': { backgroundColor: 'bgmode.dark' } }} className={styles.cardGridItem}>
            <CardContent sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100%' }}>
               <Typography gutterBottom variant="h5" component="p" sx={{ p: 0, m: 0 }}>
                  Нічого не знайдено
               </Typography>
            </CardContent>
         </Card>
      )
   }
   const renderCard = () => {
      return (
         <Card sx={{ backgroundColor: 'bgmode.main', transition: 'all 0.5s', '&:hover': { backgroundColor: 'bgmode.dark', '.MuiCardMedia-root ': { transform: 'scale(1.3)', transition: 'all 0.6s' } } }} className={styles.cardGridItem}>
            <Box sx={{ overflow: 'hidden' }}>
               <CardMedia
                  component="img"
                  height="180"
                  image={imgUrl}
                  alt="green iguana"
               />
            </Box>
            <CardContent>
               <Typography gutterBottom variant="h5" component="div" color="fpage.dark">
                  {title}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {text}
               </Typography>
            </CardContent>

            {!navLink && <CardActions>
               <Button size="small" sx={{ color: 'fpage.dark', ml: 'auto', mr: 2 }}>delete</Button>
            </CardActions>
            }
         </Card>
      )
   }
   if (navLink) {
      return (
         <NavLink to={navLink} >
            {renderCard()}
         </NavLink>
      )
   } else {
      return renderCard();
   }
}
