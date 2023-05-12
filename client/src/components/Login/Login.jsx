import styles from './Login.module.css' 


 const Login=() =>{


    return(
<div className={styles.container}>
    <div className={styles.log}>
        <h1>User login</h1>
        <br />
        <h3>Username</h3>
        <input id="usuario" type="text" class="form-control"name="username" placeholder="Username..."></input>
        <h3>Password</h3>
        <input id="contraseña" type="text" class="form-control"name="password" placeholder="Password..."></input>
        <br />
        

        <button className={styles.button4}> LOGIN </button>
        
    </div>
</div>
    )
}

export default Login;