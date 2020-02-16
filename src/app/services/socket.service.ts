import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {


  constructor(
    private socket: Socket) {
  }

  sendRestaurantId(restaurant_id) {
    this.socket.emit('restaurant_id', restaurant_id)
  }

}
