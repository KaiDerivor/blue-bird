import React from 'react'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps';
import { MenuItem } from '../common/SideBarLargeScreen';
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { NavLink, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Categories } from './Categories';
import { Tags } from './Tags';
import { Tasks } from './Tasks';
import { Users } from './Users';
import { Results } from './Results';

export const AdminPage = () => {
   return (
      <Box sx={{ color: 'fpage.main' }}>
         <Stack direction='row' sx={{ gap: 2 }}>
            <MenuItemAdmin linkUrl='admin/admin-categories' linkText="Categories" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/admin-tags' linkText="Tags" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/admin-tasks' linkText="Tasks" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/admin-users' linkText="Users" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/admin-results' linkText="Results" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
         </Stack>
         <Box>
            <Routes>
               <Route path='admin-categories/*' element={<Categories />} />
               <Route path='admin-tags/*' element={<Tags />} />
               <Route path='admin-tasks/*' element={<Tasks />} />
               <Route path='admin-users/*' element={<Users />} />
               <Route path='admin-results/*' element={<Results />} />
            </Routes>
         </Box>
      </Box >
   )
}
type MenuItemAdmin = {
   linkUrl: string
   linkText: string
   Icon: JSX.Element
}

const MenuItemAdmin: React.FC<MenuItemAdmin> = ({ linkUrl, linkText, Icon }) => {
   return (
      <Button className={''}
         sx={{ backgroundColor: 'bgmode.main', color: 'fpage.main' }}
         size='large'
         startIcon={Icon} >
         <NavLink to={`/${linkUrl}`} style={{ color: 'inherit' }}>
            <Typography variant="caption" color="info" noWrap>{linkText}</Typography>
         </NavLink>
      </Button >
   )
}