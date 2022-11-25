import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:DashboardComponent
  // },    
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    loadChildren: () => import('./shared/modules/his.module').then(m=>m.HisModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
