// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from 'react-bootstrap';       
import './estilos.css';                       
import 'bootstrap/dist/css/bootstrap.min.css';

import Header   from './Componentes/Header';   
import Menu     from './Componentes/Menu';     
import Footer   from './Componentes/Footer';   
import Home     from './Componentes/Home';     
import SecFiccion from './Componentes/SecFiccion';
import SecDeporte from './Componentes/SecDeporte';
import SecInfantil from './Componentes/SecInfantil';
import SecHistoria from './Componentes/SecHistoria';
import Registro from './Componentes/Registro';
import Contacto from './Componentes/Contacto';
import Catalogo from './Componentes/Catalago';
import AgregarLibro from './Componentes/AgregarLibro';
import Login from './Componentes/Login';
import TestApi from './Componentes/TestApi';

export default function App() {
  //Estado del Toast
  const [showToast, setShowToast] = useState(true);

  const [catalogo, setCatalogo] = useState([]);

      useEffect(() => {
        Promise.all([
          fetch('http://localhost:3000/api/ficcion').then(r => r.json()),
          fetch('http://localhost:3000/api/deporte').then(r => r.json()),
          fetch('http://localhost:3000/api/infantil').then(r => r.json()),
        fetch('http://localhost:3000/api/historia').then(r => r.json())
      ])
      .then(([ficcion, deporte, infantil, historia]) => {
        setCatalogo([...ficcion, ...deporte, ...infantil, ...historia]);
      })
      .catch(err => console.error('Error cargando catálogo:', err));
    }, []);

  // Oculta el Toast automáticamente dsp de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Header y menu que van siempre*/}
      <Header />
      <Menu />

      {/* Rutas de la pagina */}
      <Routes>
        {/* Home con un libro de cada seccion nomas */}
        <Route 
          path="/" 
          element={<Home catalogo={catalogo} />} 
        />

        {/* Cada seccion*/}
        <Route path="/ficcion"  element={<SecFiccion />} />
        <Route path="/deporte"  element={<SecDeporte />} />
        <Route path="/infantil" element={<SecInfantil />} />
        <Route path="/historia" element={<SecHistoria />} />

        {/*Catalogo*/}
        <Route
          path="/catalogo"
          element={<Catalogo catalogo={catalogo} />}
        />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/registro"
          element={
            <AgregarLibro
              onAgregar={nuevo =>
                setCatalogo([...catalogo, nuevo])
             }/>
        }/>
        {/* El agregado de libros nuevo para esta entrega, con la funcion onAgregar */}
        <Route
          path="/agregarLibro"
          element={
            <AgregarLibro 
              onAgregar={nuevoLibro => 
                setCatalogo([...catalogo, nuevoLibro])
              } />
        }/>
        {/* Contacto*/}
        <Route path="/contacto" element={<Contacto />} />

        {/* Login */} 
        <Route path="/login" element={<Login />} />
        {/* Test API */}
        <Route path="/test-api" element={<TestApi />} />
      </Routes>

      {/*Footer aparece siempre tambien */}
      <Footer />

      {/* Toast de bienvenida */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        bg="info"
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">📚 Librería</strong>
        </Toast.Header>
        <Toast.Body>
          Bienvenido a nuestra librería. ¡Disfrutá la lectura!
        </Toast.Body>
      </Toast>
    </Router>
  );
}
