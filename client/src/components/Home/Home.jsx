import ExtraInfo from "../ExtraInfo/ExtraInfo";
import Gallery from "../Gallery/Gallery";
import Plans from "../Plans/Plans";
import { useRef } from "react";
const Home = () => {

    const plansRef = useRef(null);

    const handleOnclick = () => {
        plansRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    
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