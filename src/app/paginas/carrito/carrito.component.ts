import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  [x: string]: any;

  productos: any[] = [];
  productosfiltrados: any[] = [];

  httpOptions: any;
  info: any;
  token: any;
  precio: any;

  element = false;

  constructor(public usuarios: UsuariosService, public router: Router, private _http: HttpClient) { }

  ngOnInit(): void {
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

    this._http.get(this.usuarios.URL + 'indexca', this.httpOptions).subscribe((data: any) => {
      this.productos = data;
      this.productosfiltrados = this.productos.filter(productos => productos.id_user === this.info.id);

      if (this.productosfiltrados.length == 0) {
        this.element = true;
      } else {
        this.element = false;
      }
    });


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

  Pedido() {

    let pedidos: any[] = [];

    this.productosfiltrados.forEach(
      (producto) => {

        let pedido = {
          id: producto.id_material,
          precio: producto.precio
        };

        console.log(`${producto.id_material} - ${producto.precio}`);

        pedidos.push(pedido);

      }
    );

    this.usuarios.setPedidos(pedidos);

    this.router.navigate(['../confirmarCompra']);

  }

}
