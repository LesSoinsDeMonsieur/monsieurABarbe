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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditProductDialog from "./EditProductDialog";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = (await axiosI.get<Product[]>("/products")).data;
    setProducts(data);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEdit(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDelete(false);
    if (productToDelete) {
      setTimeout(async () => {
        if (productToDelete) {
          await axiosI.delete("/products/" + productToDelete.id);
          setProductToDelete(null);
          getProducts();
        }
      }, 200); // attendre la fin de l’animation (~200ms)      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDelete(false);
    setTimeout(async () => {
      setProductToDelete(null);
    }, 200); // attendre la fin de l’animation (~200ms)
  };

  const handleSave = async (updatedProduct: Product) => {
    try {
      await axiosI.put(`/products/${updatedProduct.id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
      );
      setIsEdit(false);
      getProducts();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  return (
    <>
      {isEdit && selectedProduct && (
        <EditProductDialog
          open={isEdit}
          onClose={() => setIsEdit(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}

      {/* Modal de confirmation de suppression */}
      <Dialog open={openConfirmDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Es-tu sûr de vouloir supprimer <strong>{productToDelete?.name}</strong> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="info">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ width: "70%", marginTop: "20em" }}>
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
              <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right" sx={{ width: 100 }}>
                  <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <img
                      src="edit.svg"
                      style={{ width: "30px", cursor: "pointer" }}
                      onClick={() => handleEdit(product)}
                    />
                    <img
                      src="delete.svg"
                      style={{ width: "30px", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(product)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
