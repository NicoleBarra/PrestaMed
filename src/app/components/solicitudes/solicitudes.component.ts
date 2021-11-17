import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SolicitudService } from 'src/app/module/service/solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudUsuario:any;
  solicitudes:any;
  producto:any;
  listaIdProductos:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.getAllSolicitudes()
  }

  //Pendiente yo creo que voy a repetir la info
  /*getProductoInfo(idProducto: string){
    this.productoService
      .getProducto(idProducto)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.producto = data;
        console.log(this.producto)
      });
  }*/

  getAllSolicitudes(){
    this.solicitudService
      .getAllSolicitudes(this.obtenerId())
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.solicitudUsuario = data;
        this.solicitudes = this.solicitudUsuario.solicitudes
        console.log(this.solicitudUsuario.solicitudes)
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
}
