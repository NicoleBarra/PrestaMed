import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockModel } from 'src/app/models/BlockModel';
import { SolicitudModelo } from 'src/app/models/SolicitudModelo';
import { BlockchainService } from 'src/app/module/service/blockchain.service';
import { SolicitudService } from 'src/app/module/service/solicitud.service';

@Component({
  selector: 'app-solicitudes-enviadas',
  templateUrl: './solicitudes-enviadas.component.html',
  styleUrls: ['./solicitudes-enviadas.component.css']
})
export class SolicitudesEnviadasComponent implements OnInit {
  solicitudes:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private solicitudService: SolicitudService,
    private blockService: BlockchainService,
    private formbuild: FormBuilder) { }

  ngOnInit(): void {
    this.getSolicitudesEnviadas()
  }
  modeloSolicitudEdit = this.formbuild.group({
    comentario: ['', Validators.required]
  });
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
    this.registrarAcReSolicitud(estado, index)
    
    let solicitud: SolicitudModelo = {
      idProducto: this.solicitudes[index].idProducto,
      name: this.solicitudes[index].name,
      brand: this.solicitudes[index].brand,
      description: this.solicitudes[index].description,
      category: this.solicitudes[index].category,
      rentSellSelection: this.solicitudes[index].rentSellSelection,
      status: estado,
      idDuenoProducto: this.solicitudes[index].idDuenoProducto,
      idRemitente: this.solicitudes[index].idRemitente,
      fechaInicio: this.solicitudes[index].fechaInicio,
      fechaFin: this.solicitudes[index].fechaFin,
      comentario: this.modeloSolicitudEdit.value.comentario,
      image: this.solicitudes[index].image
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

  registrarAcReSolicitud(tipo:string, index:number){
    console.log(this.solicitudes[index].idOwnerProducto)
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    let block : BlockModel = {
      fechaInicio: hoy.toDateString(),
      fechaFin: hoy.toDateString(),
      tipoTransaccion: tipo + ' la solicitud',
      usuarioProveedor: this.obtenerId(),
      usuarioFinal: this.solicitudes[index].idOwnerProducto,
      comentario: this.comentarioModelo.value.comentario
    }
    this.blockService.insertarTransaccion(this.solicitudes[index].idProducto, block)
  }

  comentarioModelo = this.formbuild.group({
    comentario: ['', Validators.required]
  });

  obtenerComentario(){
    console.log(this.comentarioModelo.value.comentario)
  }
}
