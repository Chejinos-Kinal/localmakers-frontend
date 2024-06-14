import React from 'react';
import { Route, Routes } from 'react-router-native';
import HomePage from './src/pages/HomePages/HomePage';
import ProfessionalInformation from './src/pages/ProfessionalInformation/ProfessionalInformation'
import Login from './src/pages/UserPage/Login';


const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path='/HomePage' element={<HomePage/>}/>

      <Route path="/informationProfession" element={<ProfessionalInformation />} />

    </Routes>
  );
};

export default Router;
