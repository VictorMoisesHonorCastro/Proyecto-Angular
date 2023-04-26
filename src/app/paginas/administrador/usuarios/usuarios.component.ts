import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicio/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  httpOptions: any;

  error = true;

  foto: any;
  info: any;

  UsuariosForm!: FormGroup;

  UsuariosArray: any[] = [];

  element1 = true;
  element2 = true;


  constructor(private usuarios: UsuariosService, public router: Router, private _http: HttpClient) { }

  ngOnInit(): void {

    this.UsuariosForm = new FormGroup({
      photo: new FormControl('', Validators.required),

      name: new FormControl('', Validators.required),

      lastname: new FormControl('', Validators.required),

      password: new FormControl('', Validators.required),

      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),

      phone: new FormControl('', Validators.required),

      dni: new FormControl('', Validators.required)
    });


    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info = JSON.parse(currentUser).value;
      console.log(this.info);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this._http.get(this.usuarios.URL + 'indexusuarios', this.httpOptions).subscribe((data: any) => {
      this.UsuariosArray = data;
    });

  }

  get f() {
    return this.UsuariosForm.controls;
  }

  onFileChange(event: any) {
    this.foto = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.foto);
    reader.onload = (event: any) => {
      this.foto = reader.result;
      console.log(this.foto);
    }
  }

  addUsuario(): void {

    const cliente: Usuarios = {
      "id":this.UsuariosForm.value.id,
      "photo": this.foto,
      "name": this.UsuariosForm.value.name,
      "lastname": this.UsuariosForm.value.lastname,
      "password": this.UsuariosForm.value.password,
      "email": this.UsuariosForm.value.email,
      "phone": parseInt(this.UsuariosForm.value.phone),
      "dni": this.UsuariosForm.value.dni
    };

    console.log(cliente);

    this.usuarios.addUsuarios(cliente).subscribe({
      next: (value: Usuarios) => {

        console.log(value);

      }
    });



    this.UsuariosForm.reset();
  }

  MensajeCorrecto() {
    Swal.fire(
      'Usuario registrado!',
      'El usuario se ha registrado correctamente!',
      'success'
    );
  }

  showButton1() {
    this.element1 = false;
  }

  hideButton1() {
    this.element1 = true;
  }

  showButton2() {
    this.element2 = false;
  }

  hideButton2() {
    this.element2 = true;
  }

}
