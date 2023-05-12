import style from "./Footer.module.css"
import twitter from "../../assets/icons/twitter.png"
import facebook from "../../assets/icons/facebook.png"
import instagram from "../../assets/icons/instagram.png"
import linkedin from "../../assets/icons/linkedin.png"
const Footer = () =>{
    return(
        <footer className={style.Footer}>
            <div className={style.IconContainer}>
                <div className={style.TwitterContainer}>
                    <img className={`${style.Icon} ${style.Twitter}`} src={twitter} alt='Icono de twitter' />
                </div>
                <div>
                    <img className={style.Icon} src={facebook} alt='Icono de facebook' />
                </div>
                <div>
                    <img className={style.Icon} src={instagram} alt='Icono de instagram' />
                </div>
                <div className={style.LinkedinContainer}>
                    <img className={`${style.Icon} ${style.Linkedin}`} src={linkedin} alt='Icono de linkedin' />
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
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
                        <p>Aqui va la info</p>
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