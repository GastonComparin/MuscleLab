import style from './FilterBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { orderFromAtoZ, orderFromZtoA, orderFomHardestToEasiest, orderFromEasiestToHardest, sortByType, sortByIntensityandType, sortByIntensity, fetchAllLessons, clearLessons } from '../../redux/features/lessonsSlice';
import { setAlphabetFilter, selectAlphabetFilter, setIntensityFilter, selectIntensityFilter, setSelectedTypes, selectSelectedTypes, setSelectedIntensities, selectSelectedIntensities } from '../../redux/features/filtersSlice';
import { useEffect, useState } from 'react';
import trashIcon from "../../assets/icons/trash-bin.png"

const FilterBar = ({lessonsAtributtes, retryButton, setRetryButton}) => {
    const dispatch = useDispatch();

    const alphabetFilter = useSelector(selectAlphabetFilter);
    const intensityFilter = useSelector(selectIntensityFilter);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedIntensities = useSelector(selectSelectedIntensities);

    const intensity = [1,2,3,4,5];
    
    const handleAlfabetoClick = () => {
        if (!alphabetFilter) {
            dispatch(orderFromZtoA());
            dispatch(setAlphabetFilter(true));
        } else {
            dispatch(orderFromAtoZ());
            dispatch(setAlphabetFilter(false));
        }
    };
    
    const handleIntensidadClick = async () => {
        if (selectedTypes.length > 0 && selectedIntensities.length > 0) {
            dispatch(clearLessons());
            await dispatch(fetchAllLessons());
            dispatch(setSelectedIntensities([]));
            dispatch(sortByType(selectedTypes));
        } 

        
    };

    const handleTipoEjercicioClick = async () => {
        if(selectedIntensities.length > 0 && selectedTypes.length > 0){
            dispatch(clearLessons());
            await dispatch(fetchAllLessons());
            dispatch(setSelectedTypes([]));
            dispatch(sortByIntensity(selectedIntensities));
        }
    };

    const handleTypeClick = (event) => {
        const name = event.target.name;
        if(!selectedTypes.includes(name)){
            dispatch(setSelectedTypes([...selectedTypes, name]));
        } else {
            dispatch(setSelectedTypes(selectedTypes.filter((type) => type !== name)));
        }
    };

    const handleIntensityClick = (event) => {
        const name = event.target.name;
        if (!selectedIntensities.includes(name)) {
            dispatch(setSelectedIntensities([...selectedIntensities, name]));
        } else {
            dispatch(setSelectedIntensities(selectedIntensities.filter((intensity) => intensity !== name)));
        }
    };
    
    const handleFilterClick = () => {
        if (selectedTypes.length > 0 && selectedIntensities.length > 0) return dispatch(sortByIntensityandType({selectedTypes, selectedIntensities}));
        if (selectedTypes.length > 0 && selectedIntensities.length === 0) return dispatch(sortByType(selectedTypes));
        if (selectedTypes.length === 0 && selectedIntensities.length > 0) return dispatch(sortByIntensity(selectedIntensities));
    };

    const handleOnDeleteIntensity = () => {
        dispatch(setSelectedIntensities([]));
        dispatch(fetchAllLessons());
    }

    const handleOnDeleteType = () =>  {
        dispatch(setSelectedTypes([]));
        dispatch(fetchAllLessons());
    }

    const handleDeleteAll = () => {
        dispatch(setSelectedIntensities([]));
        dispatch(setSelectedTypes([]));
        dispatch(setAlphabetFilter(false));
        dispatch(setIntensityFilter(false));
        dispatch(clearLessons());
        dispatch(fetchAllLessons());
    }

 useEffect(() => {
    if (retryButton){
        dispatch(setSelectedIntensities([]));
        dispatch(setSelectedTypes([]));
        dispatch(setAlphabetFilter(false));
        dispatch(setIntensityFilter(false));
        setRetryButton(false);
        dispatch(fetchAllLessons());
    }
    }, [retryButton, setRetryButton, dispatch])

return (
    <div className= {style.BarContainer}>
        <div className={style.FilterBar}>
            <p>Ordenar por:</p>
            <div className={style.OptionsContainer}>
                <button className={(!alphabetFilter) ? (style.BtnOption) : (`${style.BtnOption} ${style.BtnOptionActive}`)} onClick={handleAlfabetoClick}><p>Alfabeto</p></button>

                <ul className={(selectedIntensities.length !== 0) ? `${style.BtnOptionType} ${style.BtnActive} `: (style.BtnOptionType) }>
                    <p onClick={handleIntensidadClick}>Intensidad</p>

                    <div className={style.DropMenuIntensityContainer}>
                        <ul className={style.DropMenuIntensity}>
                            {intensity.map((int,index) => {
                                return(
                                    <li key={index}>
                                        <button className={selectedIntensities.includes(String(int))? `${style.DropMenuBtn} ${style.Active}`: style.DropMenuBtn} onClick={handleIntensityClick} name={int}>
                                            {int}
                                        </button>
                                    </li>
                                )    
                            })}
                        </ul>
                        <button className={style.DeleteButton} onClick={handleOnDeleteIntensity}>Borrar</button>
                    </div>

                </ul>

                <ul className={selectedTypes.length !== 0 ? `${style.BtnOptionType} ${style.BtnActive}` : style.BtnOptionType}>
                    <p onClick={handleTipoEjercicioClick}>Tipo de ejercicio</p>
                <div className={style.DropMenuContainer}>
                    <ul className={style.DropMenu}>
                        {lessonsAtributtes.map((atribute) => {
                            return(
                                <li key={atribute.id}>
                                    <button className={selectedTypes.includes(atribute.name) ? `${style.DropMenuBtn} ${style.Active}` : style.DropMenuBtn} onClick={handleTypeClick} name={atribute.name}>
                                        {atribute.name}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <button className={style.DeleteButton} onClick={handleOnDeleteType}>Borrar</button>
                </div>
                </ul>
                
                    <img className={selectedTypes.length !== 0 || selectedIntensities.length !== 0 || alphabetFilter !== false || intensityFilter !== false ? `${style.Trash} ${style.TrashActive}`: style.Trash} src={trashIcon} alt="Borrar filtros" onClick={handleDeleteAll} />
        
                <button className={style.FilterBtn} onClick={handleFilterClick}>filtrar</button>
            </div>
        </div>
    </div>
)
};

export default FilterBar;