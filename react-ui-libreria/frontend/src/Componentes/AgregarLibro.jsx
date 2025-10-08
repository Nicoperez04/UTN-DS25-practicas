// src/Componentes/AgregarLibro.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Toast } from 'react-bootstrap';

// 1) RHF + Yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { libroSchema } from '../validations/libroSchema';

export default function AgregarLibro({ onAgregar }) {
  const [showToast, setShowToast] = useState(false);
  const [ultimo, setUltimo] = useState(null);
  const [previewPortada, setPreviewPortada] = useState(''); // mantenemos preview separada por UX

  // 2) RHF con Yup: centralizamos validación
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(libroSchema),
    defaultValues: { titulo: '', autor: '', descripcion: '', portada: null },
    mode: 'onTouched',
  });

  // 3) Actualizamos preview cuando el usuario selecciona archivo
  const archivo = watch('portada'); // file input controlado por RHF
  React.useEffect(() => {
    if (archivo && archivo instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPortada(reader.result);
      reader.readAsDataURL(archivo);
    } else {
      setPreviewPortada('');
    }
  }, [archivo]);

  // 4) Submit validado: armamos objeto libro y lo enviamos arriba
  const onSubmit = (data) => {
    // Si hay preview, la usamos como portada; si no, placeholder (como tenías)
    const portadaFinal = previewPortada || 'https://via.placeholder.com/150';
    const nuevo = {
      id: `libro-${Date.now()}`,
      titulo: data.titulo.trim(),
      autor: data.autor.trim(),
      descripcion: (data.descripcion || '').trim(),
      portada: portadaFinal,
    };
    onAgregar(nuevo);       // agregamos al catálogo de la app
    setUltimo(nuevo);
    setShowToast(true);
    reset();                // limpiamos el formulario y preview
    setPreviewPortada('');
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
                  {/* 5) RHF: validación previa a onSubmit */}
                  <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    {/* Portada (opcional) */}
                    <Form.Group controlId="portada" className="mb-3">
                      <Form.Label>Portada (opcional)</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        aria-invalid={!!errors.portada || undefined}
                        aria-describedby="portada-error"
                        // RHF registra el input; tomamos el primer archivo
                        {...register('portada')}
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          // Pasamos el File a RHF; manejarlo así mantiene compatibilidad
                          const ev = { target: { name: 'portada', value: f } };
                          register('portada').onChange(ev);
                        }}
                        className={errors.portada ? 'input-error' : ''}
                      />
                      {errors.portada && (
                        <div id="portada-error" className="field-error">
                          {errors.portada.message}
                        </div>
                      )}
                    </Form.Group>

                    {/* Vista previa */}
                    {previewPortada && (
                      <div className="text-center mb-3">
                        <img
                          src={previewPortada}
                          alt="Preview"
                          style={{ maxHeight: '150px', borderRadius: '4px' }}
                        />
                      </div>
                    )}

                    {/* Título */}
                    <Form.Group controlId="titulo" className="mb-3">
                      <Form.Label>Título</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Título del libro"
                        aria-invalid={!!errors.titulo || undefined}
                        aria-describedby="titulo-error"
                        {...register('titulo')}
                        className={errors.titulo ? 'input-error' : ''}
                      />
                      {errors.titulo && (
                        <div id="titulo-error" className="field-error">
                          {errors.titulo.message}
                        </div>
                      )}
                    </Form.Group>

                    {/* Autor */}
                    <Form.Group controlId="autor" className="mb-3">
                      <Form.Label>Autor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Autor del libro"
                        aria-invalid={!!errors.autor || undefined}
                        aria-describedby="autor-error"
                        {...register('autor')}
                        className={errors.autor ? 'input-error' : ''}
                      />
                      {errors.autor && (
                        <div id="autor-error" className="field-error">
                          {errors.autor.message}
                        </div>
                      )}
                    </Form.Group>

                    {/* Descripción */}
                    <Form.Group controlId="descripcion" className="mb-4">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Breve sinopsis (opcional)"
                        aria-invalid={!!errors.descripcion || undefined}
                        aria-describedby="descripcion-error"
                        {...register('descripcion')}
                        className={errors.descripcion ? 'input-error' : ''}
                      />
                      {errors.descripcion && (
                        <div id="descripcion-error" className="field-error">
                          {errors.descripcion.message}
                        </div>
                      )}
                    </Form.Group>

                    {/* Enviar */}
                    <div className="d-grid">
                      <Button
                        type="submit"
                        style={{ backgroundColor: '#35113d', color: '#fff' }}
                        disabled={isSubmitting}
                      >
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

      {/* Toast de confirmación */}
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
          {ultimo?.portada && (
            <img
              src={ultimo.portada}
              alt="Portada mini"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginRight: '0.5rem'
              }}
            />
          )}
          <span>{ultimo?.titulo} agregado</span>
        </Toast.Body>
      </Toast>
    </>
  );
}
