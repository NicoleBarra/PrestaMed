import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductoResponse } from 'src/app/models/ProductoResponse';
import { ProductoService } from 'src/app/module/service/producto.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-products-edit',
  templateUrl: './my-products-edit.component.html',
  styleUrls: ['./my-products-edit.component.css']
})
export class MyProductsEditComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  producto: ProductoResponse = {
    _id: '',
    name: '',
    category: '',
    ownerUser: '',
    rentPriceDay: 0,
    sellPrice: 0,
    brand: '',
    description: '',
    rentSell: '',
    image: ''
  }

  constructor(private productoService: ProductoService, private formbuild: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productoService
      .getProducto(this.productoService.id_editar)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.producto = data;
        console.log(this.producto)
      });
  }

  modeloProductoEdit = this.formbuild.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    brand: ['', Validators.required],
    description: ['', Validators.required],
    rentSelected: ['', Validators.required],
    sellSelected: ['', Validators.required],
    image: ['', Validators.required],
    rentPriceDay: ['', Validators.required],
    sellPrice: ['', Validators.required],
    category: ['', Validators.required]
  });

  validacionActualizarProducto(){
    this.producto._id = this.productoService.id_editar
    if (this.modeloProductoEdit.value.name != "") {
      this.producto.name = this.modeloProductoEdit.value.name;
    }
    if (this.modeloProductoEdit.value.brand != "") {
      this.producto.brand = this.modeloProductoEdit.value.brand;
    }
    if (this.modeloProductoEdit.value.description != "") {
      this.producto.description = this.modeloProductoEdit.value.description;
    }
    this.producto.rentSell = this.rentOrSellOption(this.modeloProductoEdit.value.rentSelected, this.modeloProductoEdit.value.sellSelected)
    this.producto.image = this.modeloProductoEdit.value.image;
    if (this.modeloProductoEdit.value.rentPriceDay != "") {
      this.producto.rentPriceDay = this.modeloProductoEdit.value.rentPriceDay;
    }
    if (this.modeloProductoEdit.value.sellPrice != "") {
      this.producto.sellPrice = this.modeloProductoEdit.value.sellPrice;
    }
    this.producto.category = this.modeloProductoEdit.value.category;
    this.producto.ownerUser = this.obtenerId()
  }

  actualizarProducto(){
    this.validacionActualizarProducto()
    console.log(this.producto)
    this.productoService.editarProducto(this.producto)
    this.modeloProductoEdit.reset()
    this.resetProducto()
    this.router.navigate(['/mis-productos'])
    this.toastr.success("El producto se ha editado.")
  }

  rentOrSellOption(rentOption: boolean, sellOption: boolean){
    if(rentOption && !sellOption){
      return "Renta"
    } else if(!rentOption && sellOption){
      return "Venta"
    } else {
      return "Ambos"
    }
  }

  resetProducto(){
    this.producto = {
      _id: '',
      name: '',
      category: '',
      ownerUser: '',
      rentPriceDay: 0,
      sellPrice: 0,
      brand: '',
      description: '',
      rentSell: '',
      image: ''
    }
  }

  obtenerId(){
    const sub = JSON.parse(localStorage.getItem('profile') || '{}').sub
    return sub.substr(6, )
  }
}