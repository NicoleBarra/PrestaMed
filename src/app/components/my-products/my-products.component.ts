import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogoService } from 'src/app/module/service/catalogo.service';
import { ProductoService } from 'src/app/module/service/producto.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  productos:any;
  
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productoService: ProductoService, private catalogueService: CatalogoService) { }

  ngOnInit(): void {
    this.getMisProductos()
  }

  getMisProductos(){
    this.catalogueService
      .getMisProductos(this.obtenerId())
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
        console.log(data);
      });
  }

  /*getAllProductos(){
    this.productoService
      .getAllProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
      });
  }*/

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

  eliminar(id: string){
    this.productoService.eliminarProducto(id);
    this.getMisProductos();
  }

  editar(id: string){
    this.productoService.id_editar = id
  }
}
