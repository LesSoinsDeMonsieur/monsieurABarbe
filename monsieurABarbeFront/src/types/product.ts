interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}
export interface NewProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}
export default Product;
