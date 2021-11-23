import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockModel } from 'src/app/models/BlockModel';
import { SolicitudModelo } from 'src/app/models/SolicitudModelo';
import { SolicitudUsuario } from 'src/app/models/SolicitudUsuario';
import { TransaccionRequest } from 'src/app/models/TransaccionRequest';
import { BlockchainService } from 'src/app/module/service/blockchain.service';
import { CatalogoService } from 'src/app/module/service/catalogo.service';
import { SolicitudService } from 'src/app/module/service/solicitud.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  producto: any;
  idOwnerProduct: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private catalogoService: CatalogoService,
    private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.getProductoId()
  }

  getProductoId(){
    this.catalogoService
      .getProductoId(this.catalogoService.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.producto = data;
        console.log(this.producto)
        this.idOwnerProduct = data.ownerUser
      });
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

  setIdProduct(){
    this.blockchainService.id = this.producto._id
  }

  crearSolicitudEnviada(tipo:string){
    this.registrarSolicitud(tipo)
    /*let solicitud: SolicitudModelo = {
      idProducto: this.producto._id,
      rentSellSelection: tipo,
      status: 'enviada',
      idOwnerProducto: this.producto.ownerUser,
      idRemitente: this.obtenerId(),
      name: this.producto.name,
      brand: this.producto.brand,
      description: this.producto.description,
      category: this.producto.category
    }
    var soliLista = new Array()
    soliLista.push(solicitud)
    let solicitudUsuario: SolicitudUsuario = {
      idUsuario: this.obtenerId(),
      solicitudes: soliLista
    }
    this.solicitudService.insertarSolicitud(solicitudUsuario)*/
  }

  obtenerId(){
    const sub = JSON.parse(localStorage.getItem('profile') || '{}').sub
    return sub.substr(6, )
  }

  registrarSolicitud(tipo:string){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    // Pendiente cambiar la fecha de inicio
    let block : BlockModel = {
      fechaInicio: hoy.toDateString(),
      fechaFin: '',
      tipoTransaccion: tipo + ' de solicitud',
      usuarioProveedor: this.obtenerId(),
      usuarioFinal: this.idOwnerProduct,
      comentario: ''
    }
    this.blockchainService.insertarTransaccion(this.producto._id, block)
  }
}
