import { Component, OnInit } from "@angular/core";
import { Order } from "../../models/Order.interface";
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  AllOrders: Order[];
  constructor() {
    this.AllOrders = [
      {
        id: 1,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 2,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 3,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 4,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 5,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 6,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 7,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 8,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 9,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },

      {
        id: 10,
        OrderUsername: "Tarek ahmed Ramadan",
        OrderQuantity: 11,
        OrderUserAddress: "123 dokki street",
        OrderUserMobilePhone: "01144877526",
        ProductDetails: "test product details",
        ProductCategory: "test product category",
        ProductSize: "xL",
        ProductColor: "red",
        ProductImage: "../../../assets/images/productPlaceholder.jfif",
        TotalPrice: "100",
      },
    ];
  }

  ngOnInit(): void {}
}
