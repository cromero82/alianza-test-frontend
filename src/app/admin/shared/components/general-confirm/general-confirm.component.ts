import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    @Optional() public dialogRef: MatDialogRef<GeneralConfirmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
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

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(0);
  }

  yes() {
    this.dialogRef.close(1);
  }

}
