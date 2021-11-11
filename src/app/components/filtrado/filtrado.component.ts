import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogoService } from 'src/app/module/service/catalogo.service';
import { FormBuilder, Validator, FormArray, Validators } from '@angular/forms';
import { BasicProductInfo } from 'src/app/models/BasicProductInfo';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})
export class FiltradoComponent implements OnInit {
  productos:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private catalogoService: CatalogoService, private formbuild: FormBuilder) { }

  ngOnInit(): void {
    this.getProductosCategoria()
  }

  getProductosCategoria(){
    this.catalogoService
      .getProductosCategoria(this.catalogoService.categoria)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
        console.log(this.productos)
      });
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
      .getProductosFiltroCategoriaRentSell(this.catalogoService.categoria, this.opcionModel.value.rentSell)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
      });
    } else if(this.opcionModel.value.rentSell == ""){
      console.log("Error")
    } else {
      this.catalogoService
      .getProductosFiltroCategoriaRentSellPrecio(this.catalogoService.categoria, this.opcionModel.value.rentSell, this.opcionModel.value.orderBy)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any[]) => {
        this.productos = data;
      });
    }
  }

  productInfo = this.formbuild.group({
    nombre: ['', Validators.required]
  });

  buscarNombre(){
    let productInfo: BasicProductInfo = {
      name: this.productInfo.value.nombre,
      category: this.catalogoService.categoria
    }

    this.catalogoService
      .buscarNombreCategoria(productInfo)
      .subscribe((data: any[]) => {
        this.productos = data;
      });
  }
}
