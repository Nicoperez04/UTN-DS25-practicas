// src/Componentes/Login.jsx
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { login } from '../services/auth';
import { setToken } from '../helpers/auth';
// 1) RHF + Yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/loginSchema';

export default function Login() {
  // 2) Estado de feedback general (no de campos): loading / ok / error de credenciales
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');

  // 3) useForm conectado a Yup: centralizamos la validación
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'admin@libreria.test',
      password: 'admin123',
    },
    mode: 'onTouched', // muestra errores al tocar y salir del campo (buena UX)
  });

  // 4) Envío validado: si pasa el schema, llamamos al servicio de login
  const onSubmit = async ({ email, password }) => {
    setError('');
    setOk(false);
    setLoading(true);
    try {
      const { token, user } = await login(email, password);
      setToken(token);
      localStorage.setItem('auth', JSON.stringify({ token, user })); // mismo patrón que el profe
      setOk(true);
    } catch (err) {
      // Mouestra aca el error global si credenciales son inválidas u otro problema
      setError(err?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="contenidoPrincipal" className="d-flex justify-content-center py-5">
      <Card style={{ width: 420 }} className="shadow-sm">
        <Card.Header style={{ backgroundColor: '#35113d', color: '#fff' }}>
          <strong>Iniciar sesión</strong>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" role="alert">{error}</Alert>}
          {ok && (
            <Alert variant="success" className="mb-3" role="status">
              Sesión iniciada correctamente.
            </Alert>
          )}

          {/* RHF: handleSubmit hace la validación con Yup antes de llamar a onSubmit */}
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                aria-invalid={!!errors.email || undefined}
                aria-describedby="email-error"
                // RHF registra y controla el input
                {...register('email')}
                // feedback visual de error
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
                disabled={loading || isSubmitting}
                variant="primary"
                style={{ backgroundColor: '#35113d' }}
              >
                {loading || isSubmitting ? <Spinner size="sm" animation="border" /> : 'Ingresar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
}
