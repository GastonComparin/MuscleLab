import style from './Sedes.module.css'
import { useEffect } from 'react';
const Sedes = () => {
    
    useEffect(() => {
        window.scrollTo({top: 0, left:0, behavior: 'auto'})
        
    }, []);
    return (
        <div className={style.ImageContainer}>
            <div className={style.Image}>
            </div>
        </div>
    )
}

export default Sedes