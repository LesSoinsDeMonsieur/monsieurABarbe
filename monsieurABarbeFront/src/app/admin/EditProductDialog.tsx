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

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

export default function EditProductDialog({
  open,
  onClose,
  product,
  onSave,
}: EditProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState(product);
  const [imageFile, setImageFile] = useState<File | null>(null); // Nouvel état pour l'image

  // Met à jour l'état local quand le champ change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    // Si une image est sélectionnée, ajouter l'image au produit sous forme de FormData
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("name", editedProduct.name);
      formData.append("description", editedProduct.description);
      formData.append("price", editedProduct.price.toString());

      // Exemple de requête API pour envoyer les données et l'image
      // axiosI.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      //   .then(response => {
      //     console.log('Image uploaded successfully', response);
      //   })
      //   .catch(error => {
      //     console.error('Error uploading image:', error);
      //   });
    } else {
      onSave(editedProduct); // Si pas d'image, sauvegarder juste les infos du produit
    }
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
        <input type="file" onChange={handleImageChange} accept="image/*" style={{ marginTop: 8 }} />
        {imageFile && (
          <div style={{ marginTop: 10 }}>
            <p>Image sélectionnée : {imageFile.name}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
