import React from 'react';

import workOffer from '../../assets/workoffer.jpeg';
import logo from '../../assets/logo.jpg';
export const MakeWorkOffer = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-custom-teal text-center w-full">
            Oferta de Trabajo
          </h1>
          <img src={logo} alt="Local Makers Logo" className="h-12" />
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="asunto"
              className="block text-sm font-medium text-custom-mint"
            >
              Asunto (Título del trabajo)
            </label>
            <input
              type="text"
              id="asunto"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe el asunto de tu problema a resolver"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-custom-mint"
            >
              Descripción del problema
            </label>
            <textarea
              id="descripcion"
              rows="4"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Puedes incluir el trabajo a realizar, el precio estimado que puedes pagar o más especificaciones."
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="usuario"
              className="block text-sm font-medium text-custom-mint"
            >
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              value="Este dato es obtenido automáticamente."
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profesional"
              className="block text-sm font-medium text-custom-mint"
            >
              Profesional
            </label>
            <input
              type="text"
              id="profesional"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
              value="Este dato es obtenido automáticamente."
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="localizacion"
              className="block text-sm font-medium text-custom-mint"
            >
              Localización del trabajo a realizar
            </label>
            <select
              id="localizacion"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="zona-1">Zona 1</option>
              <option value="zona-2">Zona 2</option>
              <option value="zona-3">Zona 3</option>
              <option value="zona-4">Zona 4</option>
              <option value="zona-5">Zona 5</option>
              <option value="zona-6">Zona 6</option>
              <option value="zona-7">Zona 7</option>
              <option value="zona-8">Zona 8</option>
              <option value="zona-9">Zona 9</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-custom-blue hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Enviar Oferta
          </button>
        </form>
      </div>
      <div className="hidden md:block h-85">
        <img
          src={workOffer}
          alt="Side Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
