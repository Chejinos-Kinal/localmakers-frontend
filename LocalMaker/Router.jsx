import React from 'react';
import { Route, Routes } from 'react-router-native';
import HomePage from './src/pages/HomePages/HomePage';
import ProfessionalInformation from './src/pages/ProfessionalInformation/ProfessionalInformation'
import Login from './src/pages/UserPage/Login';
import Register from './src/pages/UserPage/Register';
import MakeWorkOffer from './src/pages/WorkOffer/MakeWorkOffer';


const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path='/Register' element={<Register />} />
      <Route path="/informationProfession" element={<ProfessionalInformation />} />
      <Route path='/MakeWorkOffer' element={<MakeWorkOffer/>}  />

    </Routes>
  );
};

export default Router;
