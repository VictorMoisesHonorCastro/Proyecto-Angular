import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';
import { Pedidos } from 'src/app/models/pedidos.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  [x: string]: any;

  httpOptions: any;

  puntos: any[] = [];

  element1 = false;
  element2 = false;


  info: any;
  token: any;

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

    this._http.get(this.usuarios.URL + 'indexpu', this.httpOptions).subscribe((data: any) => {
      this.puntos = data;
    });

  }

  confirmarPago(pago: any): void {
    console.log(pago.value)
    if (pago.value == '--Metodos de pago--') {
      this.element1 = false;
    } else {
      this.element1 = true;
    }
  }


  confirmarUbicacion(ubicacion: any): void {
    console.log(ubicacion.value)
    if (ubicacion.value == '--Puntos de recojida--') {
      this.element2 = false;
    } else {
      this.element2 = true;
    }

  }

  addPedido(pago: any, ubicacion: any): void {

    let pedidos = this.usuarios.getPedidos();

    console.log(pedidos);

    let jsonPedidos = JSON.stringify(pedidos);

    console.log(jsonPedidos);

    let array = JSON.parse(jsonPedidos);

    console.log(array);

    let metodo_pago = pago.value;
    let id_punto_entrega = ubicacion.value;
    let id_material = array.map((compra: { id: any; }) => compra.id);
    let id_usuario = this.info.id;
    let total = array.map((compra: { precio: any; }) => compra.precio);
    let estado = "Pendiente";

    for (let i = 0; i < id_material.length; i++) {
      const pedido: Pedidos = {
        "metodo_pago": metodo_pago,
        "id_punto_entrega": id_punto_entrega,
        "id_material": id_material[i],
        "id_usuario": id_usuario,
        "total": total[i],
        "estado": estado
      };

      console.log(pedido);

      this.usuarios.addPedidos(pedido).subscribe({
        next: (value: Pedidos) => {
          console.log(value);

          this.router.navigate(['../carrito']);
        }
      });

    }

    this._http.delete(this.usuarios.URL + `deleteca/${this.info.id}`, this.httpOptions).subscribe(() => {
    })
  }

}
