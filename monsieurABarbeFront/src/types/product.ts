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
  imageUrl: string;
  stock: number;
};

type ProductImage = {
  id: number;
  fileName: string;
  filePath: string;
};
export default Product;
