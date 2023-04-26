import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/models/categorias.model';
import { Productos } from 'src/app/models/productos.model';
import { UsuariosService } from '../../servicio/usuarios.service';

@Component({
  selector: 'app-policial',
  templateUrl: './policial.component.html',
  styleUrls: ['./policial.component.css']
})
export class PolicialAdminComponent implements OnInit {

  httpOptions: any;

  materiales: any[] = [];
  categorias: any[] = [];

  img: any;

  error = true;

  element1 = true;
  element2 = true;
  element3 = true;

  productosForm = new FormGroup({
    img: new FormControl('', Validators.required),

    nombre: new FormControl('', Validators.required),

    marca: new FormControl('', Validators.required),

    descripcion: new FormControl('', Validators.required),

    cantidad: new FormControl('', Validators.required),

    precio: new FormControl('', Validators.required),

    id_categoria: new FormControl('', Validators.required)
  });

  categoriasForm = new FormGroup({
    nombre: new FormControl('', Validators.required),

    descripcion: new FormControl('', Validators.required),

    tipo: new FormControl('', Validators.required),
  });

  constructor(public usuarios: UsuariosService, public router: Router, private _http: HttpClient) { }

  info: any;
  token: any;

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info = JSON.parse(currentUser).value;
      this.token = JSON.parse(currentUser).access_token;
      console.log(this.info);
      console.log(this.token);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this._http.get(this.usuarios.URL + 'indexm', this.httpOptions).subscribe((data: any) => {
      this.materiales = data;
    });

    this._http.get(this.usuarios.URL + 'indexc', this.httpOptions).subscribe((data: any) => {
      this.categorias = data;
    });
  }

  onFileChange(event: any) {
    this.img = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.img);
    reader.onload = (event: any) => {
      this.img = reader.result;
      console.log(this.img);
    }
  }

  addProducto(): void {
    let img = this.img;
    let nombre = this.productosForm.controls.nombre.value!;
    let marca = this.productosForm.controls.marca.value!;
    let descripcion = this.productosForm.controls.descripcion.value!;
    let cantidad = this.productosForm.controls.cantidad.value!;
    let precio = this.productosForm.controls.precio.value!;
    let id_categoria = this.productosForm.controls.id_categoria.value!;



    const producto: Productos = {
      "img": img,
      "nombre": nombre,
      "marca": marca,
      "descripcion": descripcion,
      "cantidad": cantidad,
      "precio": precio,
      "id_categoria": id_categoria
    };

    console.log(producto);

    this.usuarios.addProductos(producto).subscribe({
      next: (value: Productos) => {
        console.log(value);

        this.router.navigate(['../policial']);
      }
    });
    this.productosForm.reset();
  }

  addCategoria(): void {
    let nombre = this.categoriasForm.controls.nombre.value!;
    let descripcion = this.categoriasForm.controls.descripcion.value!;
    let tipo = this.categoriasForm.controls.tipo.value!;



    const categoria: Categorias = {
      "nombre": nombre,
      "descripcion": descripcion,
      "tipo": tipo,
    };

    console.log(categoria);

    this.usuarios.addCategorias(categoria).subscribe({
      next: (value: Categorias) => {
        console.log(value);

        this.router.navigate(['../tienda']);
      }
    });
    this.productosForm.reset();
  }

  logout() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
      })
    };

    this._http.get(this.usuarios.URL + 'logout', this.httpOptions).subscribe(() => {
      // Borrar el token de autenticación del usuario actual
      localStorage.removeItem('currentUser');
      // Redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['']);
    })

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

  showButton3() {
    this.element3 = false;
  }

  hideButton3() {
    this.element3 = true;
  }

}
