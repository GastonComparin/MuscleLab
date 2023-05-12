import styles from './SignUp.module.css'

const SignUp=()=>{

    return(

        <div className={styles.container}>
        <div className={styles.log}>
            <h1>Create Acount</h1>
            <br />
            <h3>Name</h3>
            <input id="name" type="text" class="form-control"name="name" placeholder="Name..."></input>
            <h3>Phone</h3>
            <input id="phone" type="text" class="form-control"name="phone" placeholder="Phone"></input>
            <h3>Email</h3>
            <input id="email" type="text" class="form-control"name="email" placeholder="Email.."></input>
            <h3>Password</h3>
            <input id="password" type="text" class="form-control"name="password" placeholder="Password..."></input>
            <h3> Repeat password</h3>
        <input id="repeat password" type="text" class="form-control"name=" repeat password" placeholder="Repeat password..."></input>
            <br />
            
    
            <button className={styles.button3} >sign Up</button>
            
        </div>
    </div>
        )
}
export default SignUp;
