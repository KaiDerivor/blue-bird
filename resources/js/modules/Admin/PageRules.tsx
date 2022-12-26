import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getRulesList } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { TableSimpleItem } from './TableSimpleItem'
import { createRule, deleteRule, getRulesInit, RuleRecordType, updateRule } from '../../redux/ruleReducer'
import { SearchBarCategory } from './SearchBarCategory'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'

export const RULE = 'RULE'

const Rules = React.memo(() => {

   const dispatch: any = useDispatch();
   const rules = useSelector(getRulesList)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)
   const categories = useSelector(getCategories)
   const searchFilter = (categoryId = '') => {
      dispatch(getRulesInit(categoryId))
   }
   useEffect(() => {
      return () => {
         if (rules.length <= 0)
            dispatch(getRulesInit())
         if (categories.length === 0)
            dispatch(getCategoriesInit())
      }
   }, [])
   const handleConfirm = (ruleId = 0, rule = {} as RuleRecordType) => {
      switch (switchHandler) {
         case CREATE: {
            dispatch(createRule(rule))
            break;
         }
         case UPDATE: {
            dispatch(updateRule(ruleId, rule))
            break;
         }
         case DELETE: {
            dispatch(deleteRule(ruleId))
            break;
         }
         default: {
            return;
         }
      }
   };
   return (
      <>
         <SearchBarCategory categories={categories} fnSearch={searchFilter} />
         <TableSimpleItem list={rules} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} typeDialog={RULE} switchHandler={switchHandler} />
      </>
   )
})

export default Rules
