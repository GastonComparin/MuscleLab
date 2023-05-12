import styles from './NewLessons.module.css'

const NewLessons= ()=>{
    return(
        <div className={styles.container}>

    <h1> New Lesson</h1>
        <div className={styles.log}>

        <h3>Lesson name</h3>
        <input id="name" type="text" class="form-control"name="lesson name" placeholder="Lesson name..."></input>

        <h3>Effort</h3>
        <input id="effort" type="text" class="form-control"name="effort" placeholder="effort..."></input>

        <h3>Goals</h3>
        <input id="goals" type="text" class="form-control"name="goals" placeholder="Goals..."></input>

        <h3>Schedule Days</h3>
        <input id="schedule Days" type="text" class="form-control"name="schedule Days" placeholder="Schedule Days..."></input>

        <h3>Schedule Hours</h3>
        <input id="schedule Hours" type="text" class="form-control"name="scheduleHours" placeholder="Schedule Hours..."></input>

        <h3>Description</h3>
        <input id="description" type="text" class="form-control"name="description" placeholder="Description..."></input>

        <button className={styles.button1}>Create Lesson</button>
        </div>
        </div>
    )
}
export default NewLessons;