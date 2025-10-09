// src/Componentes/Login.jsx
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/loginSchema';
import { useNavigate } from 'react-router-dom';

// Importo tu imagen como módulo para que Vite la resuelva bien en dev y build
import bgImg from '../Imagenes/Resto/login.jpg';

/**
 * Diseño aplicado:
 * - Hero fullscreen con tu foto, centrada y con overlay degradado (mejora contraste).
 * - Card “pro” con efecto glass sutil, borde degradado animado muy leve, sombra suave
 *   y espacios generosos (hierarchy y respiración visual).
 * - Inputs XL con focus ring y botón de “Ver/Ocultar” integrado.
 * - Accesibilidad: aria-* y role en alertas.
 */
export default function Login() {
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: 'admin@libreria.test', password: 'admin123' },
    mode: 'onTouched',
  });

  const onSubmit = async ({ email, password }) => {
    setError(''); setOk(false);
    const res = await login(email, password);
    if (res?.success) { setOk(true); navigate('/home', { replace: true }); }
    else setError(res?.error || 'Error al iniciar sesión');
  };

  return (
    <section
      className="auth-hero d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* overlay para contraste y enfoque en el centro */}
      <div className="auth-overlay" aria-hidden="true" />

      {/* Card */}
      <Card className="auth-card">
        <Card.Body className="p-4 p-md-5">
          <div className="auth-title mb-4">Iniciar sesión</div>

          {error && <Alert variant="danger" role="alert">{error}</Alert>}
          {ok && <Alert variant="success" role="status">Sesión iniciada correctamente.</Alert>}

          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                aria-invalid={!!errors.email || undefined}
                aria-describedby="email-error"
                {...register('email')}
                className={`form-control-xl ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <div id="email-error" className="field-error">{errors.email.message}</div>}
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label className="fw-semibold">Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  aria-invalid={!!errors.password || undefined}
                  aria-describedby="password-error"
                  {...register('password')}
                  className={`form-control-xl ${errors.password ? 'input-error' : ''}`}
                />
                <Button
                  variant="outline-secondary"
                  className="btn-eye"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </Button>
              </InputGroup>
              {errors.password && <div id="password-error" className="field-error">{errors.password.message}</div>}
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" disabled={isSubmitting} className="auth-btn">
                {isSubmitting ? <Spinner size="sm" animation="border" /> : 'Ingresar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
}
