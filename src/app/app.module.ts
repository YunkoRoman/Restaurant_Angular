import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthComponent } from './controllers/auth/auth.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RegistrationComponent } from './controllers/registration/registration.component';
import { CheckedComponent } from './controllers/checked/checked.component';
import {HttpAuthInterceptor} from "./interceptor/auth.interceptor";
import { ListRestaurantsComponent } from './controllers/list-restaurants/list-restaurants.component';
import { RestaurantComponent } from './controllers/restaurant/restaurant.component';
import { BasketComponent } from './controllers/basket/basket.component';
import { SendToEmailComponent } from './controllers/send-to-email/send-to-email.component';


const routes: Routes = [
  {path:'', component: ListRestaurantsComponent},
  {path:'login', component: AuthComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'user/checked', component: CheckedComponent},
  {path:'restaurant/:id', component: RestaurantComponent},
  {path:'email', component: SendToEmailComponent},
  {path:'basket', component: BasketComponent},
] ;
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    CheckedComponent,
    ListRestaurantsComponent,
    RestaurantComponent,
    BasketComponent,
    SendToEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
