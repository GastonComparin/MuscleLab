import style from "./Plans.module.css"
import muscleIcon from "../../assets/icons/Bicep.png"
import muscleManIcon from "../../assets/icons/man-silhouette.png"
import clockIcon from "../../assets/icons/clock.png"
import checkIcon from "../../assets/icons/check.png"

const Plans = () =>{
    return(
            <div className={style.BGContainer}>
                <div className={style.TitleContainer}>
                    <h1>¡Alcanza tu mejor version</h1>
                    <h2>Ya sea que busques un entretenamiento básico o un plan avanzado para toda la familia, aquí encontrarás todo lo que necesitas para alcanzar tus metas</h2>
                </div>

                <div className={style.PlansContainer}>

                    <div className={`${style.Plan} ${style.Plan1}`}>
                        <div className={style.Title}>Plan Standard</div>
                        <div className={style.PlanContainer1}>
                            <img className={style.MainIcon} src={clockIcon} alt="" />
                            <h2>Muscle Standard</h2>

                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>
                                
                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>

                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>

                            <h4>ARS 114.950 por mes</h4>
                            <button>Compra ahora</button>
                        </div>
                    </div>

                    <div className={`${style.Plan} ${style.Plan2}`}>
                        <div className={style.Title}>Plan Plus</div>
                        <div className={style.PlanContainer2}>
                            <img className={style.MainIcon} src={muscleIcon} alt="" />
                            <h2>Muscle Plus</h2>

                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>
                                
                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>

                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>

                            <h4>ARS 114.950 por mes</h4>
                            <button>Compra ahora</button>
                        </div>
                    </div>

                    <div className={`${style.Plan} ${style.Plan3}`}>
                        <div className={style.Title}>Plan Premium</div>
                        <div className={style.PlanContainer3}>
                            <img className={style.MainIcon} src={muscleManIcon} alt="" />
                            <h2>Muscle Premium</h2>

                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>
                                
                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>

                            <div className={style.OpcionsContainer}>
                                <img className={style.CheckIcon} src={checkIcon} alt="" />
                                <h3>Lorem Ipsum</h3>
                            </div>

                            <h4>ARS 114.950 por mes</h4>
                            <button>Compra ahora</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Plans;