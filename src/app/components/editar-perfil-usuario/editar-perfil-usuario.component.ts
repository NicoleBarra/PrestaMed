import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UsuarioResponse } from 'src/app/models/UsuarioResponse';
import { UsuarioInfoResponse } from 'src/app/models/UsuarioInfoResponse';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/module/service/usuario.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil-usuario',
  templateUrl: './editar-perfil-usuario.component.html',
  styleUrls: ['./editar-perfil-usuario.component.css']
})
export class EditarPerfilUsuarioComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  usuario: UsuarioInfoResponse = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    zone: ''
  }

  constructor(private usuarioService: UsuarioService, private formBuild: FormBuilder) {}

  ngOnInit(): void {
    this.getInfoUsuario()
  }

  getInfoUsuario(){
    const email1 = JSON.parse(localStorage.getItem('profile') || '{}').name;
    this.usuarioService
    .getUsuario(email1)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.usuario = data;
      console.log(this.usuario)
    });
  }

  modeloUsuarioEdit = this.formBuild.group({
    id: ['', Validators.required],
    client_id: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    request_language: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name:['', Validators.required],
    zone:['', Validators.required]
  });

  validacionActualizarUsuario(){
    this.usuario.email = JSON.parse(localStorage.getItem('profile') || '{}').name;
    if (this.modeloUsuarioEdit.value.password != "") {
      this.usuario.password = this.modeloUsuarioEdit.value.password;
    }
    if (this.modeloUsuarioEdit.value.first_name != "") {
      this.usuario.first_name = this.modeloUsuarioEdit.value.first_name;
    }
    if (this.modeloUsuarioEdit.value.last_name != "") {
      this.usuario.last_name = this.modeloUsuarioEdit.value.last_name;
    }
    if (this.modeloUsuarioEdit.value.zone != "") {
      this.usuario.zone = this.modeloUsuarioEdit.value.zone;
    }
  }

    actualizarUsuario(){
      this.validacionActualizarUsuario()
      console.log("usuario")
      console.log(this.usuario)
      this.usuarioService.editarUsuario(this.usuario)
      this.modeloUsuarioEdit.reset()
      this.resetUsuario()
      this.getInfoUsuario()
    }


  resetUsuario(){
    this.usuario = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      zone: ''
    }
  }
}
