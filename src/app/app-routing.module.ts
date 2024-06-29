import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeComponent } from './employe/employe.component';
import { NavComponent } from './nav/nav.component';
import { AlerteComponent } from './alerte/alerte.component';
import { DemandeComposantComponent } from './demande-composant/demande-composant.component';
import { PassationComponent } from './passation/passation.component';

const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component:HomeComponent },
  {path:'employe',component:EmployeComponent},
  {path:'nav',component:NavComponent},
  {path:'alerte',component:AlerteComponent},
  {path:'demandecompoosant',component:DemandeComposantComponent},
  {path:'passation',component:PassationComponent},
 

  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
