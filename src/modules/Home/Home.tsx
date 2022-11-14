import Container from '@mui/material/Container'
import { createRef, useRef } from 'react';
import { WavesDivider } from '../common/WavesDivider';
import { HomeContent } from './HomeContent';
import { HomeHeader } from './HomeHeader'

export const Home = () => {
   const block1 = useRef(null);
   const block2 = useRef(null);
   const block3 = createRef();
   const blocks = [block1, block2, block3]
   return (
      <Container maxWidth="xl" disableGutters >
         <HomeHeader block1={block1} block2={block2} />
         <HomeContent blocks={blocks} />
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque debitis, quidem aliquid porro eligendi veniam tempore explicabo error similique voluptas quam illo temporibus consectetur, ex eveniet consequuntur aperiam voluptatem.
         Corrupti, adipisci officiis odit facilis fugit molestiae eum, culpa modi possimus iste, ullam illo amet sed minima aspernatur voluptate explicabo recusandae aut sint nostrum nobis maxime praesentium. Eveniet, eius repellendus?
         Expedita deleniti dolor iure! Veritatis, reprehenderit porro vel deserunt nobis tempore. Voluptates eum autem quae eveniet quidem molestiae vero quod? Non est itaque, dolore quibusdam iure nam pariatur reprehenderit delectus.
         Consequatur tenetur rerum nobis. Voluptatem quo consequatur dicta eaque voluptates! Inventore ullam ipsa debitis provident vero fugiat labore totam hic enim, quidem saepe molestiae sed vitae laboriosam asperiores temporibus deserunt!
         Officia aperiam maiores exercitationem ullam sapiente beatae sed accusantium. Recusandae quo consequuntur animi qui temporibus excepturi hic soluta voluptas, cupiditate veritatis aut maiores quia. Perspiciatis voluptatum earum fugit totam iste?
         Libero blanditiis velit voluptatum inventore aperiam dolorum maxime nesciunt minima asperiores ducimus. Fugit at quam expedita laboriosam, in eum ducimus cum dolore numquam ab, exercitationem, quas nihil porro quos magni?
         Vitae quo eligendi dolores rem nisi! Officiis repudiandae distinctio, velit consequuntur provident atque, deleniti cupiditate, dignissimos iusto dolore sint. Qui laudantium nemo ex porro provident? Aperiam iste velit in animi?
         Nemo dolorem blanditiis voluptas, maxime consectetur aliquam voluptatum? Soluta nemo adipisci voluptatem ut veritatis dolorum mollitia, rem at voluptates quam consectetur consequuntur necessitatibus maxime molestias quisquam cum in voluptatibus. Necessitatibus.
         Ullam accusamus molestiae adipisci deserunt, molestias vitae quam in. Saepe quisquam beatae, repellat laborum quos praesentium repudiandae accusantium recusandae quasi sapiente officiis quod exercitationem ab asperiores molestias neque consectetur amet.
         Suscipit nostrum autem animi quis necessitatibus soluta obcaecati vero fugiat laboriosam itaque similique placeat, tempore aperiam voluptate ipsa at voluptatum doloremque consequatur iste. Architecto alias impedit recusandae dignissimos omnis repudiandae.
      </Container>
   )
}