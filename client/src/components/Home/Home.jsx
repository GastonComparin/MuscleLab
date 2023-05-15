import ExtraInfo from "../ExtraInfo/ExtraInfo";
import Gallery from "../Gallery/Gallery";
import Plans from "../Plans/Plans";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlansCLick, selectPlansClicked } from "../../redux/features/utilsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const plansCLick = useSelector(selectPlansClicked);
    const plansRef = useRef(null);

    const handleOnclick = () => {
        plansRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect (() => {
        if (plansCLick) {
            plansRef.current.scrollIntoView({ behavior: 'smooth' });
            dispatch(setPlansCLick(false));
        }
    }, [plansCLick, dispatch]);
    
    return (
        <>
            <Gallery handleOnclick ={handleOnclick}/>
            <ExtraInfo/>
            <section ref={plansRef}>
                <Plans/>
            </section>
        </>
    )

}

 export default Home;