import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SolicitudModelo } from 'src/app/models/SolicitudModelo';
import { SolicitudService } from 'src/app/module/service/solicitud.service';

@Component({
  selector: 'app-solicitudes-enviadas',
  templateUrl: './solicitudes-enviadas.component.html',
  styleUrls: ['./solicitudes-enviadas.component.css']
})
export class SolicitudesEnviadasComponent implements OnInit {
  solicitudes:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.getSolicitudesEnviadas()
  }

  getSolicitudesEnviadas(){
    this.solicitudService
      .getSolicitudesPendientes(this.obtenerId())
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.solicitudes = data;
        console.log(this.solicitudes)
      });
  }

  obtenerId(){
    const sub = JSON.parse(localStorage.getItem('profile') || '{}').sub
    return sub.substr(6, )
  }

  convertirCategoria(categoria: string){
    switch (categoria) {
      case "1":
        return "Agentes de diagnóstico"
      case "2":
        return "Insumos odontológicos"
      case "3":
        return "Material quirúrgico y de curación"
      case "4":
        return "Productos higiénicos"
      case "5":
        return "Equipos médicos"
      case "6":
        return "Prótesis, órtesis, ayudas funcionales"
      default:
        return "Error, no existe"
    }
  }

  actualizarEstado(estado: string, index: number){
    let solicitud: SolicitudModelo = {
      idProducto: this.solicitudes[index].idProducto,
      name: this.solicitudes[index].name,
      brand: this.solicitudes[index].brand,
      description: this.solicitudes[index].description,
      category: this.solicitudes[index].category,
      rentSellSelection: this.solicitudes[index].rentSellSelection,
      status: estado,
      idOwnerProducto: this.solicitudes[index].idOwnerProducto,
      idRemitente: this.solicitudes[index].idRemitente
    }

    this.solicitudService.actualizarEstatusSolicitud(solicitud).subscribe({
      next: (data) => {
        console.log('datos', data);
        this.solicitudes = data.solicitudes
      },
      error: (error) => {
        console.error(' error!', error);
      },
    });
  }
}
