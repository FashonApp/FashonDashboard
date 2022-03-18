export interface Order {
  id?: number;
  OrderUsername: string;
  OrderUserMobilePhone: string;
  OrderQuantity: number;
  OrderUserAddress: string;
  OrderStatus?: boolean;
  ProductDetails: string;
  ProductCategory: string;
  ProductSize: string;
  ProductColor: string;
  ProductImage: string;
  TotalPrice: string;
}
