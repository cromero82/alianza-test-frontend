import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from 'app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralConfirmComponent } from './shared/components/general-confirm/general-confirm.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ArrayListPipe } from './pipe/array-list.pipe';
import { ChartistModule } from 'ng-chartist';
import { ClienteAdminComponent } from './cliente/cliente-admin/cliente-admin.component';
import { ClienteEditComponent } from './cliente/cliente-edit/cliente-edit.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService} from './service/user.service'

export const AdminRoutes: Routes = [
  {
    path: 'clientes',
      component: ClienteAdminComponent
  }
];

@NgModule({
  declarations: [
    GeneralConfirmComponent,
     ArrayListPipe, ClienteAdminComponent, ClienteEditComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectFilterModule,
    NgxMatSelectSearchModule,
    ChartistModule,
    HttpClientModule,
    RouterModule.forChild(AdminRoutes)
  ],
   providers: [
     HttpClient, //HttpTestingController,
     UserService,
    {provide: MAT_DIALOG_DATA, useValue: {}},
    { provide: MatDialogRef, useValue: {} },
 ],
})
export class AdminModule { }
