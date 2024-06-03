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
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

export const HomePage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setnuevoMensaje] = useState('');
  const [mensajes, setmensajes] = useState([]);
  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('chat_message', (data) => {
      setmensajes((mensajes) => [...mensajes, data]);
    });
    return () => {
      socket.off('connect');
      socket.off('chat_message');
    };
  }, []);

  const [professions, setProfession] = useState([]);
  useEffect(() => {
    getProfessionRequest().then((response) => {
      setProfession(response.data.foundedProfessions);
    });
  }, []);

  console.log(professions);

  const enviarMensaje = () => {
    socket.emit('chat_message', {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
  };
  return (
    <>
      <MyNavbar />

      <div className="bg-white">
        <h1>{isConnected ? 'Conectado' : 'no conectado'} </h1>
        {mensajes.map((mensaje) => (
          <h1>
            {mensaje.usuario}: {mensaje.mensaje}{' '}
          </h1>
        ))}
        <input type="text" onChange={(e) => setnuevoMensaje(e.target.value)} />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>

      <div className="carousel-container">
        <Slider autoplay={true} autoplaySpeed={2000}>
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

      <div className="ml-10">
        <div className="flex flex-row max-w-md w-full">
          <div className="relative bg-white rounded-lg shadow-lg w-full">
            <div className="relative bg-black p-4 rounded-t-lg">
              <div className="flex p-4 font-mono">
                <div className="flex-auto pl-6">
                  <div className="relative flex flex-wrap items-baseline pb-6">
                    <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                      Retro Shoe
                    </h1>
                    <div className="relative text-lg text-white">$89.00</div>
                    <div className="relative uppercase text-teal-400 ml-3">
                      In stock
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-b-lg">
              <div className="bg-white p-4 rounded-b-lg relative">
                <img
                  src={logoNombre}
                  alt=""
                  className="absolute right-4 top-4 w-50 h-24 object-cover rounded-lg z-10"
                  loading="lazy"
                />
              </div>
              <div className="flex items-baseline my-6">
                <div className="space-x-3 flex text-sm font-medium">
                  Aquí las profesiones
                </div>
              </div>
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
              <p className="text-xs leading-6 text-slate-500">
                Free shipping on all continental US orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
