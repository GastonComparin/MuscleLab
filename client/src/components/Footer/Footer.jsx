import style from "./Footer.module.css"
import twitter from "../../assets/icons/twitter.png"
import facebook from "../../assets/icons/facebook.png"
import instagram from "../../assets/icons/instagram.png"
import linkedin from "../../assets/icons/linkedin.png"
import { Link } from "react-router-dom"
const Footer = () =>{
    return(
        <footer className={style.Footer}>
            <div className={style.IconContainer}>
                <div className={style.TwitterContainer}>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img className={`${style.Icon} ${style.Twitter}`} src={twitter} alt='Icono de twitter' />
                    </a>
                </div>
                <div>
                    <a href="https://es-la.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img className={style.Icon} src={facebook} alt='Icono de facebook' />
                    </a>
                </div>
                <div>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img className={style.Icon} src={instagram} alt='Icono de instagram' />
                    </a>
                </div>
                <div className={style.LinkedinContainer}>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img className={`${style.Icon} ${style.Linkedin}`} src={linkedin} alt='Icono de linkedin' />
                    </a>
                </div>
            </div>
            <div className={style.InfoContainer}>
                <div className={style.Container}>
                    <div className={style.Info}>
                        <h3>Información</h3>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                    </div>
                    <div className={style.Info}>
                        <h3>Navegación</h3>
                        <Link to={'/clases'}> <p>Clases</p></Link>
                        <Link to={'/sedes'}> <p>Sedes</p></Link>
                        <Link to={'/contactanos'}> <p>Contáctanos</p></Link>
                    </div>
                    <div className={style.Info}>
                        <h3>Nosotros</h3>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                    </div>
                    <div className={style.Info}>
                        <h3>Sedes</h3>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer