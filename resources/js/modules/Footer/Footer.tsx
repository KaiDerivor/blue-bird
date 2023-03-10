import React from 'react'
import Container from "@mui/material/Container"
import Box from '@mui/material/Box'
import AgricultureIcon from '@mui/icons-material/Agriculture';
//@ts-ignore
import styles from './styles.module.scss'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom'
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "../../redux/appSelector";
import { WavesDividerFullWidth } from "../common/WavesDividerFullWidth";


export const Footer = React.memo(() => {
   const isDarkMode = useSelector(getIsDarkMode);
   return (
      <>
         <Box sx={{ pb: 7, pt: 7 }}>
            <WavesDividerFullWidth />
         </Box>
         <Container maxWidth="xl"  >
            <Box className={styles.wrapperFooter} sx={{ pb: 7, pl: 5, pr: 5 }}>
               <Box className={styles.wrapperFooter__content} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h4" color="fpage.main"><AgricultureIcon /></Typography>
                  <Typography variant="body1" color='fpage.main'>
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem id quasi hic doloremque expedita. Minima, error? Repudiandae aliquam exercitationem repellendus maiores, tempora dolores quam debitis molestiae, qui natus aperiam nobis.
                  </Typography>
               </Box>
               <Box className={styles.wrapperFooter__content}>
                  <nav aria-label="secondary menu-nav1">
                     <Typography variant="body2" color="fpage.main" sx={{ pb: 3 }}>Social</Typography>
                     <List>
                        <ListItem className={styles.listMenuItem} disablePadding>
                           <NavLink to='/gd' className={styles.listMenuItem__link} style={{ color: isDarkMode ? '#c2c2c2' : '#575757' }}>Twitter</NavLink>
                        </ListItem>
                        <ListItem className={styles.listMenuItem} disablePadding>
                           <NavLink to='/gd' className={styles.listMenuItem__link} style={{ color: isDarkMode ? '#c2c2c2' : '#575757' }}>Instagram</NavLink>
                        </ListItem>
                     </List>
                  </nav>
               </Box>
               <Box className={styles.wrapperFooter__content}>
                  <nav aria-label="secondary menu-nav2 folders">
                     <Typography variant="body2" color="fpage.main" sx={{ pb: 3 }}>Navigate</Typography>
                     <List>
                        <ListItem className={styles.listMenuItem} disablePadding>
                           <NavLink to='/gd' className={styles.listMenuItem__link} style={{ color: isDarkMode ? '#c2c2c2' : '#575757' }}>Profile</NavLink>
                        </ListItem>
                        <ListItem className={styles.listMenuItem} disablePadding>
                           <NavLink to='/gd' className={styles.listMenuItem__link} style={{ color: isDarkMode ? '#c2c2c2' : '#575757' }}>Support project</NavLink>
                        </ListItem>
                        <ListItem className={styles.listMenuItem} disablePadding>
                           <NavLink to='/gd' className={styles.listMenuItem__link} style={{ color: isDarkMode ? '#c2c2c2' : '#575757' }}>About</NavLink>
                        </ListItem>

                     </List>
                  </nav>
               </Box>
            </Box>
         </Container>
      </>

   )
})