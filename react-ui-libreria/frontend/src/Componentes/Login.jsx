// src/Componentes/Login.jsx
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
// Qué y por qué: usamos el AuthContext (alineado al PDF) para no duplicar lógica de sesión
import { useAuth } from '../contexts/AuthContext';
// Validación declarativa: RHF + Yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/loginSchema';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Estado de feedback general (no de campos)
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  // AuthContext: expone login/logout/isAuthenticated/user (como en el PDF)
  const { login } = useAuth();
  const navigate = useNavigate();

  // RHF: conectamos el formulario al esquema Yup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      // Por qué: ponemos credenciales demo para acelerar pruebas
      email: 'admin@libreria.test',
      password: 'admin123',
    },
    mode: 'onTouched', // Muestra errores al tocar/salir del campo (mejor UX)
  });

  // Envío validado: si pasa Yup, llamamos al login del Context
  const onSubmit = async ({ email, password }) => {
    setError('');
    setOk(false);
    const result = await login(email, password);
    if (result?.success) {
      setOk(true);
      // Por qué: al loguear, llevamos al área privada (home)
      navigate('/home', { replace: true });
    } else {
      setError(result?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <main id="contenidoPrincipal" className="d-flex justify-content-center py-5">
      <Card style={{ width: 420 }} className="shadow-sm">
        <Card.Header style={{ backgroundColor: '#35113d', color: '#fff' }}>
          <strong>Iniciar sesión</strong>
        </Card.Header>
        <Card.Body>
          {/* Error global (credenciales inválidas, etc.) */}
          {error && <Alert variant="danger" role="alert">{error}</Alert>}

          {/* Mensaje de éxito (breve) */}
          {ok && (
            <Alert variant="success" className="mb-3" role="status">
              Sesión iniciada correctamente.
            </Alert>
          )}

          {/* RHF: handleSubmit valida con Yup antes de llamar a onSubmit */}
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                aria-invalid={!!errors.email || undefined}
                aria-describedby="email-error"
                {...register('email')}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && (
                <div id="email-error" className="field-error">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                aria-invalid={!!errors.password || undefined}
                aria-describedby="password-error"
                {...register('password')}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && (
                <div id="password-error" className="field-error">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                style={{ backgroundColor: '#35113d' }}
              >
                {isSubmitting ? <Spinner size="sm" animation="border" /> : 'Ingresar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
}
