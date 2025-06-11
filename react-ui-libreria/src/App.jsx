import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './estilos.css';

import Header           from './Componentes/Header';
import Menu             from './Componentes/Menu';
import Home             from './Componentes/Home'
import Footer           from './Componentes/Footer';
import SeccionFiccion   from './Componentes/SecFiccion';
import SeccionDeporte   from './Componentes/SecDeporte';
import SeccionInfantil  from './Componentes/SecInfantil';
import SeccionHistoria  from './Componentes/SecHistoria';
import Registro         from './Componentes/Registro';
import Contacto          from './Componentes/Contacto';

function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/ficcion"  element={<SeccionFiccion />} />
        <Route path="/deporte"  element={<SeccionDeporte />} />
        <Route path="/infantil" element={<SeccionInfantil />} />
        <Route path="/historia" element={<SeccionHistoria />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
