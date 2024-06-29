import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { EmployeComponent } from './employe/employe.component';
import { NavComponent } from './nav/nav.component';
import { AlerteComponent } from './alerte/alerte.component';
import { DemandeComposantComponent } from './demande-composant/demande-composant.component';
import { PassationComponent } from './passation/passation.component';
import { NavbarreComponent } from './navbarre/navbarre.component';
import { FinbarreComponent } from './finbarre/finbarre.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeComponent,
    NavComponent,
    AlerteComponent,
    DemandeComposantComponent,
    PassationComponent,
    NavbarreComponent,
    FinbarreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
