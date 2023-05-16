import styles from './SignUp.module.css'    
import axios from 'axios'
import { useState, useEffect } from "react";
import { validate } from "./Validation";


const SignUp= () => {
  const [form, setForm] = useState({
    fullName: "",
    email:"",
    phone:"",
    password:"",
    isMonitor:"",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email:"",
    phone:"",
    password:"",
    isMonitor:"",
  });
  //!FUNCIONES
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      errors.fullName ||
      errors.email ||
      errors.phone ||
      errors.password ||
      errors.isMonitor 
    ) {
      alert("Debe completar los campos obligatorios y corregir los errores.");
    } else {
      axios
      .post("http://localhost:3001/users/create", form)
      .then((res) => {
        alert("Usuario creado correctamente");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          alert(`Error:${error.response.data}`);
        } else {
          alert(`Error: ${error.message}`);
        }
      });
    }
  };
  const changeHandler = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const fieldErrors = validate(field, value);
    setErrors({ ...errors, [field]: fieldErrors[field] });
    setForm({ ...form, [field]: value });
  };

  const blurHandler = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    if (!value) {
      setErrors({ ...errors, [field]: "" });
    }
  };

 

  return (
    <div className={styles.container}>
      <h1>CREA UN USUARIO</h1>
      <p>
        {" "}
        Rellena todos los campos del siguiente formulario para crear un usuario.
      </p>
      <form onSubmit={submitHandler} className={styles.FormContainer}>
        <div className={styles.individual}>
          <label className={styles.Label}>Nombre*</label>
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Nombre del Usuario"
          />
          {errors.fullname && <div styles={{ color: "red" }}>{errors.fullname}</div>}
        </div>

        <div className={styles.individual}>
          <label className={styles.Label}>Correo electronico*</label>
          <input
            name="email"
            type="text"
            value={form.email}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Coloque un email"
          />
          {errors.email && (
            <div styles={{ color: "red" }}>{errors.email}</div>
          )}
        </div>
        <div className={styles.individual}>
          <label className={styles.Label}>Numero telefonico*</label>
          <input
            name="phone"
            type="text"
            value={form.phone}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Coloque un numero telefonico"
          />
          {errors.phone && (
            <div style={{ color: "red" }}>{errors.phone}</div>
          )}
        </div>

        <div className={styles.individual}>
          <label className={styles.Label}>Contraseña*</label>
          <input
            name="password"
            type="text"
            value={form.password}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Coloque una contraseña"
          />
          {errors.password && <div styles={{ color: "red" }}>{errors.password}</div>}
        </div>


        <button type="submit" className={styles.BtnSubmit}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default SignUp;
