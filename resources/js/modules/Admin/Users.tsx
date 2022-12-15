import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/appSelector'
import { AppDispatch } from '../../redux/store'
import { deleteuser, getUsersInit, updateUser, UserRecordType } from '../../redux/userReducer'
import { TableUsers } from './TableUsers'

const Users = React.memo(() => {

   const dispatch: AppDispatch = useDispatch();
   const users = useSelector(getUsers)
   const [switchHandler, setSwitchHandler] = useState('save')

   useEffect(() => {
      return () => {
         if (!users || users.length <= 0) //@ts-ignore
            dispatch(getUsersInit())
      }
   }, [])
   const handleConfirm = (userId = '' as string | number, user: UserRecordType = {}) => {
      switch (switchHandler) {

         case 'update': {
            //@ts-ignore
            dispatch(updateUser(userId, user))
            break;
         }
         case 'delete': {
            //@ts-ignore
            dispatch(deleteuser(userId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableUsers list={users} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} />
   )
})

export default Users
