import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function Registro() {
  return (
    <main id="contenidoPrincipal">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card border="secondary" className="shadow-sm">
              <Card.Header  style={{ backgroundColor: '#35113d', color: '#fff' }}>
                <h2 className="mb-0">Formulario de Registro</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col sm={6}>
                      <Form.Group controlId="registroNombre" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" required />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="registroApellido" className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name="apellido" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="registroFecha" className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="fecha" required />
                  </Form.Group>
                  <Form.Group controlId="registroEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required />
                  </Form.Group>
                  <Form.Group controlId="registroPassword" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" required />
                  </Form.Group>
                  <Form.Group controlId="registroSexo" className="mb-3">
                    <Form.Label>Sexo</Form.Label>
                    <div>
                      <Form.Check inline type="radio" label="Masculino" name="sexo" value="M" required />
                      <Form.Check inline type="radio" label="Femenino" name="sexo" value="F" />
                      <Form.Check inline type="radio" label="Otro" name="sexo" value="O" />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="registroTema" className="mb-3">
                    <Form.Label>Tema Favorito</Form.Label>
                    <Form.Select name="tema" required>
                      <option value="">Selecciona un tema</option>
                      <option value="ficcion">Ficción</option>
                      <option value="deporte">Deporte</option>
                      <option value="infantil">Infantil</option>
                      <option value="historia">Historia</option>
                    </Form.Select>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col sm={6}>
                      <Form.Group controlId="registroTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" name="telefono" placeholder="+54 9 11 2345-6789" />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="registroWebsite">
                        <Form.Label>Sitio Web</Form.Label>
                        <Form.Control type="url" name="website" placeholder="https://ejemplo.com" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="registroColor" className="mb-4">
                    <Form.Label>Color Favorito</Form.Label>
                    <Form.Control type="color" name="color" />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="secondary" type="submit"  style={{ backgroundColor: '#35113d', color: '#fff' }}>
                      Registrarse
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
