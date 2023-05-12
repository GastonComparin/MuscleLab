import styles from './SignUp.module.css'    
import axios from 'axios'
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

const SignUp=()=>{
    const dispatch= useDispatch();


    const [form, setForm] = useState({
        fullName: "",
        email:"",
        phone:"",
        password:"",
        isMonitor:"",
        })


        const handleChange =(e)=>{
            setForm({
                ...form,
                [e.target.name]: e.target.value
        })}

        const handleSubmit=(e)=>{
            e.preventDefault();
            dispatch( axios.post('http://localhost:3001/users/create'))
        }

    return(

        <div className={styles.container}>
        <div className={styles.log}>
            <h1>Crear Cuenta</h1>
            <br />
            <label htmlFor="FullName">Nombre completo</label>
                <input type="text" name="fullname" value={form.fullName} onChange={handleChange} />

                <label htmlFor="Email">Email</label>
                <input type="text" name="email" value={form.email} onChange={handleChange} />

                <label htmlFor="Phone">Telefono</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} />

                <label htmlFor="password">Contraseña</label>
                <input type="text" name="password" value={form.password} onChange={handleChange} />
            
    
            <button className={styles.button3} onChange={handleSubmit} >sign Up</button>
            
        </div>
    </div>
        )
}
export default SignUp;
