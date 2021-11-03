import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogoService } from 'src/app/module/service/catalogo.service';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})
export class FiltradoComponent implements OnInit {
  productos:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private catalogoService: CatalogoService) { }

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
}
