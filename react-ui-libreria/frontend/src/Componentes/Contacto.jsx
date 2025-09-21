import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function Contacto() {
  return (
    <main id="contenidoPrincipal">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Header
                style={{ backgroundColor: '#35113d', color: '#fff' }}
              >
                <h2 className="mb-0">Formulario de Contacto</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="contactoNombre" className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu nombre"
                      name="nombre"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="contactoEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tu@correo.com"
                      name="email"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="contactoAsunto" className="mb-3">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Motivo de tu consulta"
                      name="asunto"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="contactoMensaje" className="mb-4">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Escribe tu mensaje aquí"
                      name="mensaje"
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button  style={{ backgroundColor: '#35113d', color: '#fff' }} type="submit">
                      Enviar
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

