import style from './Login.module.css' 


 const Login = () => {
    return(
        <div className= {style.BGContainer}>
            <div className= {style.Container}>
                <h1>Inicia Sesión</h1>
                <h2 className={style.Description}>Para continuar con MuscleLab</h2>

                <input type="text" name="" id="" placeholder="Usuario o Correo"/>

                <input type="text" name="" id="" placeholder= "Contraseña"/>

                <h2 className={style.ForgotPassword}>¿Olvidaste tu contraseña?</h2>

                <button className={style.ButtonLogIn}>Iniciar sesión</button>

                <button className= {style.ButtonCreate}>Crea una cuenta</button>
            </div>
        </div>
    )
}

export default Login;