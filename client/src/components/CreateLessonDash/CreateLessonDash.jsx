import style from './CreateLessonDash.module.css';
import arrowIcon from '../../assets/icons/arrow-yellow.png';
import checkIcon from '../../assets/icons/check.png'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchAllLessonTypes } from '../../redux/features/typesSlice';
import validations from './validations/mainValidation/index';
import arrayValidations from './validations/arrayValidations/index';
import { weekDays } from '../../utils/constants';
import axios from 'axios';
import { URL } from '../../utils/constants';


class EditLessonDash extends Component {
    constructor(props) {
        super(props);
        this.inputRef = null;
        this.id = props.id;
        this.state = {
            lessonAttributes: {
                 name: '',
                description: '',
                shortDescription: '',
                effort: '',
                image: '',
                scheduleHourStart: '',
                scheduleHourFinish: '',
                scheduleDays: [],
                types: [],
                goals: [],
             },
            errors: {
                name: '',
                description: '',
                shortDescription: '',
                effort: '',
                image: '',
                scheduleHourStart: '',
                scheduleHourFinish: '',
                scheduleDays: '',
                types: '',
                goals: '',
            },
            horaInicio: '',
            allowSubmit: false,
            message:'',
            serverResponse: '',
        };
    };


    generateInitialHourOptions = (type) => {
        const hours = [];

        for (let i = 1; i <= 24 ; i ++){
          for (let j = 0; j <= 30 ; j+=30){
            if ( j === 0){
               hours.push(
                <option key={`${i}:00`} value={`${i}:${j}0`} name='scheduleHourStart'
                >{`${i}:${j}0`}</option>)
            } else {
                
                hours.push(
                    <option key={`${i}:${j}`} value={`${i}:${j}`} name='scheduleHourStart' 
                    >{`${i}:${j}`}</option>
                )
            }
            
          }
        }
        return hours;
    };
    
    generateFinalHourOptions = (type) => {
         
        const hours = [];
        for (let i = 1; i <= 24 ; i ++){
          for (let j = 0; j <= 30 ; j+=30){
            if ( this.state.horaInicio <= i){
              if(j === 0) {
                hours.push(
                    <option key={`${i}:${j}0`} value={`${i}:00`} name='scheduleHourStart'
                    >{`${i}:${j}0`}</option>
                    )
              } else {
                hours.push(
                    <option key={`${i}:${j}`} value={`${i}:${j}`} name='scheduleHourFinish'
                    >{`${i}:${j}`}</option>
                    )
              }
            }
            
          }
        }
        return hours.slice(1);
    }
    

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            lessonAttributes: {
                ...this.state.lessonAttributes,
                [name]: value,
            },
            errors: validations(value, name, this.state.errors, this.state.lessonAttributes),
        }, () => {
                this.setState({
                    allowSubmit: Object.values(this.state.errors).every((item) => item === '') 
                });   
        });
        
    };

    handleHoursBox = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(value);

        if (name === 'scheduleHourStart') {
            this.setState({
                horaInicio: value.split(':')[0],
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: value,
                },
            }, () =>{
                this.setState({
                    errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
                },() =>{
                    this.setState({
                        allowSubmit: Object.values(this.state.errors).every((item) => item === '')
                    });
                });
            });
            
        } else {
            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: value,
                },
                errors: validations(value, name, this.state.errors, this.state.lessonAttributes)
            }, () =>{
                this.setState({

                }, () => {
                    this.setState({
                        allowSubmit: Object.values(this.state.errors).every((item) => item === '')
                        });

                })
            });
        }
    };

    handleCheckBox = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: [...this.state.lessonAttributes[name], value],
                },
            }, () => {
                this.setState({
                    errors: arrayValidations(this.state.lessonAttributes,this.state.errors, name)
                }, () => {
                    this.setState({
                        allowSubmit: Object.values(this.state.errors).every((item) => item === '')});
                });
                
            });
        } else {
            this.setState({
                lessonAttributes: {
                    ...this.state.lessonAttributes,
                    [name]: this.state.lessonAttributes[name].filter((item) => item !== value),
                },
            }, () => {
                this.setState({
                    errors: arrayValidations(this.state.lessonAttributes, this.state.errors, name)
                }, () => {
                    this.setState({
                        allowSubmit: Object.values(this.state.errors).every((item) => item === '')});
                    });

            });
        }
    };

    handleConfirmCreate = (event) => {
        event.preventDefault();
        this.setState({
            message: '¿Estás seguro de que quieres crear esta clase?',
        });
    };
    handleConfirmarClick = (event) => {
        event.preventDefault();
        axios.post(`${URL}/lessons/create`, this.state.lessonAttributes)
        .then((res) => {
            console.log(res);
            this.setState({
                serverResponse: res.data,
                message: '',
            });
        }).catch((err) => {
            console.log(err);
            this.setState({
                serverResponse: err.data,
                message: '',
            });
        })
    };

    handleVolverClick = (event) => {
        event.preventDefault();
        this.setState({
            message: '',
            serverResponse: '',
        });
    };
    handlePrevArrow = (event) => {
        event.preventDefault();
        window.location.href = 'http://localhost:3000/dashboard/clases/';
    };


    componentDidMount() {
        const { fetchAllLessonTypes } = this.props;
         fetchAllLessonTypes();
         this.inputRef = React.createRef();
    };

    render() {
        const {lessonsTypes} = this.props;
        const {lessonAttributes, errors} = this.state;

      return (
              <>
        <form className={style.MainContainer}>
            <div className={style.Navigation}>
                <button onClick={this.handlePrevArrow}>
                    <img className={style.ArrowIcon} src={arrowIcon} alt="" />
                </button>
                <h2>{lessonAttributes.name}</h2>
            </div>

            <div className={style.Teacher}> Profesor: Brad Pitt</div>
            <div className={style.EditContainer}>
                <div className={style.DetailContainer}>
                    <div className={style.leftContainer}>
                        <div className={style.Description}>
                            <label htmlFor='name'>Nombre*</label>
                            <input placeholder='Nombre' value={lessonAttributes.name} type='text' id='name' name='name' onChange={this.handleChange}/>
                        </div>
                        {errors.name && <p className={style.Error}>{errors.name}</p>}
                        <div className={style.Description}>
                            <label>Descripción*</label>
                            <input placeholder='Descripción' value={lessonAttributes.description} id='description' type='text' name='description' onChange={this.handleChange}/>
                        </div>
                        {errors.description && <p className={style.Error}>{errors.description}</p>}

                        <div className={style.Description}>
                            <label>Breve descripción*</label>
                            <input placeholder='Breve Descripción' value={lessonAttributes.shortDescription} id='shortDescription' type='text' name='shortDescription' onChange={this.handleChange}/>
                        </div>
                        {errors.shortDescription && <p className={style.Error}>{errors.shortDescription}</p>}

                        <div className={style.Description}>
                            <label>Intensidad*</label>
                            <input placeholder='Intensidad' value={lessonAttributes.effort} type='text' id='effort' name='effort' onChange={this.handleChange}/>
                        </div>
                        {errors.effort && <p className={style.Error}>{errors.effort}</p>}

                        <div className={style.Description}>
                            <label>Imagen</label>
                            <input ref={this.inputRef} placeholder='Imagen' value={lessonAttributes.image} id='image' type='text' name='image' onChange={this.handleChange}/>
                        </div>
                        {errors.image && <p className={style.Error}>{errors.image}</p>}
                        
                        <div className={style.ImageContainer}>
                            <img src={this.inputRef?.current?.value} alt="Tu imagen" />

                        </div>
                    </div>

                    <div className={style.RightContainer}>
                        <div className={`${style.RightSubContainer} ${style.HourContainer}`}>
                            <div>
                                <h2>Hora inicio</h2>
                                <select name='scheduleHourStart' id='' onChange={this.handleHoursBox} >
                                    <option value='' name = 'scheduleHourStart'>Seleccione</option>
                                    {this.generateInitialHourOptions('scheduleHourStart').map((option) => option)
                                    }
                                </select>
                            </div>
                            {errors.scheduleHourStart && <p className={style.Error}>{errors.scheduleHourStart}</p>}
                            <div>
                                <h2>Hora final</h2>
                                <select name='scheduleHourFinish' id='' onChange={this.handleHoursBox}>
                                    <option value='' name ='scheduleHourFinish'>Seleccione</option>
                                    {this.generateFinalHourOptions('scheduleHourFinish').map((option) => option)
                                    }
                                </select>
                                {errors.scheduleHourFinish && <p className={style.Error}>{errors.scheduleHourFinish}</p>}
                            </div>
                        </div>

                        <div className={style.RightSubContainer}>
                            <h2>Días</h2>
                            <div className={style.DaysContainer}>
                                {weekDays.map((dia) => (
                                    <div key={dia}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={dia}
                                                checked={lessonAttributes.scheduleDays?.includes(dia)}
                                                name='scheduleDays'
                                                onChange={this.handleCheckBox}
                                            />
                                            <p>{dia}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.scheduleDays && <p className={style.Error}>{errors.scheduleDays}</p>}

                        </div>

                        <div className={style.RightSubContainer}>
                            <h2>Tipos de ejercicio</h2>
                            <div className={style.TiposDeEjercicio}>
                                {lessonsTypes.map((lesson, index) => (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={lesson}
                                                checked={lessonAttributes.types?.includes(lesson)}
                                                onChange={this.handleCheckBox}
                                                name='types'
                                            />
                                            <p>{lesson}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.types && <p className={style.Error}>{errors.types}</p>}

                        </div>
                        
                        <div className={`${style.RightSubContainer} ${style.LastSubContainer}`}>
                            <h2>Objetivos</h2>
                            <div className={style.TiposDeEjercicio}>
                                {lessonsTypes.map((lesson) => (
                                    <div key={lesson}>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={lesson}
                                                name = 'goals'
                                                checked={lessonAttributes.goals?.includes(lesson)}
                                                onChange={this.handleCheckBox}
                                            />
                                            <p>{lesson}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
                <div className={style.ButtonContainer}>
                    <button className={this.state.allowSubmit === false ?`${style.SaveButton} ${style.Disable}`: style.SaveButton} disabled={!this.state.allowSubmit} onClick={this.handleConfirmCreate}>
                        Crear Clase
                    </button>

                </div>
            </div>
            {this.state.message && 
            <div>
                <div className={style.AdvertiseContainer} ></div>
                <div className={style.Advertise}>
                    <h1>{this.state.message}</h1> 
                    <div>
                        {this.state.message &&<button className={style.AdvertiseButton1} onClick={this.handleConfirmarClick}>Confirmar</button>}
                        {this.state.message && <button className={style.AdvertiseButton2} onClick={this.handleVolverClick}>Volver</button>}
                    </div>
                </div>
            </div>
            }
            {this.state.serverResponse && 
            <div>
                <div className={style.AdvertiseContainer} ></div>
                <div className={style.Advertise}>
                    <h1>{this.state.serverResponse}</h1>
                    <img className={style.CheckIcon} src={checkIcon} alt="" />
                    <div>
                        {this.state.message && <button className={style.AdvertiseButton1} onClick={this.handleConfirmarClick}>Confirmar</button>}
                        {this.state.message && <button className={style.AdvertiseButton2} onClick={this.handleVolverClick}>Volver</button>}
                    </div>
                </div>
            </div>
            }
        </form>
        </>
      )  
    }
}


const mapStateToProps = (state) => {
    return {
        lessonsTypes: state.types.types
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        fetchAllLessonTypes: () => dispatch(fetchAllLessonTypes())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditLessonDash);