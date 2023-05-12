import bodyCombat from '../assets/images/lessons/mujer-boxeando.jpg'
import pilates from '../assets/images/lessons/mujeres-yoga.jpg'
import entrenamientoFuncional from '../assets/images/lessons/grupo-haciendo-ejercicio.jpg'
// aquí vamos a hardcodear las rutinas mientras el
// back envía datos

const lessons = [
    {
      id: 1,
      name: "Zumba",
      effort: "maximum",
      goals: "body ton",
      description: "Trabajar el cuerpo completo funciona. sal de tu rutina de siempre y obtén verdaderos resultados.",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      scheduleDays: [
        "Lunes",
        "Martes",
        "Viernes"
      ],
      scheduleHours: "10:00",
      category: "Fuerza"
    },
    {
      id: 2,
      name: "spinning",
      effort: "medium",
      goals: "agility",
      description: "Lorem ipsum",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      scheduleDays: [
        "Lunes",
        "Martes",
        "Jueves"
      ],
      scheduleHours: "07:30",
      category: "Cardio"
    },
    {
      id: 3,
      name: "Pilates",
      effort: "low",
      goals: "body ton",
      description: "La clase de pilates",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      scheduleDays: [
        "Lunes",
        "Miercoles",
        "Jueves"
      ],
      scheduleHours: "07:00",
      category: "Flexibilidad"
    },
    {
      id: 4,
      name: "crossfit",
      effort: "maximum",
      goals: "chest completion",
      description: "La clase de entrenamiento funcional",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      scheduleDays: [
        "Lunes",
        "Viernes"
      ],
      scheduleHours: "09:30",
      category: "Equilibrio"
    },
    {
      id: 5,
      name: "gap",
      effort: "low",
      goals: "arm ton",
      description: "La clase de entrenamiento funcional",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      scheduleDays: [
        "Lunes",
        "Jueves",
        "Viernes"
      ],
      scheduleHours: "14:00",
      category: "Coordinación"
    },
    {
      id: 6,
      name: "musculation",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      effort: "maximum",
      goals: "chest completion",
      description: "Sets 5 Reps 10 Tempo 2010 Rest 60sec Lie on a flat bench holding a barbell with your hands slightly wider than shoulder-width apart. Brace your core, then lower the bar towards your. chest. Press it back up to the start.",
      scheduleDays: [
        "Martes",
        "Sabado"
      ],
      scheduleHours: "16:00",
      category: "Resistencia"
    },
    {
      id: 7,
      name: "boxeo",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      effort: "medium",
      goals: "body ton",
      description: "lorem ipsum",
      scheduleDays: [
        "Miercoles",
        "Viernes"
      ],
      scheduleHours: "19:30",
      category: "'Agilidad'"
    },
    {
      id: 8,
      name: "lolis",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      effort: "maximum",
      goals: "arm ton",
      description: "lorem ipsum",
      scheduleDays: [
        "Lunes",
        "Martes"
      ],
      scheduleHours: "20:00",
      category: "'Potencia'"
    },
    {
      id: 9,
      name: "bodyBuilder",
      effort: "medium",
      goals: "body ton",
      description: "Trabajar el cuerpo completo funciona.",
      image: "https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg",
      scheduleDays: [
        "Jueves",
        "Viernes"
      ],
      scheduleHours: "20:30",
      category: "Fuerza"
    }
  ]

export default lessons;


