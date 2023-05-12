import style from './FilterBar.module.css';
import { useDispatch } from 'react-redux';
import { orderFromAtoZ, orderFromZtoA, orderFomHardestToEasiest, orderFromEasiestToHardest } from '../../redux/features/lessonsSlice';
import { useState } from 'react';

const FilterBar = ({lessonsAtributtes}) => {
    const [alphabetOrder, setAlphabetOrder] = useState(false);
    const [effortOrder, setEffortOrder] = useState(false);

    const dispatch = useDispatch();

    const handleAlfabetoClick = () => {
        if (!alphabetOrder) {
            dispatch(orderFromZtoA());
            setAlphabetOrder(true);
        } else {
            dispatch(orderFromAtoZ());
            setAlphabetOrder(false);
        }
    };
    const handleIntensidadClick = () => {
        if (!effortOrder) {
            dispatch(orderFomHardestToEasiest());
            setEffortOrder(true);
        } else {
            dispatch(orderFromEasiestToHardest());
            setEffortOrder(false);
        }
    };
    
return (
    <div className= {style.BarContainer}>
        <div className={style.FilterBar}>
            <p>Ordenar por:</p>
            <div className={style.OptionsContainer}>
                <button className={style.BtnOption} onClick={handleAlfabetoClick}>Alfabeto</button>
                <button className={style.BtnOption} onClick={handleIntensidadClick}>Intensidad</button>
                <button className={style.BtnOption}>Clase</button>
                <ul className={style.BtnOption1}>Tipo de ejercicio
                <div className={style.DropMenuContainer}>
                    <ul className={style.DropMenu}>
                        {lessonsAtributtes.map((atribute) => {
                            return(
                                <li key={atribute.id}>
                                    <button className={`${style.DropMenuBtn} ${style.Active}`}>
                                        {atribute.name}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <button className={style.FilterButton}>filtrar</button>
                </div>
                </ul>
            </div>
        </div>
    </div>
)
};

export default FilterBar;