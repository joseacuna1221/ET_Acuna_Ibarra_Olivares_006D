export interface IQREvento {
  evento: {
    id: string;
    nombre: string;
    fecha: string;
    usuario: {
      id: string;
      rut: number;
      email: string;
      nombre: string;
      apellido: string;
    };
  };
}