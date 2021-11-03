import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockchainService } from 'src/app/module/service/blockchain.service';
import { CatalogoService } from 'src/app/module/service/catalogo.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  producto: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private catalogoService: CatalogoService, private blockchainService: BlockchainService) { }

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
}
