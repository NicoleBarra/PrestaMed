export interface SolicitudModelo {
  _id: string;
  idProducto: string;
  name: string;
	brand: string;
	description: string;
	category: string;
  rentSellSelection: string;
  status: string;
  idDuenoProducto: string;
  idRemitente: string;
  fechaInicio: string;
  fechaFin: string;
  comentario: string;
  image: string;
}
