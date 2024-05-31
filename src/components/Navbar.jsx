import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/LogoSinNombre.jpg';
import './Navbar.css';

const MyNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="background-Navbar">
      <nav className="bg-gray-800 p-4 container-Navbar">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="block lg:hidden text-white"
              aria-controls="navbarMenu"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <a href="/" className="ml-3">
              <img src={logo} alt="Logo" className="w-24" />
            </a>
          </div>
          <div
            className="hidden lg:flex lg:items-center lg:w-auto w-full"
            id="navbarMenu"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <a
                      href="/"
                      className="px-3 py-2 flex items-center text-white "
                    >
                      Inicio
                    </a>
                  </li>
                  {userRole === 'ADMIN_APP' ? (
                    <li className="nav-item">
                      <a
                        href="/Admin/HotelAdmin"
                        className="px-3 py-2 flex items-center text-white  "
                      >
                        Hoteles
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a
                        href="/Hotel/CardHotel"
                        className="px-3 py-2 flex items-center  text-white  "
                      >
                        Hoteles
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <a
                      href="#"
                      className="px-3 py-2 flex items-center text-white  "
                    >
                      Servicios
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="px-3 py-2 flex items-center text-white  "
                    >
                      Reservaciones
                    </a>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    href="#"
                    className="px-3 py-2 flex items-center text-white  "
                  >
                    Mi cuenta
                  </a>
                </li>
                <li className="nav-item px-3 py-2 flex items-center text-white px-6 py-2 ">
                  <button
                    onClick={handleLogout}
                    className="text-white  px-3 py-2"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    href="#"
                    className="px-3 py-2 flex items-center text-white  "
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="px-3 py-2 flex items-center text-white  "
                  >
                    Registrar
                  </a>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MyNavbar;
