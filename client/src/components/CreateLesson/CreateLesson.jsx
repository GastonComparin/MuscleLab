import style from "./CreateLesson.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllLessonTypes,
  fetchAllLessonTypes,
} from "../../redux/features/typesSlice";
import { useState, useEffect } from "react";
import { validate } from "./Validation";
import { weekDays } from "../../utils/constants";

const CreateLesson = () => {
  const dispatch = useDispatch();
  const lessonTypes = useSelector(selectAllLessonTypes);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [dias, setDias] = useState([]);
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    effort: "",
    goals: "",
    shortDescription: "",
    scheduleDays: [],
    scheduleHourStart: "",
    scheduleHourFinish: "",
    types: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    effort: "",
    goals: "",
    shortDescription: "",
    scheduleDays: [],
    scheduleHourStart: "",
    scheduleHourFinish: "",
    types: [],
  });
  //!FUNCIONES
  const submitHandler = (e) => {
    
    e.preventDefault();

    if (
      errors.name ||
      errors.description ||
      errors.goals ||
      errors.effort ||
      errors.shortDescription ||
      !validateHours() ||
      !validatedays() ||
      !validateTypes()
    ) {
      alert("Debe completar los campos obligatorios y corregir los errores.");
    } else {
      axios
        .post("http://localhost:3001/lessons/create", form)
        .then((res) => {
          alert("Lesson creada correctamente");
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

  const generateHourOptions = () => {
    const options = [];
    for (let i = 1; i <= 24; i++) {
      if (i > horaInicio) {
        options.push(
          <option key={i} value={i}>
            {i}:00
          </option>
        );
      }
    }
    return options;
  };
  const handleDiaChange = (e) => {
    const dia = e.target.value;
    const isChecked = e.target.checked;
    const updatedDias = isChecked
      ? [...dias, dia]
      : dias.filter((d) => d !== dia);
    setDias(updatedDias);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    const isChecked = e.target.checked;
    const updatedTypes = isChecked
      ? [...types, type]
      : types.filter((t) => t !== type);
    setTypes(updatedTypes);
  };
  const validateHours = () => {
    if (!horaInicio) {
      errors.scheduleHourStart = "Debe seleccionar hora de inicio";
      alert("debe seleccionar hora de inicio");
      return false;
    } else if (!horaFin) {
      errors.scheduleHourFinish = "Debe seleccionar hora de fin";
      alert("debe seleccionar hora de fin");
      return false;
    } else {
      form.scheduleHourStart = horaInicio;
      form.scheduleHourFinish = horaFin;
      return true;
    }
  };

  const validatedays = () => {
    if (dias.length !== 0) {
      form.scheduleDays = dias;
      return true;
    } else {
      errors.scheduleDays = "Debe seleccionar al menos un día";
      alert("Debe seleccionar al menos un día");
      return false;
    }
  };
  const validateTypes = () => {
    if (types.length !== 0) {
      form.types = types;
      return true;
    } else {
      errors.types = "Debe seleccionar al menos un tipo";
      alert("Debe seleccionar al menos un tipo de ejercicio");
      return false;
    }
  };

  useEffect(() => {
    dispatch(fetchAllLessonTypes());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h1>CREA UNA CLASE</h1>
      <p>
        {" "}
        Rellena todos los campos del siguiente formulario para crear una clase.
      </p>
      <form onSubmit={submitHandler} className={style.FormContainer}>
        <div className={style.individual}>
          <label className={style.Label}>Nombre*</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Nombre de la clase"
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div className={style.individual}>
          <label className={style.Label}>Descripción*</label>
          <input
            name="description"
            type="text"
            value={form.description}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Descripción de la clase"
          />
          {errors.description && (
            <div style={{ color: "red" }}>{errors.description}</div>
          )}
        </div>
        <div className={style.individual}>
          <label className={style.Label}>ShortDescripción*</label>
          <input
            name="shortDescription"
            type="text"
            value={form.shortDescription}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Descripción corta de la clase"
          />
          {errors.shortDescription && (
            <div style={{ color: "red" }}>{errors.shortDescription}</div>
          )}
        </div>

        <div className={style.individual}>
          <label className={style.Label}>Intensidad*</label>
          <input
            name="effort"
            type="text"
            value={form.effort}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Intensidad de la clase de 1 a 5"
          />
          {errors.effort && <div style={{ color: "red" }}>{errors.effort}</div>}
        </div>
        <div className={style.individual}>
          <label className={style.Label}>Objetivos*</label>
          <input
            name="goals"
            type="text"
            value={form.goals}
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder="Objetivos de la clase"
          />
          {errors.goals && <div style={{ color: "red" }}>{errors.goals}</div>}
        </div>

        <div className={style.IndividualHora}>
          <div className={`${style.HourContainer} ${style.HourContainer1}`}>
            <label className={style.Options}>Hora inicio</label>
            <select onChange={(e) => setHoraInicio(parseInt(e.target.value))}>
              <option value="">Seleccione</option>
              {[...Array(24)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}:00
                </option>
              ))}
            </select>
          </div>

          <div className={`${style.HourContainer} ${style.HourContainer2}`}>
            <label className={style.Options}>Hora fin</label>
            <select onChange={(e) => setHoraFin(parseInt(e.target.value))}>
              <option value="">Seleccione</option>
              {generateHourOptions()}
            </select>
          </div>
        </div>

        <div className={`${style.individual} ${style.BottomLine}`}>
          <label className={style.Options}>Días</label>
          <div className={style.DaysContainer}>
            {weekDays.map((dia) => (
              <div key={dia}>
                <label>
                  <input
                    type="checkbox"
                    value={dia}
                    onChange={handleDiaChange}
                  />
                  <p>{dia}</p>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={style.individual}>
          <label className={style.Options}>Tipo de ejercicio</label>

          <div className={style.TypesContainer}>
            {lessonTypes.map((type) => {
              return (
                <div key={type.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={type.name}
                      onChange={handleTypeChange}
                    />
                    <p>{type.name}</p>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <button type="submit" className={style.BtnSubmit}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateLesson;
