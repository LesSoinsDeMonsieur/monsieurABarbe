import Product from "./product";

type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export default CartItem;
