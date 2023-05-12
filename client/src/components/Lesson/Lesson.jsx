import React from 'react';
import { Link } from 'react-router-dom';
import style from './Lesson.module.css';
const Lesson = ({lesson, index}) => {
    const {name, description, image} = lesson;
  
    
    const cardType = index % 2 === 0 ? 'Right' : 'Left';

    return (
        <div className={style.Card}>
          {cardType === 'Right' ? (
            <>
              <div className={style.ImageContainer}>
                <img src={image} alt={name} />
              </div>
              <div className={style.InfoContainer}>
                <h2>{name}</h2>
                <p>{description}</p>
                <Link to={'/clases/detalles'}>
                  <button>Más info</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={style.InfoContainer}>
                <h2>{name}</h2>
                <p>{description}</p>
                <Link to={'/clases/detalles'}>
                  <button>Más info</button>
                </Link>
              </div>
              <div className={style.ImageContainer}>
                <img src={image} alt={name} />
              </div>
            </>
          )}
        </div>
      );
      
}

export default Lesson;