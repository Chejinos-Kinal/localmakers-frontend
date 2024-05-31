import React from 'react';
import MyNavbar from '../../components/Navbar';
import logoNombre from '../../assets/img/LogoSinFondo.png';
import './HomePage.css';
import { MakeWorkOffer } from '../../components/WorkOffer/MakeWorkOffer';

export const HomePage = () => {
  return (
    <>
      <MyNavbar />
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
