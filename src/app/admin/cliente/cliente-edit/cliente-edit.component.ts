
import { Component, OnInit, Inject } from '@angular/core';
import { ClienteModel } from '../model/cliente-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { UserService } from 'app/seguridad/services/user.service';
import { UtilitiesService } from 'app/admin/shared/services/utilities.service';
import { GeneralConfirmComponent } from 'app/admin/shared/components/general-confirm/general-confirm.component';
import { CLIENTE_CONSTANTS } from '../model/CLIENTE_CONSTANTS';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit{
  roles: any = [];
  cliente: ClienteModel;
  form: FormGroup;
  submitted = false;
  disableSubmit = false;
  constants = CLIENTE_CONSTANTS;
  filteredEstudiantes: Observable<ClienteModel>;
  estudianteList: ClienteModel[] = [];
  clone = {};
  constructor(private dialogRef: MatDialogRef<ClienteEditComponent>,
    private formBuilder: FormBuilder,
    private servicio: ClienteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private utilitiesService: UtilitiesService,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.cliente = data.itemData;
    }

  ngOnInit(): void {
    this.initForm();
    if (this.cliente.id > 0) {
      this.clone = JSON.parse(JSON.stringify(this.cliente));
    }else {
      this.cliente.id = 0;
    }
  }

  initForm() {
    if(this.cliente === undefined || this.cliente === null) {
      this.cliente = new ClienteModel();
    }
   this.form = this.formBuilder.group({
    'id': [null, null],
    'sharedKey': [null, null],
    'fechaCreacion': [null, null],
    'nombre': [null, [Validators.required, Validators.maxLength(100),]],
    'telefono': [null, [Validators.required, Validators.maxLength(15),]],
    'correo': [null, [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    ]]
   });
  //  this.form.get('activo')!.setValue(this.cliente.activo);
  //  this.form.get('avatar')!.setValue(this.cliente.avatar);

  }


  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onChangeArchivo(archivoId: number) {
    if (archivoId > 0 ) {
      const datagenia =  { id : archivoId  };
      let form = this.form.get('datagenia') as any;
      form.setValue(datagenia);
    }
  }

  onSubmit() {
    this.submitted = true;
    // if (this.cliente.password !== this.cliente.repetirPassword) {
    //   this.utilitiesService.simpleWarningMessage('La contraseña es distinta en cada campo', this.snackBar);
    //   return;
    // }
    // this.cliente.username = this.cliente.email;
    //this.form.get('activo')!.setValue(this.cliente.activo);

    this.markFormGroupTouched(this.form);
    // se actualizan las listas con el model
    this.cliente = this.form.value;
    // if (this.form.value.listatipopregunta !== undefined) {
    //   this.form.get('tipopregunta')!.setValue(this.form.value.listatipopregunta.id);
    // }
    if (this.form.valid === true) {
      // this.enviada = true;
      // this.disabledBtn_Login = true;
      this.save();
    } else {
      this.utilitiesService.formWarningMessage(this.snackBar);
    }
  }

  save() {
    this.form.value.sharedKey = this.form.value.nombre;
    if(this.form.value.id == 0) {
      this.servicio.create(this.form.value).subscribe(
        data => {
          this.dialogRef.close(this.form.value);
        },
        error => {
          this.onErrorResult(error);
        }
      );
    } else {
      this.servicio.update(this.form.value).subscribe(
        data => {
          this.dialogRef.close(this.form.value);
        },
        error => {
          this.onErrorResult(error);
        }
      );
    }
  }

  onErrorResult(error:any) {
    this.disableSubmit = false;
    this.utilitiesService.formErrorMessages(error, this.form, this.snackBar);
  }

  close() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.width = '30%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(GeneralConfirmComponent, dialogConfig);

    dialogRef.beforeClosed().subscribe((val: any) => {
      if (val === 1) {
        Object.assign(this.cliente, this.clone);
        this.dialogRef.close();
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
      control.markAsTouched();
      control.updateValueAndValidity();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  displayFnUser(user: ClienteModel) {
    if (user) { return user.nombre; }
  }

}


