import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Response} from "../../interfaces/Response";
import {RestaurantMenuService} from "../../services/restaurant-menu.service";
import {ProductService} from "../../services/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {SocketService} from "../../services/socket.service";


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  private restaurant_id: number;
  private productsId: any = [];
  private orderList: any = [];
  private menuObj: any = [];
  private restaurantInfo: any = [];
  private basket: any = [];
  private nameForm: FormGroup;



  constructor(private route: ActivatedRoute,
              private RestaurantMenuService: RestaurantMenuService,
              private ProductService: ProductService,
              private OrderService: OrderService,
              private SocketService: SocketService
  ) {
  }


  ngOnInit() {
    this.CheckBasket();

    this.nameForm = new FormGroup({
      quantity: new FormControl('', {
        updateOn: 'blur'
      })
    });
    this.route.params
      .subscribe(params => {
        this.restaurant_id = params.id;
      });

    this.RestaurantMenuService.RestaurantInfo(this.restaurant_id).subscribe((data: Response) => {
      this.restaurantInfo = data.msg[0];

    });

    this.RestaurantMenuService.GetMenus(this.restaurant_id).subscribe((data: Response) => {
      this.menuObj = data.msg;
      console.log(data.msg);

    });
    this.GetProduct();


  }


  CheckBasket() {
    if (localStorage.getItem('basket') != undefined || null) {
      this.basket = JSON.parse(localStorage.getItem('basket'))
    }
  }

  // Get product for basket
  GetProduct() {

    if (localStorage.getItem('basket') != undefined || null) {

      this.basket = JSON.parse(localStorage.getItem('basket'));

      this.basket.map(p => {
        const product_id = Number(p.product_id);
        this.productsId.push(product_id)
      });

      this.OrderService.OrderProduct(this.productsId, this.restaurant_id).subscribe((data: Response) => {
        if (data.msg !== null || undefined) {

          data.msg.forEach(e => {
            if (e !== null || undefined) {
              this.orderList.push(e)
            }
          })
        }

        // it is Function which Add quantity to Product Object

        if (this.orderList && this.basket !== null || undefined) {
          this.AddQttToProductObj(this.orderList, this.basket)
        }
      })


    }
  }


  addToCard(product) {
    const Product = Object.assign({}, product);
    console.log(Product);
    this.CheckOrderList(Product);
    if (localStorage.getItem('basket')) {
      let newItem = true;
      this.basket.forEach(function (item) {
        if (item.product_id == Product.id) {
          ++item.quantity;
          newItem = false;
        }
      });
      if (newItem) {
        this.basket.push({
          product_id: Product.id,
          quantity: 1,
          price: Product.price
        })
      }

      localStorage.setItem('basket', JSON.stringify(this.basket));
    }

    if (!localStorage.getItem('basket')) {
      this.basket.push({
        product_id: Product.id,
        quantity: 1,
        price: Product.price
      });
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }


    this.AddQttToProductObj(this.orderList, this.basket)
  }

  AddQttToProductObj(ProductArr, ProdBasketArr) {

    ProductArr.forEach(prodObj => {
      const prodBaskObj = ProdBasketArr.find(Obj => prodObj.id == Obj.product_id);
      prodObj['qtt'] = prodBaskObj.quantity;
      prodObj.price = prodBaskObj.quantity * prodBaskObj.price
    });
  }

  CheckOrderList(Product) {
    const result = this.orderList.find(e => e.id === Product.id);
    if (result == undefined || null) {
      this.orderList.push(Product)
    }
  }

  // Button to delete product with the card list
  deleteBtn(id: number) {
    const value = this.basket.map(obj => {
      return obj.product_id
    });
    const index = value.indexOf(id);
    this.basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(this.basket));

    const orderValue = this.orderList.map(obj => {
      return obj.id
    });
    const orderIndex = orderValue.indexOf(id);
    this.orderList.splice(orderIndex, 1);
  }

  additionQtt(id: number) {
    const basketObj = this.basket.find(e => e.product_id == id);
    this.basket.forEach(obj => {
      if (obj.product_id == id) {
        ++obj.quantity
      }
    });
    localStorage.setItem('basket', JSON.stringify(this.basket));

    this.orderList.forEach(obj => {
      if (obj.id == id) {
        ++obj.qtt;
        obj.price = obj.qtt * basketObj.price
      }
      console.log(this.menuObj);
    });

  }

  subtractionQtt(id: number) {
    const basketObj = this.basket.find(e => e.product_id == id);
    this.basket.forEach(obj => {
      if (obj.product_id == id) {
        if (obj.quantity > 1) {
          --obj.quantity

        } else {
          this.deleteBtn(id)
        }
      }
    });
    localStorage.setItem('basket', JSON.stringify(this.basket));

    this.orderList.forEach(obj => {
      if (obj.id == id) {
        if (obj.qtt > 1) {
          --obj.qtt;
          obj.price = obj.qtt * basketObj.price
        }
      }
    });
  }
  // Change Qtt in Input via (blur)
  changeQtt(id: number) {
    const quantity = this.nameForm.value.quantity;
    if (quantity == 0 || quantity < 1) {
      this.deleteBtn(id)
    } else {
      const basketObj = this.basket.find(e => e.product_id == id);
      this.basket.forEach(obj => {
        if (obj.product_id == id) {
          obj.quantity = quantity
        }
      });
      localStorage.setItem('basket', JSON.stringify(this.basket));

      this.orderList.forEach(obj => {
        if (obj.id == id) {
          obj.qtt = quantity;
          obj.price = quantity * basketObj.price
        }

      });
    }
    const basketObj = this.basket.find(e => e.product_id == id);
    this.basket.forEach(obj => {
      if (obj.product_id == id) {
        obj.quantity = quantity
      }
    });
    localStorage.setItem('basket', JSON.stringify(this.basket));

    this.orderList.forEach(obj => {
      if (obj.id == id) {
        obj.qtt = quantity;
        obj.price = quantity * basketObj.price
      }

    });

  }

  SendOrder() {
    this.OrderService.SaveOrder(this.orderList, this.restaurant_id).subscribe((data: Response) => {
      console.log(data.msg);
      if (data.success == true) {
        this.SocketService.sendRestaurantId(this.restaurant_id)
      }
    });


  }
}

