// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos.css';

import Header       from './Componentes/Header';
import Footer       from './Componentes/Footer';
import Home         from './Componentes/Home';
import SecFiccion   from './Componentes/SecFiccion';
import SecDeporte   from './Componentes/SecDeporte';
import SecInfantil  from './Componentes/SecInfantil';
import SecHistoria  from './Componentes/SecHistoria';
import Catalogo     from './Componentes/Catalogo';
import Contacto     from './Componentes/Contacto';
import Registro     from './Componentes/Registro';
import AgregarLibro from './Componentes/AgregarLibro';
import Login        from './Componentes/Login';
import TestApi      from './Componentes/TestApi';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './Componentes/PrivateRoute';

// Layout privado (solo visible tras login)
function PrivateShell() {
  return (
    <>
      <Header />
      <div className="layout-contenido">
        <Routes>
          {/* Rutas privadas */}
          <Route path="/home" element={<Home />} />
          <Route path="/ficcion" element={<SecFiccion />} />
          <Route path="/deporte" element={<SecDeporte />} />
          <Route path="/infantil" element={<SecInfantil />} />
          <Route path="/historia" element={<SecHistoria />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/agregarLibro" element={<AgregarLibro onAgregar={() => {}} />} />
          <Route path="/test-api" element={<TestApi />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}


// Redirige raíz según sesión
function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Entrar a la app = decidir según sesión */}
          <Route path="/" element={<RootRedirect />} />

          {/* Pública */}
          <Route path="/login" element={<Login />} />

          {/* Privadas: todo el “shell” detrás de PrivateRoute */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <PrivateShell />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
