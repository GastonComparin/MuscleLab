import styles from './NewLessons.module.css'
import { useDispatch, useSelector } from "react-redux";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {fetchAllLessonTypes, selectAllLessonTypes} from "../../redux/features/typesSlice"

const NewLessons= ()=>{
    const dispatch= useDispatch();
    const types = useSelector((state)=> state.types)
    const [checked, setChecked] = useState({})

    const [form, setForm] = useState({
        name: "",
        Effort:"",
        Goals:"",
        ScheduleDays:"",
        ScheduleHours:"",
        Description:"",
        Image:"",
        types:[],
    })

    

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
    })}

    const handleSelect = (e)=>{
        const typesId = e.target.value;
        const isChecked= e.target.checked;
  
        setChecked({
          ...checked,
          [typesId] : isChecked
        })
        setForm({
          ...form,
          types: isChecked
          ? [...form.types, typesId]
          : form.types.filter((id)=> id !== typesId)
        })
      }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch( axios.post('http://localhost:3001/lessons/create'))
    }

    useEffect(()=>{
        dispatch((fetchAllLessonTypes))
    }, []);
    
    return(
        <div className={styles.container}>
        <div className={styles.log}>
        <Link to='/home'><button className={styles.button1}>Volver</button></Link>
        <h1> Nueva Clase</h1>
        <label htmlFor="lessonName">Nombre</label>
                <input type="text" name="Lesson Name" value={form.name} onChange={handleChange} />


                <label htmlFor="Effort">Ezfuerzo</label>
                <input type="text" name="Effort" value={form.Effort} onChange={handleChange} />
                

                <label htmlFor="Goals">Metas</label>
                <input type="text" name="Goals" value={form.Goals} onChange={handleChange} />

                <label htmlFor="Schedule Days">Dias</label>
                <input type="text" name="Schedule Days" value={form.ScheduleDays} onChange={handleChange} />

                <label htmlFor="Schedule Hours">Horarios</label>
                <input type="text" name="Schedule Hours" value={form.ScheduleHours} onChange={handleChange} />

                <label htmlFor="Image">Imagen</label>
                <input type="text" name="Image" value={form.Image} onChange={handleChange} />

                <label htmlFor="Description">Descripcion</label>
                <input type="text" name="Description" value={form.Description} onChange={handleChange} />

                <div>
                {types.length ? (
              types.map((element) => {
                return (
                  <label>
                      <input
                        type="checkbox"
                        value={element.id}
                        name={element.name}
                        onChange={handleSelect}
                        />
                      {element.name}
                    </label>
                  );
                })
                ) : (
                  <div>waiting...</div>
                  )}
                </div>

        <button className={styles.button1} onChange={handleSubmit}>Create Lesson</button>
        </div>
        </div>
    )
}
export default NewLessons;