import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Toast } from 'react-bootstrap';

export default function AgregarLibro({ onAgregar }) {
  // Estado de los campos del formulario
  const [datos, setDatos] = useState({
    titulo: '',
    autor: '',
    descripcion: ''
  });
  
  const [filePortada, setFilePortada] = useState(null); //La imagen y la preview
  const [previewPortada, setPreviewPortada] = useState(''); //Para la portada
  const [showToast, setShowToast] = useState(false); //Para el toast
  const [ultimo, setUltimo] = useState(null);

  // Actualiza texto en los inputs
  const handleInputChange = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
  };

  // Captura el archivo de imagen y genera preview
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFilePortada(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPortada(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePortada(null);
      setPreviewPortada('');
    }
  };

  // Maneja el tema del envio del formulario del libro argegado
  const handleSubmit = e => {
    e.preventDefault();
    const portadaFinal = previewPortada || 'https://via.placeholder.com/150'; // esto por si no sube nada
    const nuevo = {
      id: `libro-${Date.now()}`,
      titulo: datos.titulo,
      autor: datos.autor,
      descripcion: datos.descripcion,
      portada: portadaFinal
    };
    onAgregar(nuevo); // Esto lo agrega al catalogo para que se vea, no lo agregue en las secciones
    setUltimo(nuevo);             
    setDatos({ titulo: '', autor: '', descripcion: '' });
    setFilePortada(null);
    setPreviewPortada('');
    setShowToast(true);           
  };

  return (
    <>
      <main className="contenido-principal">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="shadow-sm">
                <Card.Header style={{ backgroundColor: '#35113d', color: '#fff' }}>
                  <h2 className="mb-0">Agregar Nuevo Libro</h2>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {/* Subida de imagen */}
                    <Form.Group controlId="portada" className="mb-3">
                      <Form.Label>Portada (opcional)</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Form.Group>
                    {/* Vista previa de la imagen que subio */}
                    {previewPortada && (
                      <div className="text-center mb-3">
                        <img
                          src={previewPortada}
                          alt="Preview"
                          style={{ maxHeight: '150px', borderRadius: '4px' }}
                        />
                      </div>
                    )}

                    {/* Titulo */}
                    <Form.Group controlId="titulo" className="mb-3">
                      <Form.Label>Título</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Título del libro"
                        value={datos.titulo}
                        onChange={e => handleInputChange('titulo', e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Autor */}
                    <Form.Group controlId="autor" className="mb-3">
                      <Form.Label>Autor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Autor del libro"
                        value={datos.autor}
                        onChange={e => handleInputChange('autor', e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* Descripcion*/}
                    <Form.Group controlId="descripcion" className="mb-4">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Breve sinopsis (opcional)"
                        value={datos.descripcion}
                        onChange={e => handleInputChange('descripcion', e.target.value)}
                      />
                    </Form.Group>

                    {/* Boton para enviar el nuevo libro como agregado*/}
                    <div className="d-grid">
                      <Button type="submit" style={{ backgroundColor: '#35113d', color: '#fff' }}>
                        Agregar Libro
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Toast que aparece al costadito cuando lo agregas */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
        delay={3000}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Nuevo Libro</strong>
        </Toast.Header>
        <Toast.Body className="d-flex align-items-center">
          <img
            src={ultimo?.portada}
            alt="Portada mini"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginRight: '0.5rem'
            }}
          />
          <span>{ultimo?.titulo} agregado</span> {/**Esto no se si funciona */}
        </Toast.Body>
      </Toast>
    </>
  );
}
