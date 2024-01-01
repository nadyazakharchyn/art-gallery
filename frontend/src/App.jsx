import React from "react";
import {Routes, Route} from 'react-router-dom'
import Galleries from './pages/Galleries.jsx'
import Home from './pages/Home';
import CreateArt from './pages/CreateArts';
import ShowArt from './pages/ShowArt';
import EditArt from './pages/EditArt.jsx';
import DeleteArt from './pages/DeleteArt.jsx';
import Login from './pages/Login.jsx';
import Registration from "./pages/Register.jsx";
import Bookings from "./pages/Bookings.jsx";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Galleries />} />
      <Route path='/galleries/:id/arts' element={<Home />} />
      <Route path='/arts/create' element={<CreateArt />} />
      <Route path='/arts/details/:id' element={<ShowArt />} />
      <Route path='/arts/edit/:id' element={<EditArt />} />
      <Route path='/arts/delete/:id' element={<DeleteArt />} />
      <Route path='/users/login/' element={<Login />} />
      <Route path='/users/register/' element={<Registration />} />
      <Route path='/bookings/user/:id/' element={<Bookings />} />
    </Routes>
  )
};

export default App;