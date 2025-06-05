import axiosI from "@/axiosInterceptor";
import Cart from "@/types/cart";
import Product from "@/types/product";

export async function getCart() {
  try {
    const response = await axiosI.get<Cart>("/cart");
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function addItemToCart({ product }: { product: Product }) {
  try {
    await axiosI.post("/cart/add", {
      productId: product.id,
      quantity: 1,
    });
  } catch (e) {
    console.error(e);
  }
}
export async function decrementItemToCart({ product }: { product: Product }) {
  try {
    const cart = await axiosI.post("/cart/decrement", {
      productId: product.id,
      quantity: 1,
    });
    return cart;
  } catch (err) {
    console.error(err);
    return null;
  }
}
