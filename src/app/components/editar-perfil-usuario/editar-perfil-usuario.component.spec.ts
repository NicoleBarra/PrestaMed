import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilUsuarioComponent } from './editar-perfil-usuario.component';
import {UsuarioService} from 'src/app/module/service/usuario.service'

describe('EditarPerfilUsuarioComponent', () => {
  let component: EditarPerfilUsuarioComponent;
  let fixture: ComponentFixture<EditarPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
