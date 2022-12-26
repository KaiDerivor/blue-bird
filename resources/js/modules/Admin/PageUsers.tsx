import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'
import { getUsers } from '../../redux/appSelector'
import { deleteuser, getUsersInit, updateUser, UserRecordType } from '../../redux/userReducer'
import { SearchBarUser } from './SearchBarUser'
import { TableUsers } from './TableUsers'
import Box from '@mui/material/Box'

const Users = React.memo(() => {

   const dispatch: any = useDispatch();
   const users = useSelector(getUsers)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)

   useEffect(() => {
      return () => {
         if (!users || users.length <= 0)
            dispatch(getUsersInit())
      }
   }, [])
   const handleConfirm = (userId = '' as string | number, user: UserRecordType = {}) => {
      switch (switchHandler) {

         case UPDATE: {
            dispatch(updateUser(userId, user))
            break;
         }
         case DELETE: {
            dispatch(deleteuser(userId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <>
         <Box sx={{ p: 2 }}>
            <SearchBarUser />
         </Box>
         <TableUsers list={users} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} switchHandler={switchHandler} />
      </>
   )
})

export default Users
