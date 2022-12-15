import React from 'react'
import { SectionSavCategory } from "./SectionSavCategory"

const stateList = {
   title: 'Збережені записи',
   subtitle: 'Збережені записи',
   listSavings: [
      {
         title: 'Lizard',
         subtitle: 'Lizards are a widespread group of squamate reptiles, with over 6,000\nspecies, ranging across all continents except Antarctica',
         category: 'courses',
         id: 'lizard',
         imgUrl: 'https://source.unsplash.com/random/?physic'
      },
      {
         title: 'turles',
         subtitle: 'With over 6,000\nspecies, ranging across all continents except Antarctica',
         category: 'courses',
         id: 'turles',
         imgUrl: 'https://source.unsplash.com/random/?history'

      },
      {
         title: 'Lorem',
         subtitle: 'Lorem ipsum dolor sit amet consectetur adipicing elit',
         category: 'courses',
         id: 'lorem',
         imgUrl: 'https://source.unsplash.com/random/?matematic'

      },
      {
         title: 'Nebula',
         subtitle: 'Clarior est solito post maxima nebula',
         category: 'courses',
         id: 'nebula',
         // imgUrl: 'https://source.unsplash.com/random/?ukraine,landscape'
         imgUrl: 'https://source.unsplash.com/random/?viburnum,ukrainian'
      },
   ]
}

export const SavingsItems =React.memo( () => {
   return (
      <>
         <SectionSavCategory title="Збережені записи" subtitle='Збережені записи' listSavings={stateList.listSavings} />
         <SectionSavCategory title="Збережені завдання" subtitle='Збережені завдання' listSavings={stateList.listSavings} />
         <SectionSavCategory title="Збережені параграфи" subtitle='Збережені параграфи' listSavings={stateList.listSavings} />
      </>
   )
})