import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'gvmcar',
    loadChildren: () => import('./shared/modules/gvmcar.module').then(m=>m.GvmCarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
