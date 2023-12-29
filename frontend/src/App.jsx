import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateArt from './pages/CreateArts';
import ShowArt from './pages/ShowArt';
import EditArt from './pages/EditArt.jsx';
import DeleteArt from './pages/DeleteArt.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/arts/create' element={<CreateArt />} />
      <Route path='/arts/details/:id' element={<ShowArt />} />
      <Route path='/arts/edit/:id' element={<EditArt />} />
      <Route path='/arts/delete/:id' element={<DeleteArt />} />
    </Routes>
  )
};

export default App;