import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RegistrationComponent } from './registration/registration.component';
import { CheckedComponent } from './checked/checked.component';


const routes: Routes = [
  {path:'login', component: AuthComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'user/checked', component: CheckedComponent},


] ;
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    CheckedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
