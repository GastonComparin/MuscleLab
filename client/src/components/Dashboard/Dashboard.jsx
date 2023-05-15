import React, { useEffect, useState } from "react";
import { selectAllLessons } from "../../redux/features/lessonsSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Dashboard.module.css";
import { fetchAllLessons } from "../../redux/features/lessonsSlice";

const Dashboard = () => {
  const [serverResponse, setServerResponse] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, [serverResponse]); //eslint-disable-next-line react-hooks/exhaustive-deps

  const lessons = useSelector(selectAllLessons);
  //console.log(lessons);

  const removeLessonHandler = (event) => {
    const id = event.target.name;

    let text = "Esta accion no se podra revertir!\nPulse OK o Cancelar.";
    if (window.confirm(text) === true) {
      fetch("http://localhost:3001/lessons/delete/" + id, { method: "DELETE" })
        .then((response) => setServerResponse(response))
        .catch((error) => setServerResponse(error));

      alert("Borrado con exito!");
    } else {
      alert("Cancelado por el usuario");
    }
  };

  return (
    <div className={styles.container}>
      <hr />
      <h1>Dashboard</h1>
      <div className={styles.title}>Clases: {lessons.length}</div>
      <div className={styles.containerTable}>
        
        {!lessons.length ? (
          <div className={styles.empty}>
            <p>No hay clases para mostrar!</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div key={lesson.id} className={styles.item}>
              {lesson.name}
              <div />
              <div className={styles.item}>
                <img
                  src={lesson.image}
                  alt={lesson.name}
                  className={`${styles.img}`}
                />
              </div>
              <div>
                <button
                  name={lesson.id}
                  onClick={removeLessonHandler}
                  className={styles.btn}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;