import React from 'react'
import { Route, Routes } from "react-router-dom"
import { FormLog } from './FormLog';
import FormRegContainer from './FormRegContainer';

const AuthRouter = ():JSX.Element => {
   return (
      <Routes>
         <Route path="/login" element={<FormLog />} />
         <Route path="/register" element={<FormRegContainer />} />
      </Routes>
   )
}
export default AuthRouter;