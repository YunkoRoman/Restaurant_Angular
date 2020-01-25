// import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {ActivatedRoute} from "@angular/router";
// import {ProductService} from "../../services/product.service";
// import {Response} from "../../interfaces/Response";
// import {RestaurantMenuService} from "../../services/restaurant-menu.service";
//
// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   private menu_id: number;
//   private productArr: any = [];
//   private menusArr: any = [];
//   private restaurant_id: number;
//
//
//   constructor(private route: ActivatedRoute,
//               private ProductService: ProductService,
//               private RestaurantMenuService: RestaurantMenuService
//   ) {
//   }
//   @Output() onChanged = new EventEmitter<number>();
//
//   ngOnInit() {
//     this.route.firstChild.params
//       .subscribe(params => {
//         console.log(params);
//         this.menu_id = params.id;
//       });
//     this.route.params
//       .subscribe(params => {
//         this.restaurant_id = params.id;
//       });
//     this.RestaurantMenuService.GetMenus(this.restaurant_id).subscribe((data: Response) => {
//      this.menusArr = data.msg
//     });
//     this.ProductService.GetProduct(this.menu_id).subscribe((data: Response) => {
//       this.productArr = data.msg;
//       console.log(data.msg);
//     });
//
//   }
//
//   newProduct(menu_id) {
//     this.ProductService.GetProduct(menu_id).subscribe((data: Response) => {
//       this.productArr = data.msg;
//       console.log(data.msg);
//     })
//   }
//
//   AddToCard(product) {
//     this.onChanged.emit(product)
//   }
//
// }
