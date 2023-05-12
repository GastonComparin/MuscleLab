import React from 'react';
import style from './NavBar.module.css';
import iconMan from './../../assets/icons/man-silhouette.png';
import iconWeight from '../../assets/icons/dumbbell.png';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';

const NavBar = ()=>{

    const handleClickLogo = () => {
        window.location.href = '/';
    };

     return (
        <>
        <nav className={style.nav}>
            <div className={style.IconContainer} onClick={handleClickLogo}>
                <img className={style.IconMan} src={iconMan} alt='Icono silueta de hombre' />
                <h2>Muscle Lab</h2>
                <img className={style.IconWeight} src={iconWeight} alt='Icono de pesa' />               
            </div>
            <div className={style.OpcionsContainer}>
                <Link to = {'/sedes'}>
                    <p className={style.Navbutton}>Sedes</p>
                </Link>

                <Link to = {'/clases'}>
                    <p className={style.Navbutton}>Clases</p>
                </Link>

                <Link to = {'/nosotros'}>
                    <p className={style.Navbutton}>Nosotros</p>
                </Link>

                <Link to = {'/contactanos'}>
                    <p className={style.Navbutton}>Contáctanos</p>
                </Link>

            </div>
            <button className={style.btnPlanes}>Planes</button>

            <div className={style.LogOpcions}>
                <Link to={'/login'}> 
                    <button className={style.btnInicioSesion}>Inicia sesión</button>
                </Link> 
                <Link to={'/sign-up'}>
                    <button className={style.btnRegistro}>Regístrate</button>
                </Link>
            </div>
            
        </nav>
        
        </>
     )
}


export default NavBar;
