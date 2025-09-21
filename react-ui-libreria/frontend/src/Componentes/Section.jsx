import React from 'react';
import { Accordion } from 'react-bootstrap';

export default function Section({ title, libros }) {
  return (
    <main className="contenido-principal">

      <section className="seccion-libros">
        {libros.map((libro, idx) => (
          <Accordion
            key={libro.id}
            defaultActiveKey={null}     
            className="w-100"           
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {libro.titulo} — escrito por — {libro.autor}
              </Accordion.Header>
              <Accordion.Body>
                {/* Portada */}
                <img
                  src={libro.portada}
                  alt={libro.titulo}
                  className="img-fluid mb-3"
                  style={{ borderRadius: '4px' }}
                />
                {/* Descripción */}
                <p>{libro.descripcion}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </section>
    </main>
  );
}




