import React from 'react';
import { Route, Routes } from 'react-router-native';
import HomePage from './src/pages/HomePages/HomePage';
import ProfessionalInformation from './src/pages/ProfessionalInformation/ProfessionalInformation'


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/informationProfession" element={<ProfessionalInformation />} />

    </Routes>
  );
};

export default Router;
