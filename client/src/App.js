import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Footer from './components/Footer/Footer';
import DetailLesson from './components/DetailLesson/DetailLesson';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NewLessons from './components/NewLessons/NewLessons';
import ContactUs from './components/ContactUs/ContactUs'

function App() {
  return (
   <>
    <NavBar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path='/clases' element={<Lessons/>}/>
      <Route path= '/detail' element={<DetailLesson/>}/>
      <Route path= '/contactanos' element={<ContactUs />}/>
      <Route path= '/clases/detalles' element={<DetailLesson/>}/>
      <Route path= '/clases/nuevos' element={<NewLessons/>}/>
      <Route path= '/sign-up' element={<SignUp/>}/>

    </Routes>
    <Footer/>
  </> 
  );
}

export default App;
