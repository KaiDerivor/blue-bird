import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedTasks, getSavedTasks } from '../../redux/appSelector'
import { initSavedTasks } from '../../redux/taskReducer'
import { SectionSavCategory } from "./SectionSavCategory"


export type ListItemSaveType = {
   title: string
   subtitle: string
   category: string
   id: string
   imgUrl: string
   content: string
   taskId: number
   numberOfTask: string
}
export const SavingsItems = React.memo(() => {
   const dispatch: any = useDispatch()
   const likedTasks = useSelector(getLikedTasks)
   const taskSavings = useSelector(getSavedTasks)
   const [savedTasks, setSavedTasks] = useState([] as Array<ListItemSaveType>)
   useEffect(() => {
      console.log(savedTasks)
      return () => {
         likedTasks.length > 0 && savedTasks.length === 0 && dispatch(initSavedTasks(likedTasks))
      };
   }, [])
   useEffect(() => {
      if (taskSavings.length > 0 && savedTasks.length === 0) {
         let initSavedTasks = [] as Array<ListItemSaveType>
         for (const it of taskSavings) {
            initSavedTasks.push({
               title: `Категорія: ${it.category.title.toLocaleLowerCase()}`,
               subtitle: `${it.tag.title}`,
               category: it.category.slug,
               id: it.tag.slug,
               content: JSON.parse(it.test_qa)?.question ? JSON.parse(it.test_qa)?.question : '',
               imgUrl: it?.task ? it.task : '',
               taskId: it.id,
               numberOfTask: `${it.numberOfTask}`
            })
         }
         setSavedTasks(initSavedTasks)
      }
   }, [taskSavings])
   return (
      <>
         <SectionSavCategory title="Збережені завдання" subtitle='Збережені завдання' listSavings={savedTasks} />
      </>
   )
})