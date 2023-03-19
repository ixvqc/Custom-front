
import './App.css';
import Main from './views/Main'
import {Routes, Route} from 'react-router-dom'
import Login from './views/Login'
 function App() {
  return (
   <Routes>
     <Route path="/" element = {<Main/>}/>
       <Route path="/login" element = {<Login/>}/>

   </Routes>


  );
}

export default App;
