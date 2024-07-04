import React from 'react';
import { Route, Routes } from 'react-router-native';
import HomePage from './src/pages/HomePages/HomePage';
import ProfessionalInformation from './src/pages/ProfessionalInformation/ProfessionalInformation'
import Login from './src/pages/UserPage/Login';
import Register from './src/pages/UserPage/Register';
import MakeWorkOffer from './src/pages/WorkOffer/MakeWorkOffer';
import Information from './src/pages/UserPage/Information';
import Review from './src/pages/Review/Review';
import UpdateUser from './src/pages/UserPage/UpdateUser';
import Account from './src/pages/Account/Account';
import ChatRoom from './src/Components/ChatRoom';


const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path='/Review' element={<Review/>} />
      <Route path='/HomePage' element={<HomePage />} />
      <Route path='/Register' element={<Register />} />
      <Route path="/informationProfession" element={<ProfessionalInformation />} />
      <Route path='/MakeWorkOffer' element={<MakeWorkOffer/>}  />
      <Route path='/InformationUser' element={<UpdateUser/>}/>
      <Route path='/Account' element={<Account/>}/>
      <Route path='ChatRoom' element={<ChatRoom/>}/>

    </Routes>
  );
};

export default Router;
