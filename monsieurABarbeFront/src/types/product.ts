type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImage[];
};
export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

type ProductImage = {
  id: number;
  fileName: string;
  filePath: string;
};
export default Product;
