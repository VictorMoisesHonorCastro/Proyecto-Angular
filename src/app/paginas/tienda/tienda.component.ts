import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/paginas/servicio/usuarios.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  isLoggedin = true;
  role: string = 'cliente';
  info: any;
  token: any;

  constructor(public router: Router, public servicio: UsuariosService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info = JSON.parse(currentUser).value;
      this.token = JSON.parse(currentUser).access_token;
      console.log(this.info);
      console.log(this.token);
    }
  }


  AdminClientePolicial() {
    if (this.info.rol == "admin") {
      this.router.navigate(['../policialAdmin']);
    } else if (this.info.rol == "cliente") {
      this.router.navigate(['../policialCliente']);
    }

  }

  AdminClienteAirsoft() {
    if (this.info.rol == "admin") {
      this.router.navigate(['../airsoftAdmin']);
    } else if (this.info.rol == "cliente") {
      this.router.navigate(['../airsoftCliente']);
    }
  }
}
