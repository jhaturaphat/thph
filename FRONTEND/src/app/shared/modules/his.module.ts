import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./shared.module";
import { HisRoutingModule } from '../route/his-routing.module';
import { ContentHisComponent } from "../layout-his/content-his/content-his.component";
import { FooterMenuHisComponent } from "../layout-his/footer-menu-his/footer-menu-his.component";
import { SideBarHisComponent } from "../layout-his/side-bar-his/side-bar-his.component";
import { LabViewComponent } from "src/app/componentes/his/lab-view/lab-view.component";


@NgModule({
  declarations: [
    //HIS Layout
    ContentHisComponent,
    FooterMenuHisComponent,
    SideBarHisComponent,
    //Components
    LabViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HisRoutingModule
  ],
  exports: [
    // SharedModule,
    // // Component
    ContentHisComponent,
    FooterMenuHisComponent,
    SideBarHisComponent,
    LabViewComponent
  ]
})
export class HisModule { }