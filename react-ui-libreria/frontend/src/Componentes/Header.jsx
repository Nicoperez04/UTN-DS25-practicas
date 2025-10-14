// src/Componentes/Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import logo from '../Imagenes/Resto/logoLibreria.png';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null); // 'secciones' | 'acciones' | 'usuario' | null
  const wrapRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Cerrar dropdowns al click fuera / ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(null);
    };
    const onEsc = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const toggle = (name) => setOpen((prev) => (prev === name ? null : name));
  const closeAll = () => setOpen(null);

  return (
    <header id="cabecera" className="d-flex align-items-center justify-content-between px-3 py-2">
      {/* Izquierda: logo + título (tal cual tenías) */}
      <div className="d-flex align-items-center gap-3 brand-click" onClick={() => navigate('/home')}>
        <img src={logo} alt="Logo de la Librería" className="logo" />
        <h2 className="mb-0">Librería Ejercicio React</h2>
      </div>

      {/* Derecha: navegación superior + usuario */}
      <div className="app-nav" ref={wrapRef}>
        <ul className="app-nav__list">
          <li className="app-nav__item">
            <NavLink to="/home" className="app-nav__link" onClick={closeAll}>Inicio</NavLink>
          </li>

          {/* Secciones (dropdown) */}
          <li className={`app-nav__item has-dd ${open === 'secciones' ? 'is-open' : ''}`}>
            <button className="app-nav__link dd-btn" onClick={() => toggle('secciones')}>
              Secciones <span className="chev">▾</span>
            </button>
            <div className="dd-menu">
              <NavLink to="/ficcion" className="app-nav__link" onClick={closeAll}>Ficción</NavLink>
              <NavLink to="/deporte" className="app-nav__link" onClick={closeAll}>Deporte</NavLink>
              <NavLink to="/historia" className="app-nav__link" onClick={closeAll}>Historia</NavLink>
              <NavLink to="/infantil" className="app-nav__link" onClick={closeAll}>Infantil</NavLink>
            </div>
          </li>

          <li className="app-nav__item">
            <NavLink to="/catalogo" className="app-nav__link" onClick={closeAll}>Catálogo</NavLink>
          </li>

          <li className="app-nav__item">
            <NavLink to="/agregarLibro" className="app-nav__link" onClick={closeAll}>Agregar Libro</NavLink>
          </li>

          {/* Acciones (dropdown) */}
          <li className={`app-nav__item has-dd ${open === 'acciones' ? 'is-open' : ''}`}>
            <button className="app-nav__link dd-btn" onClick={() => toggle('acciones')}>
              Acciones <span className="chev">▾</span>
            </button>
            <div className="dd-menu">
              <NavLink to="/registro" className="app-nav__link" onClick={closeAll}>Registrarse</NavLink>
              <NavLink to="/contacto" className="app-nav__link" onClick={closeAll}>Contacto</NavLink>
            </div>
          </li>
        </ul>

        {/* Usuario */}
        {isAuthenticated && (
          <div className={`userbox ${open === 'usuario' ? 'is-open' : ''}`}>
            <button
              className="userbox__btn"
              title={user?.email || 'Usuario'}
              onClick={() => toggle('usuario')}
            >
              <span className="userbox__avatar">
                {(user?.email || user?.name || 'U')[0].toUpperCase()}
              </span>
            </button>
            <div className="userbox__menu">
              <div className="userbox__info">
                <div className="userbox__name">{user?.name || 'Usuario'}</div>
                <div className="userbox__email">{user?.email}</div>
              </div>
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
