"use client";

import axiosI from "@/axiosInterceptor";
import Product from "@/types/product";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditProductDialog from "./EditProductDialog";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // État pour le produit sélectionné

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = (await axiosI.get<Product[]>("/products")).data;
    setProducts(data);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product); // Mettre à jour le produit sélectionné
    setIsEdit(true); // Ouvrir la modal
  };

  const handleSave = async (updatedProduct: Product) => {
    try {
      // Simulation de l'appel API pour mettre à jour le produit
      await axiosI.put(`/products/${updatedProduct.id}`, updatedProduct); // Remplace l'URL par celle de ton API

      // Mettre à jour la liste des produits après modification
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
      setIsEdit(false); // Fermer la modal
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  return (
    <>
      <div>admin</div>
      {isEdit && selectedProduct && (
        <EditProductDialog
          open={isEdit}
          onClose={() => setIsEdit(false)}
          product={selectedProduct} // Passer le produit sélectionné à la modal
          onSave={handleSave}
        />
      )}
      <TableContainer component={Paper} style={{ width: "70%" }}>
        <Table sx={{ minWidth: 50 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Prix</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id} // Utiliser l'id comme clé
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  <img
                    src="edit.svg"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => handleEdit(product)} // Passer le produit à la modal
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
