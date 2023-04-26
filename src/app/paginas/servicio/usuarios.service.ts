import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { filter, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { Usuarios } from 'src/app/models/usuarios.model';
import { Categorias } from 'src/app/models/categorias.model';
import { Productos } from 'src/app/models/productos.model';
import { Carrito } from 'src/app/models/carrito.model';
import { Pedidos } from 'src/app/models/pedidos.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    readonly URL = "http://127.0.0.1:8000/api/";

    httpOptions: any;
    idProducto: any;
    Precio: any;
    id: any;
    id_punto_entrega: any;
    datosusuario: any;
    newPedidosarray: any;

    found = false;

    constructor(private _http: HttpClient) { }

    setParametro(idProducto: any, Precio: any) {
        this.idProducto = idProducto;
        this.Precio = Precio;
    }

    setUsuarioId(nuevoId: any) {
        this.id = nuevoId;
    }

    setPedidos(PedidosArray: any) {

        this.newPedidosarray = PedidosArray;

        console.log(this.newPedidosarray);
    }

    getParametro() {
        return this.idProducto;
    }

    getPrecio() {
        return this.Precio;
    }

    getUsuarioId() {
        return this.id;
    }

    getPedidos() {
        return this.newPedidosarray;
    }

    addUsuarios(usuarios: Usuarios) {
        return this._http.post(this.URL + "signup", usuarios)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }

    login(login: Login) {
        return this._http.post(this.URL + "login", login)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    } else {
                        this.found = false;
                    }
                    this.datosusuario = response;

                    localStorage.setItem('currentUser', JSON.stringify(this.datosusuario));

                    this.httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
                        })
                    };

                    return this.datosusuario;
                }
                ));
    }

    addProductos(productos: Productos) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };
        return this._http.post(this.URL + "createm", productos, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }

    addCategorias(categorias: Categorias) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };
        return this._http.post(this.URL + "createc", categorias, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }

    addCarrito(carrito: Carrito) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };
        return this._http.post(this.URL + "createca", carrito, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }

    addPedidos(pedidos: Pedidos) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser') || '').access_token}`
            })
        };
        return this._http.post(this.URL + "createpe", pedidos, this.httpOptions)
            .pipe(
                filter((response: any) => {
                    if (response != null) {
                        this.found = true;
                    }
                    else {
                        this.found = false;
                    }
                    this.datosusuario = response;
                    return this.datosusuario;
                }
                ));
    }
}
