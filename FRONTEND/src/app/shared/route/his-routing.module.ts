import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LabViewComponent } from "src/app/componentes/his/lab-view/lab-view.component";


const routes: Routes = [
    {path:'', component:LabViewComponent},
    {path:'lab-view', component:LabViewComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HisRoutingModule {}