import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsuarioService } from 'src/app/module/service/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: any;

  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private usuarioService: UsuarioService) { }


  ngOnInit(): void {
    this.getUsuario()
  }

  getUsuario(){
    const email = JSON.parse(localStorage.getItem('profile') || '{}').name;
    this.usuarioService
      .getUsuario(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.usuario = data;
        console.log(this.usuario)
      });

  }

}
