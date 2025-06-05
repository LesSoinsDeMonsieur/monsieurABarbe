import axiosI from "@/axiosInterceptor";

export async function addImages({ images, id }: { id: number; images: File[] }) {
  const formData = new FormData();
  images.forEach((file) => formData.append("images", file));
  await axiosI.post(`/products/${id}/images`, formData);
}

export async function deleteImage(id: number) {
  await axiosI.delete(`/products/images/${id}`);
}
