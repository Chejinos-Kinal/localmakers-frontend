import React, { useEffect, useState } from 'react';
import MyNavbar from '../../components/Navbar';
import logoNombre from '../../assets/img/LogoSinFondo.png';
import logo from '../../assets/img/Logo.jpeg';
import './HomePage.css';
import { MakeWorkOffer } from '../../components/WorkOffer/MakeWorkOffer';
import { getProfessionRequest } from '../../services/profession.service';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getUserProfession } from '../../services/user.service';

export const HomePage = () => {
  const [userProfession, setUserProfession] = useState([]);

  useEffect(() => {
    getUserProfession().then((response) => {
      setUserProfession(response.data.foundedProf);
    });
  }, []);
  console.log(userProfession);

  return (
    <>
      <MyNavbar />
      <br />
      <br />
      <br />
      {userProfession.map((user) => (
        <div className="ml-10">
          <div className="flex flex-row max-w-md w-full">
            <div className="relative bg-white rounded-lg shadow-lg w-full">
              <div className="relative bg-black p-4 rounded-t-lg">
                <div className="flex p-4 font-mono">
                  <div className="flex-auto pl-6">
                    <div className="relative flex flex-wrap items-baseline pb-6">
                      <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                        {user.name} {user.surname}
                      </h1>
                      <div className="relative uppercase text-white"></div>
                      <div className="relative uppercase text-teal-400 ml-3">
                        {user.profession[0].name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex bg-white ">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="absolute  right-4 top-4 w-50 h-24 object-cover rounded-lg z-10"
                  loading="lazy"
                />
              </div>

              <div className="bg-white p-4 rounded-b-lg">
                <div className="flex items-baseline my-6">
                  <div className="space-x-3 flex text-sm font-medium">
                    {user.description}
                  </div>
                </div>

                <p className="text-xs leading-6 text-slate-500">
                  Tel: {user.phone} | Email: {user.email}
                </p>
                <br />
                <div className="flex space-x-2 mb-4 text-sm font-medium">
                  <div className="flex space-x-4">
                    <button
                      className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                      type="submit"
                    >
                      Información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <br />
      <br />
      <div className="container-letters">
        <h1>CONOCE MÁS SOBRE NOSOTROS</h1>
      </div>
      <div className="container-information">
        <div className="container-information-left">
          <img src={logoNombre} alt="" />
        </div>
        <div className="container-information-right">
          <br />
          <br />
          <br />
          <h2>VISIÓN:</h2>
          <br />
          <p className="container-information-letter">
            Crear un entorno en el cual las personas no sufran por problemas de
            empelo, convirtiendo a las personas en emprendedores independientes.
          </p>
          <br />
          <br />
          <h2>MISIÓN</h2>
          <br />
          <p className="container-information-letter">
            Crear una aplicación en la cual podamos obtener un empleo para el
            cual todas las personas puedan obtener un empleo o tareas a cambio
            de dinero.
          </p>
        </div>
      </div>
    </>
  );
};
