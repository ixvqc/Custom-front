
import './App.css';
import Main from './views/Main'
import {Routes, Route} from 'react-router-dom'
import Login from './views/Login'
import Register from "./views/Register";
 function App() {
  return (
   <Routes>
     <Route path="/" element = {<Main/>}/>
       <Route path="/login" element = {<Login/>}/>
       <Route path="/Register" element = {<Register/>}/>

   </Routes>


  );
}

export default App;
