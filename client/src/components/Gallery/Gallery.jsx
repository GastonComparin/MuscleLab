import style from './Gallery.module.css';
import arrow from '../../assets/icons/arrow-white.png';
import img1 from '../../assets/images/home/hombre-joven-fitness-estudio.jpg';
import img2 from '../../assets/images/home/mujer-pesas.jpg';
import img3 from '../../assets/images/home/hombre-brazos-extendidos.jpg';
import { useRef } from 'react';
import { useState } from 'react';


const Gallery = ({handleOnclick}) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const slideShow = useRef(null);
    const images = [img1, img2, img3];
    const totalSlides = images.length;

    const nextSlide = () => {
        if (slideShow.current.children.length > 0) {
            const firstElement = slideShow.current.children[0];
            const sizeSlide = firstElement.offsetWidth;
            
            slideShow.current.style.transition = `300ms ease-out all`;
            slideShow.current.style.transform = `translateX(-${sizeSlide}px)`;
    
            const transition = () => {
                slideShow.current.style.transition = `none`;
                slideShow.current.style.transform = `translateX(0)`;
                slideShow.current.appendChild(firstElement);
                slideShow.current.removeEventListener('transitionend', transition);
                setCurrentSlide(currentSlide === totalSlides ? 1 : currentSlide + 1);
            };
    
            slideShow.current.addEventListener('transitionend', transition);
        }
    };
    
    const prevSlide = () => {
        if (slideShow.current.children.length > 0) {
          const index = slideShow.current.children.length - 1;
          const lastElement = slideShow.current.children[index];
          const sizeSlide = lastElement.offsetWidth;
      
          slideShow.current.insertBefore(lastElement, slideShow.current.firstChild);
          slideShow.current.style.transform = `translateX(-${sizeSlide}px)`;
      
          setTimeout(() => {
            slideShow.current.style.transition = `300ms ease-out all`;
            slideShow.current.style.transform = `translateX(0)`;
          }, 50);
          setCurrentSlide(currentSlide === 1 ? totalSlides : currentSlide - 1);
        }
      };
       


    return (
        <div className={style.DivContainer}>
            <div className={style.SlideShow} ref={slideShow}>

                <div className={style.Slide}>
                    <div className={style.TextImg}>
                        <h2 className={style.TextImg}>Supera tus límites</h2>
                        <button className={`${style.btnPlanes} ${style.TextImg}`} onClick={handleOnclick}>Mira nuestros planes</button>
                    </div>
                    <img src={images[0]} alt='Imagen de hombre haciendo ejercicio' className={style.ImageContainer1} onClick={handleOnclick}/>

                </div>

                <div className={style.Slide}>
                    <img src={images[1]} alt='Imagen de mujer levantando pesas' className={style.ImageContainer2} onClick={handleOnclick}/>
                </div>

                <div className={style.Slide}>
                    <img src={images[2]} alt='Imagen de hombre con los brazos extendidos' className={style.ImageContainer3} onClick={handleOnclick}/>
                </div>

            </div>
            <div className={style.Arrows}>
                <img src={arrow} alt='Flecha de navegación' className={style.ArrowLeft} onClick={prevSlide}/>
                <h2>{`${currentSlide}/${totalSlides}`}</h2>
                <img src={arrow} alt='Flecha de navegación' className={style.ArrowRight} onClick={nextSlide}/>
            </div>
        </div>
    )
}
    export default Gallery;