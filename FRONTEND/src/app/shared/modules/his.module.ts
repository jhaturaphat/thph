import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./shared.module";
import { HisRoutingModule } from '../route/his-routing.module';
import { ContentHisComponent } from "../layout-his/content-his/content-his.component";
import { FooterMenuHisComponent } from "../layout-his/footer-menu-his/footer-menu-his.component";
import { SideBarHisComponent } from "../layout-his/side-bar-his/side-bar-his.component";
import { LabViewComponent } from "src/app/componentes/his/lab-view/lab-view.component";
import { LabHistoryComponent } from "src/app/componentes/his/lab-history/lab-history.component";
import { LabPrintPreviewComponent } from "src/app/componentes/his/lab-print-preview/lab-print-preview.component";
import { CdkTableModule } from "@angular/cdk/table";


@NgModule({
  declarations: [
    //HIS Layout
    ContentHisComponent,
    FooterMenuHisComponent,
    SideBarHisComponent,
    //Components
    LabViewComponent,
    LabHistoryComponent,
    LabPrintPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HisRoutingModule,
    CdkTableModule
],
  exports: [
    // SharedModule,
    //HIS Layout
    ContentHisComponent,
    FooterMenuHisComponent,
    SideBarHisComponent,
    // Component
    LabViewComponent,
    LabHistoryComponent,
    LabPrintPreviewComponent
  ]
})
export class HisModule { }