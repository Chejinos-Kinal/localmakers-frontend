import React, { useEffect, useState } from 'react';
import MyNavbar from '../../components/Navbar';
import logoNombre from '../../assets/img/LogoSinFondo.png';
import './HomePage.css';
import { MakeWorkOffer } from '../../components/WorkOffer/MakeWorkOffer';
import { getProfessionRequest } from '../../services/profession.service';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const HomePage = () => {
  const [professions, setProfession] = useState([]);
  useEffect(() => {
    getProfessionRequest().then((response) => {
      setProfession(response.data.foundedProfessions);
    });
  }, []);

  console.log(professions);

  return (
    <>
      <MyNavbar />
      {
        <div className="carousel-container">
          <Slider autoplay={true} autoplaySpeed={2000}>
            {' '}
            {professions.map((profession) => (
              <div key={profession._id}>
                <img
                  src={profession.image}
                  alt={`Imagen ${profession.name}`}
                  className="carousel-image img-carousel"
                />
              </div>
            ))}
          </Slider>
        </div>
      }
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
