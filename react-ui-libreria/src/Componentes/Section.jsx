import React from 'react';
import { Accordion } from 'react-bootstrap';

export default function Section({ libros }) {
  return (
    <main id="contenidoPrincipal">
      <section className="seccion-libros">
        <Accordion defaultActiveKey="0">
          {libros.map((libro, idx) => (
            <Accordion.Item eventKey={String(idx)} key={libro.id}>
              <Accordion.Header>
                {libro.titulo} - escrito por - {libro.autor}
              </Accordion.Header>
              <Accordion.Body>
                <img
                  src={libro.portada}
                  alt={libro.titulo}
                  style={{ width: '50%', maxHeight: '300px', objectFit: 'cover', marginLeft: '100px' }}
                  className="mb-3"
                />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </main>
  );
}


