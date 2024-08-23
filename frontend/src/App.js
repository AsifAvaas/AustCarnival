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
import Error from './Screens/Users/Error';
import Success from './Screens/Users/Success';
import AdminSignup from './Screens/Admin/AdminSignup';
import InstructorHome from './Screens/Instructor/InstructorHome';
import NewEvent from './Screens/Admin/NewEvent';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/event" element={<EventPage />}></Route>
      <Route path="/event/:id" element={<EventPage />}></Route>
      <Route path="/gallery" element={<Gellery />}></Route>
      <Route path="/registration/:id" element={<ProtectedRoutes><Registration /></ProtectedRoutes>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/admin/signup" element={<AdminSignup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/error?" element={<Error />}></Route>
      <Route path="/success" element={<Success />}></Route>
      <Route path="/instructor/home" element={<InstructorHome />}></Route>
      <Route path="/admin/event/new" element={<NewEvent />}></Route>
      <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}></Route>


    </Routes>
  );
}

export default App;