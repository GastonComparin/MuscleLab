import styles from './Review.module.css'
import axios from 'axios';
import { URL } from '../../utils/constants';
import { fetchLessonsByID } from '../../redux/features/lessonsSlice';

const Review = ()=>{


  // const [name, setName] = useState('');
  // const [review, setReview] = useState('');

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handleReviewChange = (event) => {
  //   setReview(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Aquí puedes implementar la lógica para enviar la reseña al servidor o almacenarla en algún lugar

  //   // Limpia los campos después de enviar la reseña
  //   setName('');
  //   setReview('');
  // };
  

return(

<div>
  
  <h1>review</h1>
  
<div className={styles.container}>




<div className={styles.rating}>
  <input value="star-1" name="star-radio" id="star-1" type="radio"/>
  <label for="star-1">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
  </label>
  <input value="star-1" name="star-radio" id="star-2" type="radio"/>
  <label for="star-2">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
  </label>
  <input value="star-1" name="star-radio" id="star-3" type="radio"/>
  <label for="star-3">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
  </label>
  <input value="star-1" name="star-radio" id="star-4" type="radio"/>
  <label for="star-4">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
  </label>
  <input value="star-1" name="star-radio" id="star-5" type="radio"/>
  <label for="star-5">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
  </label>
</div>

<h1>Comentario de la clase</h1>
<input type="text" placeholder='Descripcion' className={styles.text}/>

<button className={styles.button}>Enviar comentario</button>
</div>
</div>

    

)



}


export default Review;