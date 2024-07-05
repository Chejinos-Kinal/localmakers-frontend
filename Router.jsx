import React from 'react';
import { Route, Routes } from 'react-router-native';
import HomePage from './src/pages/User/HomePages/HomePage';
import ProfessionalInformation from './src/pages/User/ProfessionalInformation/ProfessionalInformation'
import Login from './src/pages/User/UserPage/Login';
import Register from './src/pages/User/UserPage/Register';
import MakeWorkOffer from './src/pages/User/WorkOffer/MakeWorkOffer';
import Information from './src/pages/User/UserPage/Information';
import Review from './src/pages/User/Review/Review';
import UpdateUser from './src/pages/User/UserPage/UpdateUser';
import Account from './src/pages/User/Account/Account';
import ChatRoom from './src/Components/ChatRoom';
import HomePageAdmin from './src/pages/Admin/HomePage/HomePageAdmin'
import ProfessionAdmin from './src/pages/Admin/Profession/ProfessionAdmin';
import BecomeProfessional from './src/pages/User/BecomeProfessional/BecomeProfessional';

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
      <Route path='/ChatRoom' element={<ChatRoom/>}/>
      <Route path='/HomePageAdmin' element={<HomePageAdmin/>}/>
      <Route path='/ProfessionAdmin' element={<ProfessionAdmin/>}/>
      <Route path='/BecomeProfessinal' element={<BecomeProfessional/>} />

    </Routes>
  );
};

export default Router;
