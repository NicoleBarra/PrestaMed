import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormArray, Validators } from '@angular/forms';
import { ProductoRequest } from 'src/app/models/ProductoRequest';
import { ProductoService } from 'src/app/module/service/producto.service';

@Component({
  selector: 'app-my-products-add',
  templateUrl: './my-products-add.component.html',
  styleUrls: ['./my-products-add.component.css']
})
export class MyProductsAddComponent implements OnInit {

  constructor(private formbuild: FormBuilder,
    private productoService: ProductoService) { }

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
    console.log("Agregar producto")
    let producto: ProductoRequest = {
      name: this.modeloProducto.value.name,
      category: this.modeloProducto.value.category,
      //ownerId: string;
      rentPriceDay: this.modeloProducto.value.rentPriceDay,
      sellPrice: this.modeloProducto.value.sellPrice,
      brand: this.modeloProducto.value.brand,
      description: this.modeloProducto.value.description,
      rentSell: this.rentOrSellOption(this.modeloProducto.value.rentSelected, this.modeloProducto.value.sellSelected),
      image: this.modeloProducto.value.image
    }
    console.log(producto)
    this.productoService.insertarProducto(producto)
    this.modeloProducto.reset()
  }

  rentOrSellOption(rentOption: boolean, sellOption: boolean){
    if(rentOption && !sellOption){
      return "rent"
    } else if(!rentOption && sellOption){
      return "sell"
    } else {
      return "both"
    }
  }
}
