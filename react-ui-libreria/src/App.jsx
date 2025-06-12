import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

import './estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegurate de tener esto

import Header           from './Componentes/Header';
import Menu             from './Componentes/Menu';
import Home             from './Componentes/Home';
import Footer           from './Componentes/Footer';
import SeccionFiccion   from './Componentes/SecFiccion';
import SeccionDeporte   from './Componentes/SecDeporte';
import SeccionInfantil  from './Componentes/SecInfantil';
import SeccionHistoria  from './Componentes/SecHistoria';
import Registro         from './Componentes/Registro';
import Contacto         from './Componentes/Contacto';

function App() {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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
        <Toast.Body>Bienvenido a nuestra librería. ¡Disfrutá la lectura!</Toast.Body>
      </Toast>
    </Router>
  );
}

export default App;
