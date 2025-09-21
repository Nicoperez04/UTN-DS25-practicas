import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { login } from '../services/auth';
import { setToken } from '../helpers/auth';
import { set } from 'zod';

export default function Login() {
  const [email, setEmail] = useState('admin@libreria.test');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setOk(false);
    setLoading(true);
    try {
      // 1) Llamamos a la API
      const { token, user } = await login(email, password);
      setToken(token); // guardamos el token en memoria (para usar en prox requests)

      // 2) Persistimos la sesion (en este caso en localStorage q es como lo hace el profe)
      localStorage.setItem('auth', JSON.stringify({ token, user }));

      // 3) Feedback en pantalla
      setOk(true);
    } catch (err) {
      setError(err?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="contenidoPrincipal" className="d-flex justify-content-center py-5">
      <Card style={{ width: 420 }} className="shadow-sm">
        <Card.Header style={{ backgroundColor: '#35113d', color: '#fff' }}>
          <strong>Iniciar sesión</strong>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {ok && (
            <Alert variant="success" className="mb-3">
              Sesión iniciada correctamente.
            </Alert>
          )}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" disabled={loading} variant="primary" style={{ backgroundColor: '#35113d' }}>
                {loading ? <Spinner size="sm" animation="border" /> : 'Ingresar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
}
