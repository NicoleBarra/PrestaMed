import { SolicitudModelo } from "./SolicitudModelo";

export interface SolicitudUsuario {
  idUsuario: string;
  solicitudes: SolicitudModelo[];
}
