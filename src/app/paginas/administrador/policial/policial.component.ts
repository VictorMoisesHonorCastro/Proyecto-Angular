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
  materialesfiltrados: any[] = [];
  categorias: any[] = [];
  categoriasfiltradas: any[] = [];

  img: any;

  error = true;

  element1 = true;
  element2 = true;
  element3 = true;

  productosForm!: FormGroup;
  categoriasForm!: FormGroup;

  constructor(public usuarios: UsuariosService, public router: Router, private _http: HttpClient) { }

  info: any;
  token: any;

  ngOnInit() {

    this.productosForm = new FormGroup({
      img: new FormControl('', Validators.required),

      nombre: new FormControl('', Validators.required),

      marca: new FormControl('', Validators.required),

      descripcion: new FormControl('', Validators.required),

      cantidad: new FormControl('', Validators.required),

      precio: new FormControl('', Validators.required),

      id_categoria: new FormControl('', Validators.required)
    });

    this.categoriasForm = new FormGroup({
      nombre: new FormControl('', Validators.required),

      descripcion: new FormControl('', Validators.required),

      tipo: new FormControl('', Validators.required),
    });

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

    this._http.get(this.usuarios.URL + 'indexc', this.httpOptions).subscribe((data: any) => {
      this.categorias = data;
      this.categoriasfiltradas = this.categorias.filter(categorias => categorias.tipo === "policial");
    });

    this._http.get(this.usuarios.URL + 'indexm', this.httpOptions).subscribe((data: any) => {
      this.materiales = data;
      this.materialesfiltrados = this.materiales.filter(materiales => {
        const id = this.categorias.find(id => id.id === materiales.id_categoria);
        return id.tipo === "policial";
      });
    });
  }

  get p() {
    return this.productosForm.controls;
  }

  get c() {
    return this.categoriasForm.controls;
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

    const producto: Productos = {
      "img": this.img,
      "nombre": this.productosForm.value.nombre,
      "marca": this.productosForm.value.marca,
      "descripcion": this.productosForm.value.descripcion,
      "cantidad": this.productosForm.value.cantidad,
      "precio": this.productosForm.value.precio,
      "id_categoria": this.productosForm.value.id_categoria
    };

    console.log(producto);

    this.usuarios.addProductos(producto).subscribe({
      next: (value: Productos) => {
        console.log(value);

        this.router.navigate(['../policialAdmin']);
      }
    });
    this.productosForm.reset();
  }

  addCategoria(): void {

    const categoria: Categorias = {
      "nombre": this.categoriasForm.value.nombre,
      "descripcion": this.categoriasForm.value.descripcion,
      "tipo": this.categoriasForm.value.tipo,
    };

    console.log(categoria);

    this.usuarios.addCategorias(categoria).subscribe({
      next: (value: Categorias) => {
        console.log(value);

        this.router.navigate(['../policialAdmin']);
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
