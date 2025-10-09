// src/Componentes/Header.jsx
import React from 'react';
import logo from '../Imagenes/Resto/logoLibreria.png';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Centralizamos cierre de sesión acá para que sea rápido y visible
  const handleLogout = () => {
    logout();               // limpia storage + estado (helpers/auth + AuthContext)
    navigate('/login');     // redirige al login
  };

  return (
    <header id="cabecera" className="d-flex align-items-center justify-content-between px-3 py-2">
      {/* Zona izquierda: logo + título (como tenías) */}
      <div className="d-flex align-items-center gap-3">
        <img src={logo} alt="Logo de la Librería" className="logo" />
        <h2 className="mb-0">Librería Ejercicio React</h2>
      </div>

      {/* Zona derecha: datos de usuario + botón logout si está autenticado */}
      {isAuthenticated && (
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted" style={{ fontSize: '0.95rem' }}>
            {user?.email}
          </span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      )}
    </header>
  );
}
