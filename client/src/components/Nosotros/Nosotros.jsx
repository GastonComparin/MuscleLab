import React from "react";
import { Link } from "react-router-dom";
import style from "./Nosotros.module.css"
import sujeto from "../../assets/images/nosotros/sujeto-con-pesas.jpeg";
import pareja from "../../assets/images/home/pareja-pateando-saco.jpg"

const Nosotros = ()=>{
    return (
        <div>
            <div className={style.conteiner}>
           
           <div>
            <h2 className={style.titulo}>MuscleLab</h2>
           </div>

            <div className={style.contieneparrafos}>
                <div className={style.div1}>
           <h2 className={style.texto1}>
            En MuscleLab, nos apasiona ayudarte a alcanzar tus objetivos de salud y fitness. Nuestro gimnasio está diseñado para brindarte un ambiente motivador y de alto rendimiento, donde puedes entrenar de manera segura y efectiva!
            Nuestro equipo de entrenadores altamente capacitados está aquí para ofrecerte orientación y apoyo personalizados en tu viaje hacia una vida más saludable. Ya sea que estés buscando perder peso, tonificar tu cuerpo, ganar fuerza o mejorar tu resistencia, estamos comprometidos a proporcionarte las herramientas y los conocimientos necesarios para lograrlo.
           </h2>
           <img src={sujeto} alt="sujeto con pesas" className={style.imgSujeto} />
           </div>

            
            </div>

        <div className={style.div3}>
            <img src={pareja} alt="pareja"  className={style.imgSujeto2}/>
            <h2 className={style.texto2}>
            Contamos con instalaciones de última generación que incluyen una amplia gama de equipos de alta calidad, áreas dedicadas para entrenamiento cardiovascular y de fuerza, así como espacios para clases grupales dinámicas y divertidas. Ofrecemos una variedad de clases, desde entrenamiento funcional hasta clases de yoga, pilates y mucho más.
            Creemos en la importancia de crear una comunidad sólida de personas comprometidas con su bienestar. 
            ¡Únete a MuscleLab y descubre el poder de tu potencial físico! Estamos aquí para ayudarte a transformar tu cuerpo, mejorar tu salud y alcanzar un estilo de vida activo y equilibrado. ¡Te esperamos con los brazos abiertos en nuestro gimnasio!
            </h2>
        </div>

        
        </div>
            <div className={style.divbtn}>
            <Link to = {'/clases'}>
        <button className={style.Button}>Mira nuestras clases</button>
        </Link>
            </div>
                </div>
    )
}



export default Nosotros;