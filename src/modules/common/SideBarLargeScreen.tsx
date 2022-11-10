import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styles from './stylesSLS.module.scss'


const drawerWidth = 85;

export const SideBarLargeScreen = () => {
   return (
      <Drawer

         sx={{
            width: drawerWidth,
            // flexShrink: 0,
            '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box',
            },
            overflow: 'hidden'
         }}
         variant="permanent"
         anchor="left"
      >
         <List className={styles.listMenu}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
               <ListItem key={text} disablePadding>
                  <ListItemButton className={styles.listMenu__item}>
                     <ListItemIcon className={styles.listMenu__itemIcon}>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                     </ListItemIcon>
                     <ListItemText primary={
                        <Typography variant="caption" color="info" noWrap>{text}</Typography>
                     } />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
         <Divider />
         <List className={styles.listMenu}>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
               <ListItem key={text} disablePadding>
                  <ListItemButton className={styles.listMenu__item} >
                     <ListItemIcon className={styles.listMenu__itemIcon}>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                     </ListItemIcon>
                     <ListItemText primary={
                        <Typography variant="caption" color="info" noWrap>{text}</Typography>
                     } />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </Drawer>
   );
}