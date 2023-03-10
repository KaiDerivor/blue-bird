import { CategoryRecordType, CategoryType } from "../../redux/catReducer"
import { TagRecordType, TagType } from "../../redux/tagReducer";
import { ThemeType } from "../../redux/themeReducer";

export const detectItem = (id: string | undefined, list: Array<CategoryType | TagType>) => {
   let item = list.filter(el => `${el.id}` === `${id}`);
   if (item[0]?.title) {
      return item[0].title;

   } else {
      return ''
   }
}

export const detectCategory = (categories: Array<CategoryType>, params) => {
   if (categories.length > 0) {
      for (const category of categories) {
         if (category.slug === params.category) {
            return category
         }
      }
   }
   return {} as CategoryType
}
export const detectTag = (tags: Array<TagType>, params) => {
   if (tags.length > 0) {
      for (const tag of tags) {
         if (tag.slug === params.tag) {
            return tag
         }
      }
   }
   return {} as TagType
}

export const detectTheme = (themes: Array<ThemeType>, slug) => {
   if(slug==='all')return {id:''}
   if (themes.length > 0) {
      for (const theme of themes) {
         if (theme.slug === slug) {
            return theme
         }
      }
   }
   return {} as TagType
}