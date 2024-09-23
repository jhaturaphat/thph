import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LabViewComponent } from "src/app/componentes/his/lab-view/lab-view.component";
import { AuthenticationGuard } from "src/app/guards/authentication.guard";


const routes: Routes = [
    {path:'', component:LabViewComponent,canActivate:[AuthenticationGuard]},
    {path:'lab-view2', component:LabViewComponent,canActivate:[AuthenticationGuard]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HisRoutingModule {}