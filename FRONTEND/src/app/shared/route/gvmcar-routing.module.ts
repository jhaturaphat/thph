import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarReserveComponent } from "src/app/componentes/gvmcar/car-reserve/car-reserve.component";


const routes: Routes = [
    {path:'', component:CarReserveComponent},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class GvmCarRoutingModule {}