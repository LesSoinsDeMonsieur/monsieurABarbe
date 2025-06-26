import Product from "./product";

export type Order = {
  id?: number;
  status: OrderStatus;
  total: number;
  createdAt?: Date;
  orderItems: OrderItem;
};

export enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
}

export type OrderItem = {
  id: number;
  item: Product;
  quantity: number;
  unitPrice: number;
};
