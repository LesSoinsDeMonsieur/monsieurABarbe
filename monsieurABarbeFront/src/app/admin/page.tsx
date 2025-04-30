"use client";
import axiosI from "@/axiosInterceptor";
import Product from "@/types/product";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
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

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const data = (await axiosI.get<Product[]>("/products")).data;
    setProducts(data);
  };

  return (
    <>
      <>admin</>
      <>
        {isEdit ? (
          <EditProductDialog
            open={isEdit}
            onClose={() => setIsEdit(false)}
            product={product}
            onSave={handleSave}
          />
        ) : null}
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
                  key={product.name}
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
                      onClick={() => setIsEdit(true)}
                    ></img>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}
