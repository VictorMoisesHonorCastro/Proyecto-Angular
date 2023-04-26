import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../servicio/usuarios.service';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './DialogComponent.component.html',
  styleUrls: ['./DialogComponent.component.css']
})
export class DialogComponentPolicial {

  httpOptions: any;

  policial: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponentPolicial>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public usuarios: UsuariosService,
    private _http: HttpClient,
    public router: Router
  ) {

    console.log('constructor');

  }

  ProductoForm = new FormGroup({

    cantidad: new FormControl('', Validators.required)

  });

  onHomeClick() {

    let parametro = this.usuarios.getParametro();

    let precio = this.usuarios.getPrecio()

    let id = this.usuarios.getUsuarioId();

    let cantidad = Number(this.ProductoForm.controls.cantidad.value!);

    let precioFinal = precio * cantidad;

    const carrito: Carrito = {

      "id_material": parametro,

      "id_user": id,

      "cantidad": cantidad,

      "precio": precioFinal

    };

    console.log(carrito);

    this.usuarios.addCarrito(carrito).subscribe({

      next: (value: Carrito) => {

        console.log(value);

        this.dialogRef.close('../carrito');

      }

    });

    this.ProductoForm.reset();

  }



  onBackClick(): void {

    this.dialogRef.close('back');

  }
}