import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarReserveComponent } from "src/app/componentes/gvmcar/car-reserve/car-reserve.component";
import { CarreservDetailComponent } from "src/app/componentes/gvmcar/carreserv-detail/carreserv-detail.component";


const routes: Routes = [
    {path:'', component:CarReserveComponent},
    {path:'drive-profile', component:CarreservDetailComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class GvmCarRoutingModule {}