import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screens/Users/Home';
import Event from './Screens/Users/Event';
import Gellery from './Screens/Users/Gellery';
import Registration from './Screens/Users/Registration';
import Signup from './Screens/Users/Signup';
import Login from './Screens/Users/Login';
import ProtectedRoutes from './Components/auth/ProtectedRoutes';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/event" element={<Event />}></Route>
      <Route path="/gallery" element={<Gellery />}></Route>
      <Route path="/registration" element={<ProtectedRoutes><Registration /></ProtectedRoutes>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>

    </Routes>
  );
}

export default App;