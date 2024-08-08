import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screens/Users/Home';
import EventPage from './Screens/Users/Eventpage';
import Gellery from './Screens/Users/Gellery';
import Registration from './Screens/Users/Registration';
import Signup from './Screens/Users/Signup';
import Login from './Screens/Users/Login';
import Profile from './Screens/Users/Profile';
import ProtectedRoutes from './Components/auth/ProtectedRoutes';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/event" element={<EventPage />}></Route>
      <Route path="/gallery" element={<Gellery />}></Route>
      <Route path="/registration/:id" element={<ProtectedRoutes><Registration /></ProtectedRoutes>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}></Route>


    </Routes>
  );
}

export default App;