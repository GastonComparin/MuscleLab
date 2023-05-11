import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Footer from './components/Footer/Footer';
import DetailLesson from './components/DetailLesson/DetailLesson';


function App() {
  return (
   <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/clases' element={<Lessons/>}/>
      <Route path= '/detail' element={<DetailLesson/>}/>
    </Routes>
    <Footer/>
   
   </> 
  );
}

export default App;
