import {
  Component, DoCheck,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Response} from "../../interfaces/Response";
import {RestaurantMenuService} from "../../services/restaurant-menu.service";
import {ProductService} from "../../services/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {SocketService} from "../../services/socket.service";
import {ModalMakeOutOrderComponent} from "../modal-make-out-order/modal-make-out-order.component"
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, DoCheck {
  private restaurant_id: number;
  private productsId: any = [];
  private orderList: any = [];
  private menuObj: any = [];
  private restaurantInfo: any = [];
  private basket: any = [];
  private nameForm: FormGroup;
  private priceArr: any = [];
  private totalPrice: number;
  private showEmptyBasket: boolean;
  private showTotalPrice: boolean;
  private plusIcon = require("../../assets/plus 24.png");
  private minusIcon = require("../../assets/minus 24.png");
  private deleteIcon = require("../../assets/delete.png");


  constructor(private route: ActivatedRoute,
              private RestaurantMenuService: RestaurantMenuService,
              private ProductService: ProductService,
              private OrderService: OrderService,
              private SocketService: SocketService,
              private matDialog: MatDialog
  ) {
  }

  ngDoCheck() {
    this.ShowEmptyBasket()
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
    });
    this.GetProduct();


  }

  ShowEmptyBasket() {
    if (this.orderList.length === 0) {
      this.showEmptyBasket = true;
      this.showTotalPrice = false;
    } else {
      this.showEmptyBasket = false;
      this.showTotalPrice = true
    }
  }

  CalculatesTotalPrice() {
    this.priceArr = [];
    this.orderList.forEach(a => {
      if (a.id !== null || undefined) {
        this.basket.forEach(e => {
          if (a.id == e.product_id) {
            this.priceArr.push(e.quantity * e.price);
          }
        });
      }
    });
    if (this.priceArr.length != 0) this.totalPrice = this.priceArr.reduce((acc, curVal) => acc + curVal);
  }

  CheckBasket() {
    if (localStorage.getItem('basket') != undefined || null) {
      this.basket = JSON.parse(localStorage.getItem('basket'))
    }

  }

  // Get product for basket

  GetProduct() {

    if (localStorage.getItem('basket') != undefined || null) {

      this.basket.map(p => {
        const product_id = Number(p.product_id);
        this.productsId.push(product_id)
      });
      console.log(this.productsId);
      this.OrderService.OrderProduct(this.productsId, this.restaurant_id).subscribe((data: Response) => {
        if (data.msg !== null || undefined) {
          data.msg.forEach(e => {

            if (e !== null || undefined) {
              this.orderList.push(e);
            }
          })
        }

        // it is Function which Add quantity to Product Object

        if (this.orderList && this.basket !== null || undefined) {
          this.AddQttToProductObj(this.orderList, this.basket);
          this.CalculatesTotalPrice()
        }
      })


    }

  }


  addToCard(product) {
    const Product = Object.assign({}, product);
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

    this.CalculatesTotalPrice();

    this.AddQttToProductObj(this.orderList, this.basket);


  }

  AddQttToProductObj(ProductArr, ProdBasketArr) {

    ProductArr.forEach(prodObj => {
      const prodBaskObj = ProdBasketArr.find(Obj => prodObj.id == Obj.product_id);
      prodObj['qtt'] = prodBaskObj.quantity;
      // prodObj.price = prodBaskObj.quantity * prodBaskObj.price
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

    const listValue = this.orderList.map(obj => {
      return obj.id
    });
    const orderIndex = listValue.indexOf(id);
    this.orderList.splice(orderIndex, 1);
    this.CalculatesTotalPrice();

  }

  additionQtt(id: number) {

    this.basket.forEach(obj => {
      if (obj.product_id == id) {
        ++obj.quantity
      }
    });
    localStorage.setItem('basket', JSON.stringify(this.basket));

    this.orderList.forEach(obj => {
      if (obj.id == id) {
        ++obj.qtt;
        // obj.price = obj.qtt * basketObj.price
      }
      console.log(this.menuObj);
    });
    this.CalculatesTotalPrice()

  }

  subtractionQtt(id: number) {

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
          // obj.price = obj.qtt * basketObj.price
        }
      }
    });
    this.CalculatesTotalPrice();

  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "auto";
    dialogConfig.width = "60%";
    dialogConfig.data = {
      orderList: this.orderList,
      restaurant_id: this.restaurant_id,
      totalPrice: this.totalPrice
    };
    const modalDialog = this.matDialog.open(ModalMakeOutOrderComponent, dialogConfig);
  }
}

