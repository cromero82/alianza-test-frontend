export class ClienteModel {
    id: number = 0;
  nombre: string;
  fechaCreacion!: Date;
  sharedKey!: string;
  telefono!: string;
  correo!: string;
  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}
