import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormArray, Validators } from '@angular/forms';
import { ProductoRequest } from 'src/app/models/ProductoRequest';
import { ProductoService } from 'src/app/module/service/producto.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-products-add',
  templateUrl: './my-products-add.component.html',
  styleUrls: ['./my-products-add.component.css']
})
export class MyProductsAddComponent implements OnInit {

  constructor(private formbuild: FormBuilder,
    private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
  }

  

  modeloProducto = this.formbuild.group({
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

  agregarProducto(){
    console.log("obtener id")
    console.log(this.obtenerId)
    let producto: ProductoRequest = {
      name: this.modeloProducto.value.name,
      category: this.modeloProducto.value.category,
      ownerUser: this.obtenerId(),
      rentPriceDay: this.modeloProducto.value.rentPriceDay,
      sellPrice: this.modeloProducto.value.sellPrice,
      brand: this.modeloProducto.value.brand,
      description: this.modeloProducto.value.description,
      rentSell: this.rentOrSellOption(this.modeloProducto.value.rentSelected, this.modeloProducto.value.sellSelected),
      image: this.modeloProducto.value.image
    }
    this.productoService.insertarProducto(producto)
    this.modeloProducto.reset()
    this.router.navigate(['/mis-productos'])
  }

  rentOrSellOption(rentOption: boolean, sellOption: boolean){
    if(rentOption && !sellOption){
      return "Renta"
    } else if(!rentOption && sellOption){
      return "Venta"
    } else {
      return "Renta Venta"
    }
  }

  obtenerId(){
    const sub = JSON.parse(localStorage.getItem('profile') || '{}').sub
    return sub.substr(6, )
  }
}
