import React from 'react';
import { Route, Routes } from 'react-router-native';
import HomePage from './src/Pages/HomePage/HomePage';
import ProfessionalInformation from './src/Pages/ProfessionalInformation/ProfessionalInformation';
import Login from './src/Pages/UserPage/Login';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/informationProfession" element={<ProfessionalInformation />} />
    </Routes>
  );
};

export default Router;
