import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DoctorOrderSheetComponent } from "src/app/componentes/his/doctor-order-sheet/doctor-order-sheet.component";


const routes: Routes = [
    {path:'', component:DoctorOrderSheetComponent},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HisRoutingModule {}