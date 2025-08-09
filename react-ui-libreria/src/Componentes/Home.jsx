import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Aca puse la info de cada primer libro ya que me era mas facil que tener que ir a buscarla
const libroInfantil = [{
  id: 'infantil',
  titulo: 'El primer picnic de Jane',
  autor: 'Bella George',
  portada: require('../Imagenes/Resto/infantil1.jpg'),
  descripcion: 'Descripción genérica',
  seccion: 'Infantil'
}];

const libroFiccion = [{
  id: 'ficcion1',
  titulo: 'El Problema de los 3 Cuerpos',
  autor: 'Cixin Liu',
  portada: require('../Imagenes/Resto/ficcion1.jpg'),
  descripcion: 'El Problema de los 3 cuerpos',
  seccion: 'Ficcion'
}];

const libroHistoria = [{
  id: 'historia1',
  titulo: 'Historia Argentina',
  autor: 'Teresa Eggers-Brass',
  portada: require('../Imagenes/Resto/historia1.jpg'),
  descripcion: 'Descripción genérica',
  seccion: 'Historia'
}];

const libroDeporte = [{
  id: 'deporte1',
  titulo: 'El sueño de mi desvelo',
  autor: 'Antoni Daimiel',
  portada: require('../Imagenes/Resto/deporte1.jpg'),
  descripcion: 'Descripción genérica',
  seccion: 'Deporte'
}];

export default function Home() {
  const libros = [...libroInfantil, ...libroFiccion, ...libroHistoria, ...libroDeporte];

  const rutas = {
    infantil: '/infantil',
    ficcion1: '/ficcion',
    historia1: '/historia',
    deporte1: '/deporte'
  };

  return (
    <main id="contenidoPrincipal">
      <Container className="py-4">
        <Row className="justify-content-center">
          {libros.map((libro) => (
            <Col xs={12} sm={6} md={4} lg={3} key={libro.id} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={libro.portada}
                  alt={libro.titulo}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{libro.titulo}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{libro.autor}</Card.Subtitle>
                  <Card.Text>{libro.descripcion}</Card.Text>
                  <div className="d-grid">
                    <Link to={rutas[libro.id]}>
                      <Button variant="dark" size="sm">Ir a sección de {libro.seccion}</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}
