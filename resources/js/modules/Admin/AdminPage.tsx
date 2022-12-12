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
import { DataEvents } from './DataEvents';
import { CategoryTags } from './CategoryTags';

export const AdminPage = () => {
   return (
      <Box sx={{ color: 'fpage.main' }}>
         <Stack direction='row' sx={{ gap: 2,flexWrap:'wrap' }}>
            <MenuItemAdmin linkUrl='admin/categories' linkText="Categories" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/tags' linkText="Tags" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/tasks' linkText="Tasks" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/users' linkText="Users" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/results' linkText="Results" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/events' linkText="Events" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
            <MenuItemAdmin linkUrl='admin/category-tags' linkText="Category Tag" Icon={<AppsIcon sx={{ color: 'inherit' }} />} />
         </Stack>
         <Box>
            <Routes>
               <Route path='categories/*' element={<Categories />} />
               <Route path='tags/*' element={<Tags />} />
               <Route path='tasks/*' element={<Tasks />} />
               <Route path='users/*' element={<Users />} />
               <Route path='results/*' element={<Results />} />
               <Route path='events/*' element={<DataEvents />} />
               <Route path='category-tags/*' element={<CategoryTags />} />
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