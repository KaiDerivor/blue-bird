import { TaskType } from "../../redux/taskReducer";

export const defineTaskPoint = (task: TaskType, answer: string | undefined): number => {


   if (!answer) {
      return 0;
   }
   switch (task.task_type) {
      case 'letter5': {
         return +(task.answer === answer)
      }
      case 'letter4': {
         return +(task.answer === answer)
      }
      case 'letters3': {
         const rightAnswers = task.answer.split('')
         const userAnswers = answer.split('')
         return +(rightAnswers[0] === userAnswers[0]) + +(rightAnswers[1] === userAnswers[1]) + +(rightAnswers[2] === userAnswers[2])
      }
      case 'letters': {
         const rightAnswers = task.answer.split('')
         const userAnswers = answer.split('')
         return +(rightAnswers[0] === userAnswers[0]) + +(rightAnswers[1] === userAnswers[1]) + +(rightAnswers[2] === userAnswers[2]) + +(rightAnswers[3] === userAnswers[3])
      }
      case 'range1': {
         return task.answer === answer ? 2 : 0
      }
      case 'range2': {
         const rightAnswers = task.answer.split(',')
         const userAnswers = answer.split(',')
         return +(rightAnswers[0] === userAnswers[0]) + +(rightAnswers[1] === userAnswers[1])
      }
      case 'range3': {
         const rightAnswers = task.answer.split('')
         const userAnswers = answer.split('')
         return +(rightAnswers[0] === userAnswers[0]) + +(rightAnswers[1] === userAnswers[1]) + +(rightAnswers[2] === userAnswers[2])
      }
      default: {
         return 0;
      }
   }
}