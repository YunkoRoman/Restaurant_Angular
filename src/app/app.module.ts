import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthComponent} from './controllers/auth/auth.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RegistrationComponent} from './controllers/registration/registration.component';
import {CheckedComponent} from './controllers/checked/checked.component';
import {HttpAuthInterceptor} from "./interceptor/auth.interceptor";
import {ListRestaurantsComponent} from './controllers/list-restaurants/list-restaurants.component';
import {RestaurantComponent} from './controllers/restaurant/restaurant.component';
import {BasketComponent} from './controllers/basket/basket.component';
import {SendToEmailComponent} from './controllers/send-to-email/send-to-email.component';

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {UserComponentComponent} from './controllers/user-component/user-component.component';
import {OrdersHistoryComponent} from './controllers/user-component/orders-history/orders-history.component';
import {StatisticsComponent} from './controllers/user-component/statistics/statistics.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalMakeOutOrderComponent} from './controllers/modal-make-out-order/modal-make-out-order.component';
import {MatButtonModule} from "@angular/material";
import {MatDialogModule} from '@angular/material/dialog';
import {Guard} from './security/.guard'

const routes: Routes = [
  {path: '', component: ListRestaurantsComponent},
  {path: 'login', component: AuthComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'user/checked', component: CheckedComponent},
  {path: 'restaurant/:id', component: RestaurantComponent},
  {path: 'email', component: SendToEmailComponent},
  {path: 'basket', component: BasketComponent},
  {
    path: 'user',
    component: UserComponentComponent,
    canActivate: [Guard],
    canActivateChild: [Guard],
    children: [{
      path: 'history',
      component: OrdersHistoryComponent
    }, {
      path: 'statistics',
      component: StatisticsComponent
    }
    ]
  },
];

const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    CheckedComponent,
    ListRestaurantsComponent,
    RestaurantComponent,
    BasketComponent,
    SendToEmailComponent,
    UserComponentComponent,
    OrdersHistoryComponent,
    StatisticsComponent,
    ModalMakeOutOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true}, Guard],
  bootstrap: [AppComponent],
  entryComponents: [ModalMakeOutOrderComponent]
})
export class AppModule {
}
