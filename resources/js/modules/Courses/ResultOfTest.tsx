import React from 'react';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { TaskType } from '../../redux/taskReducer';
import { AnswerField } from './AnswerField';
import { URL_STORAGE } from '../../redux/appReducer';
import { CategoryRecordType } from '../../redux/catReducer';

type ResultOfTestType = {
   currCategory:CategoryRecordType
   test: Array<TaskType>
   userAnswers: any
   currTagUrl: string
}
export const ResultOfTest: React.FC<ResultOfTestType> = ({currCategory, test, userAnswers, currTagUrl }) => {
   const displayAllTasks = () => {
      let tasks = [] as Array<JSX.Element>
      for (const task of test) {
         tasks.push(<Box key={task.id}>
            <div>
               <img src={`${URL_STORAGE}${task.task}`} alt={`${currCategory.textUrl}-${currTagUrl}-${task.number_of_task}`} />
            </div>
            <div>{task.number_of_task}</div>
            <AnswerField
               task={task}
               userAnswers={userAnswers}
               isAsAnswer
            />
         </Box>
         )

      }
      return tasks;
   }
   return (
      <Fade in={true}>
         <Box >
            <Box sx={{ mb: 5, p: 2, backgroundColor: 'bgmode.main' }}>
               100/100
            </Box>
            <Box>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, beatae. Odit exercitationem, fugiat reiciendis eaque quibusdam blanditiis unde ex quas repellendus, velit consectetur optio at porro aperiam impedit voluptate laboriosam?
               Voluptate voluptas rem nam labore tempore possimus eligendi laboriosam! Consequuntur, perspiciatis fugiat ipsam voluptatum illum quae dolores sed quis odio accusamus temporibus aut vero omnis quam error quia harum facilis.
               Neque impedit cum voluptate qui ad voluptas, nisi suscipit vero velit numquam fugiat incidunt ut minus, aut corporis dolores ea? Ab, deleniti! Voluptates non itaque sint fuga cum excepturi natus?
               Cumque ipsa, accusamus eum tempore nulla harum distinctio corrupti delectus ipsam id ducimus consequatur veniam suscipit aspernatur doloribus minus ullam est beatae magni dignissimos nam tenetur placeat blanditiis. Magni, eaque.
               Voluptas quis sequi atque. Dicta beatae voluptatem dolores molestiae? Eos non dicta eligendi reiciendis officiis nisi fuga iste hic tenetur exercitationem culpa est, assumenda nobis inventore unde aliquam! Eaque, corrupti.
            </Box>
            <Box>
               {displayAllTasks()}
            </Box>
         </Box>
      </Fade>
   )
}