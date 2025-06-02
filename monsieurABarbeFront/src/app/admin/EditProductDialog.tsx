"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import Product from "@/types/product";
import RemovableLabel from "@/components/RemovableLabel";
import { addImages, deleteImage, updateProduct } from "@/api/products/products";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export default function EditProductDialog({ open, onClose, product }: EditProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [imagesToDelete, setImageToDelete] = useState<number[]>([]);
  const [imageFile, setImageFile] = useState<File[]>([]); // Nouvel état pour l'image

  // Met à jour l'état local quand le champ change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files.item(i);
        if (file) files.push(file);
      }
      setImageFile(files);
    }
  };

  const onDeleteImage = (id: number) => {
    setImageToDelete((prev) => [...prev, id]);
  };
  const onNewDeleteImage = (name: string) => {
    imageFile.filter((file) => file.name != name);
  };

  const handleSubmit = async () => {
    if (imageFile.length > 0) {
      await addImages({ images: imageFile, id: product.id });
    }
    if (imagesToDelete.length > 0) {
      await Promise.all(imagesToDelete.map(async (id) => deleteImage(id)));
    }
    await updateProduct({ id: product.id, updatedProduct: editedProduct });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier le produit</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        style={{ paddingTop: "5px" }}
      >
        <TextField
          label="Nom"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Prix"
          name="price"
          type="number"
          value={editedProduct.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={editedProduct.stock}
          onChange={handleChange}
          fullWidth
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          style={{
            padding: "10px 15px",
            border: "2px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            color: "#333",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "sans-serif",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.borderColor = "#999";
            target.style.boxShadow = "0 0 5px rgba(100,100,100,0.2)";
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.borderColor = "#ccc";
            target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        />

        <div style={{ marginTop: 10, display: "flex", gap: "10px", flexDirection: "column" }}>
          Image sélectionnée : <br />
          {imageFile.map((file, i) => (
            <RemovableLabel
              label={file.name}
              key={i}
              onNewDelete={() => onNewDeleteImage(file.name)}
            />
          ))}
          {product.images.map((image, i) => (
            <RemovableLabel
              label={image.fileName}
              key={i}
              path={image.filePath}
              onDelete={() => onDeleteImage(image.id)}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="info"
          sx={{
            color: "black",
            "&:hover": {
              backgroundColor: "#c5c5c5",
            },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
