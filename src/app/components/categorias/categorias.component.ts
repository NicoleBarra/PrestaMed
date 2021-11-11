import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductoService } from 'src/app/module/service/producto.service';
import { takeUntil } from 'rxjs/operators';
import { CatalogoService } from 'src/app/module/service/catalogo.service';
import { RentSellFiltro } from 'src/app/models/RentSellFiltro';
import { FormBuilder, Validator, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  productos:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productoService: ProductoService,
    private catalogoService: CatalogoService,
    private formbuild: FormBuilder) { }

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

  opcionModel = this.formbuild.group({
    rentSell: ['', Validators.required],
    orderBy: ['', Validators.required]
  });

  filtroRentSell(){
    if(this.opcionModel.value.orderBy == ""){
      this.catalogoService
      .getProductosFiltroRentSell(this.opcionModel.value.rentSell)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
      });
    } else if(this.opcionModel.value.rentSell == ""){
      console.log("Error")
    } else {
      this.catalogoService
      .getProductosFiltroRentSellOrderBy(this.opcionModel.value.rentSell, this.opcionModel.value.orderBy)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
      });
    }
  }
}
