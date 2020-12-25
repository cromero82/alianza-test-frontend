import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/admin/cliente/model/user';
import { UserService } from 'app/admin/service/user.service';
import { CONSTANTS_SHARED } from '../../constants-shared';

@Component({
  selector: 'app-general-confirm',
  templateUrl: './general-confirm.component.html',
  styleUrls: ['./general-confirm.component.css']
})
export class GeneralConfirmComponent implements OnInit {
  /**  Constantes que utiliza el componente */
  constants = CONSTANTS_SHARED;
  /** titulo usado en el componente*/
  titulo = '';

  /** Variable usada para procesar el mensaje que se presentará al usuario */
  mensaje = '';
  myVar = 'Hello World'
  nombrePersona = 'Carlos'
  users: User[] = [];

  constructor(
    @Optional() public dialogRef: MatDialogRef<GeneralConfirmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.titulo = this.constants.confirmar.titulo;
    this.mensaje = this.constants.confirmar.mensaje;
    if (data) {
      if (typeof data.titulo != 'undefined') {
        this.titulo = data.titulo;
      }
      if (typeof data.mensaje != 'undefined') {
        this.mensaje = data.mensaje;
      }
    }
  }



  close() {
    this.dialogRef.close(0);
  }

  yes() {
    this.dialogRef.close(1);
  }

  ngOnInit(){
    this.getUsers()
  }

  par(numero:number):boolean{
    return numero%2===0 ? true : false
  }

  getUsers(){
    this.userService.getAll().subscribe(users => {
      this.users = users
      console.log(this.users)
    })
  }

}
