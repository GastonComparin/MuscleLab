import style from "./Plans.module.css";
import { selectAllMemberships } from "../../redux/features/membershipsSlice";
import muscleIcon from "../../assets/icons/Bicep.png";
import muscleManIcon from "../../assets/icons/man-silhouette.png";
import clockIcon from "../../assets/icons/clock.png";
import checkIcon from "../../assets/icons/check.png";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Plans = () => {
  const memberships = useSelector(selectAllMemberships);

  return (
    <div className={style.BGContainer}>
      <div className={style.TitleContainer}>
        <h1>¡Alcanza tu mejor version</h1>
        <h2>
          Ya sea que busques un entretenamiento básico o un plan avanzado para
          toda la familia, aquí encontrarás todo lo que necesitas para alcanzar
          tus metas
        </h2>
      </div>

      <div className={style.PlansContainer}>
        <div className={`${style.Plan} ${style.Plan1}`}>
          <div className={style.PlanContainer1}>
            {memberships?.map((membership, index) => (
              <div key={index}>
                <div className={style.card}>
                  <div className={style.firstcontent}>
                    <span>{membership.name}</span>

                    <img className={style.MainIcon} src={clockIcon} alt="" />

                    <h4>Duracion: {membership.duration}</h4>
                  </div>

                  <div class={style.secondcontent}>
                    <Link to={`/pagos/${membership.id}`}>
                      <button className={style.button}>Compra ahora</button>
                    </Link>
                    <h4> Beneficios: {membership.benefits}</h4>

                    <h4>Precio: {membership.price}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
