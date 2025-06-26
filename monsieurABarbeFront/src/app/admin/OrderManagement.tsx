"use client";

import { useEffect, useState } from "react";
import axiosI from "@/axiosInterceptor";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { OrderStatus } from "@/types/orderStatus";

interface Order {
  id: number;
  userId: number;
  total: number;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
}

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosI.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await axiosI.put(`/orders/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Chargement des commandes...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
        Gestion des Commandes
      </Typography>

      {/* Dropdown de filtre */}
      <FormControl sx={{ minWidth: 200, mb: 3 }}>
        <InputLabel id="filter-label">Filtrer par statut</InputLabel>
        <Select
          labelId="filter-label"
          value={statusFilter}
          label="Filtrer par statut"
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ backgroundColor: "white" }}
        >
          <MenuItem value="">
            <em>Aucun filtre</em>
          </MenuItem>
          {Object.values(OrderStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredOrders.length === 0 ? (
        <Typography>Aucune commande pour ce filtre.</Typography>
      ) : (
        filteredOrders.map((order) => (
          <Box key={order.id} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Commande n°{order.id} — Utilisateur n°{order.userId}
            </Typography>
            <Typography sx={{ mb: 1, color: "black" }}>
              Total : {order.total.toFixed(2)} € — Créée le{" "}
              {new Date(order.createdAt).toLocaleString()}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ color: "black", display: "inline", mr: 1 }}>Statut :</Typography>
              <Select
                size="small"
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                sx={{ color: "black", backgroundColor: "white" }}
              >
                {Object.values(OrderStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "black" }}>Produit</TableCell>
                    <TableCell sx={{ color: "black" }}>Quantité</TableCell>
                    <TableCell sx={{ color: "black" }}>Prix unitaire (€)</TableCell>
                    <TableCell sx={{ color: "black" }}>Total (€)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ color: "black" }}>{item.productName}</TableCell>
                      <TableCell sx={{ color: "black" }}>{item.quantity}</TableCell>
                      <TableCell sx={{ color: "black" }}>{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell sx={{ color: "black" }}>
                        {(item.unitPrice * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      )}
    </Box>
  );
}
