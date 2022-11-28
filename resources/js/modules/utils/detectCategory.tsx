import { CategoryRecordType } from "../../redux/catReducer"

export const detectCategory = (categories: Array<CategoryRecordType>, params) => {
   if (categories.length > 0) {
      for (const category of categories) {
         if (category.textUrl === params.category) {
            return category
         }
      }
   }
   return { title: '', tags: [], description: '',id:0,textUrl:'' }
}