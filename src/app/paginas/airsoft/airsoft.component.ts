import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';
import { DialogComponentAirsoft } from './DialogComponent.component';

@Component({
  selector: 'app-airsoft',
  templateUrl: './airsoft.component.html',
  styleUrls: ['./airsoft.component.css']
})
export class AirsoftClienteComponent {

  httpOptions: any;

  info: any;
  token: any;

  materiales: any[] = [];
  materialesfiltrados: any[] = [];

  categorias: any[] = [];
  categoriasfiltradas: any[] = [];

  constructor(public usuarios: UsuariosService,
    public dialog: MatDialog,
    public router: Router,
    private _http: HttpClient) { }

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

    this._http.get(this.usuarios.URL + 'indexc', this.httpOptions).subscribe((data: any) => {

      this.categorias = data;

      this.categoriasfiltradas = this.categorias.filter(categorias => categorias.tipo === "airsoft");

    });

    this._http.get(this.usuarios.URL + 'indexm', this.httpOptions).subscribe((data: any) => {

      this.materiales = data;

      this.materialesfiltrados = this.materiales.filter(materiales => {

        const id = this.categorias.find(id => id.id === materiales.id_categoria);

        return id.tipo === "airsoft";

      });

    });

    localStorage.setItem('policial', JSON.stringify(this.materialesfiltrados));

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

  openDialog(): void {

    let dialogRef = this.dialog.open(DialogComponentAirsoft, {

      data: {}

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'home') {

        localStorage.removeItem('currentUser');

        this.info = null;

        console.log(this.info);

        this.router.navigate(['']);

      }

    });

  }

  Carrito(event: any, idProducto: string, Precio: string) {

    this.usuarios.setParametro(idProducto, Precio);

    this.usuarios.setUsuarioId(this.info.id);

    console.log(idProducto, Precio);
  }

}
