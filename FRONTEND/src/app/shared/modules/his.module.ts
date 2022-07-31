import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorOrderSheetComponent } from 'src/app/componentes/his/doctor-order-sheet/doctor-order-sheet.component';
import { SharedModule } from './shared.module';
import { HisRoutingModule } from '../route/his-routing.module';


@NgModule({
  declarations: [
    DoctorOrderSheetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HisRoutingModule
  ],
  exports: [
    DoctorOrderSheetComponent
  ]
})
export class HisModule { }