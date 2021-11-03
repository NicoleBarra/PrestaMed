import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductoService } from 'src/app/module/service/producto.service';
import { takeUntil } from 'rxjs/operators';
import { CatalogoService } from 'src/app/module/service/catalogo.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  productos:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productoService: ProductoService, private catalogoService: CatalogoService) { }

  ngOnInit(): void {
    this.getAllProductos()
  }

  getAllProductos(){
    this.productoService
      .getAllProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
      });
  }

  setCategoria(categoria: string){
    this.catalogoService.categoria = categoria
  }

  setIdProducto(id: string){
    this.catalogoService.id = id
  }
}
