import {
  Component,
  OnInit,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  OnDestroy,
  AfterViewChecked
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Response} from "../../interfaces/Response";
import {RestaurantMenuService} from "../../services/restaurant-menu.service";
import {BasketService} from "../../services/basket.service";
import {ProductService} from "../../services/product.service";


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
  private showMenu: boolean = true;
  private showProducts: boolean = false;
  private orderChecRes: boolean = true;


  constructor(private route: ActivatedRoute,
              private RestaurantMenuService: RestaurantMenuService,
              private ProductService: ProductService) {
  }


  ngOnInit() {
    this.CheckBasket();

    this.route.params
      .subscribe(params => {
        this.restaurant_id = params.id;
      });

    this.RestaurantMenuService.RestaurantInfo(this.restaurant_id).subscribe((data: Response) => {
      this.restaurantInfo = data.msg[0];
      console.log(data.msg[0]);
    });

    this.RestaurantMenuService.GetMenus(this.restaurant_id).subscribe((data: Response) => {
      this.menuObj = data.msg;
      console.log(data.msg);
    });
    this.GetProduct()


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

      console.log(this.basket);
      this.basket.map(p => {
        const product_id = Number(p.product_id);
        this.productsId.push(product_id)
      });

      this.ProductService.OrderProduct(this.productsId, this.restaurant_id).subscribe((data: Response) => {
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

  // Show products component

  ShowProduct() {
    this.showProducts = !this.showProducts;
    this.showMenu = !this.showMenu
  }

  addToCard(Product) {

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
          quantity: 1
        })
      }

      localStorage.setItem('basket', JSON.stringify(this.basket));
    }

    if (!localStorage.getItem('basket')) {
      this.basket.push({
        product_id: Product.id,
        quantity: 1
      });
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }


    this.AddQttToProductObj(this.orderList, this.basket)
  }

  AddQttToProductObj(ProductArr, ProdBasketArr) {

    ProductArr.forEach(prodObj => {
      ProdBasketArr.forEach(prodBaskObj => {
        if (prodObj.id == prodBaskObj.product_id) {
          prodObj['qtt'] = prodBaskObj.quantity
        }
      })
    });
    console.log(ProductArr);
  }

  CheckOrderList(Product) {
    const result = this.orderList.find(e => e.id === Product.id);
    if (result == undefined || null) {
      this.orderList.push(Product)
    }
  }

  deleteBtn(id: number) {

  }
}

