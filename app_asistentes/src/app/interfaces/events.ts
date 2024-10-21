export interface IEvents {
    id: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    ubicacion: string;
    numeroParticipantes: number,
  numeroEspectadores: number,
    maxParticipantes: number;
    maxEspectadores: number;
    estado: string;
    organizadorId: string;
    imagen: string;
    participantes: string[]; 
    espectadores: string[]; 
    comentarios: Comment[];
  }
  

export interface IEvent {
  nombre: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  numeroParticipantes: number,
  numeroEspectadores: number,
  maxParticipantes: number;
  maxEspectadores: number;
  estado: string;
  organizadorId: string;
  imagen: string;
  participantes: string[]; 
  espectadores: string[]; 
  comentarios: Comment[];
}

export interface Comment {
  titulo: string;
  puntaje: number;
  cuerpo: string;
}