
export interface Book {
  id: string;
  titulo: string;
  autor: string;
  descripcion: string;
  seccion: string;
  portada?: string; // La portada es opcional, puede no estar presente
}
