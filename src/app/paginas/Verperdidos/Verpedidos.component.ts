import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';
import { Pedidos } from 'src/app/models/pedidos.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './VerPedidos.component.html',
  styleUrls: ['./VerPedidos.component.css']
})
export class VerPedidosComponent implements OnInit {

  httpOptions: any;
  info: any;
  token: any;
  pedidos: any;

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

    if (this.info.rol == "cliente") {
      this._http.get(this.usuarios.URL + `indexo/${this.info.id}`, this.httpOptions).subscribe((data: any) => {
        this.pedidos = data;
      });
    } else if (this.info.rol == "admin") {
      this._http.get(this.usuarios.URL + 'index', this.httpOptions).subscribe((data: any) => {
        this.pedidos = data;
      });
    }

    if (this.pedidos == null) {
      this.element = true;
    } else {
      this.element = false;
    }
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

}
