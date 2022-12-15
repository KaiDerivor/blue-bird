import React, { Suspense } from 'react'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography'
import { NavLink, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Loader } from '../common/Loader';

const Categories = React.lazy(() => {
   return Promise.all([
      import('./Categories'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([Categories]) => Categories)
})
const Tags = React.lazy(() => {
   return Promise.all([
      import('./Tags'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([Tags]) => Tags)
})
const Tasks = React.lazy(() => {
   return Promise.all([
      import('./Tasks'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([Tasks]) => Tasks)
})
const Users = React.lazy(() => {
   return Promise.all([
      import('./Users'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([Users]) => Users)
})
const Results = React.lazy(() => {
   return Promise.all([
      import('./Results'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([Results]) => Results)
})
const DataEvents = React.lazy(() => {
   return Promise.all([
      import('./DataEvents'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([DataEvents]) => DataEvents)
})
const CategoryTags = React.lazy(() => {
   return Promise.all([
      import('./CategoryTags'),
      new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([CategoryTags]) => CategoryTags)
})

const AdminPage = () => {
   return (
      <Box sx={{ color: 'fpage.main' }}>
         <Stack direction='row' sx={{ gap: 2, flexWrap: 'wrap' }}>
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
               <Route path='categories/*' element={
                  <Suspense fallback={<Loader />}>
                     <Categories />
                  </Suspense>
               }/>
               <Route path='tags/*' element={
                  <Suspense fallback={<Loader />}>
                     <Tags />
                  </Suspense>
               }/>
               <Route path='tasks/*' element={
                  <Suspense fallback={<Loader />}>
                     <Tasks />
                  </Suspense>
               }/>
               <Route path='users/*' element={
                  <Suspense fallback={<Loader />}>
                     <Users />
                  </Suspense>
               }/>
               <Route path='results/*' element={
                  <Suspense fallback={<Loader />}>
                     <Results />
                  </Suspense>
               }/>
               <Route path='events/*' element={
                  <Suspense fallback={<Loader />}>
                     <DataEvents />
                  </Suspense>
               }/>
               <Route path='category-tags/*' element={
                  <Suspense fallback={<Loader />}>
                     <CategoryTags />
                  </Suspense>
               }/>
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
export default AdminPage