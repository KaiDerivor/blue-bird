import { CategoryRecordType } from "../../redux/catReducer"
import { TagRecordType } from "../../redux/tagReducer";

export const detectItem = (id: string | undefined, list: Array<CategoryRecordType | TagRecordType>) => {
   let item = list.filter(el => `${el.id}` === `${id}`);
   if (item[0]?.title) {
      return item[0].title;

   } else {
      return ''
   }
}

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