import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  getTotals,
} from "../redux/features/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseQuantity(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Box p={5}>
      <Typography gutterBottom variant="h5">
        Shopping Cart
      </Typography>

      {cart.cartItems.length === 0 ? (
        <Typography variant="subtitle1">
          Your cart is currently empty
        </Typography>
      ) : (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>PRODUCT</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>PRICE</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>QUANTITY</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cartItems.map((cartItem, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Stack direction="row" gap={1}>
                      <img
                        style={{ objectFit: "cover" }}
                        width="50px"
                        src={cartItem.thumbnail}
                        alt={cartItem.title}
                      />
                      <Stack direction="column" alignItems="flex-start">
                        {cartItem.title}

                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleRemoveFromCart(cartItem)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>${cartItem.price}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      <IconButton
                        size="small"
                        onClick={() => handleDecreaseCart(cartItem)}
                      >
                        <RemoveCircleOutlineIcon fontSize="inherit" />
                      </IconButton>
                      {cartItem.cartQuantity}
                      <IconButton
                        size="small"
                        onClick={() => handleAddToCart(cartItem)}
                      >
                        <AddCircleOutlineIcon fontSize="inherit" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    ${cartItem.price * cartItem.cartQuantity}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleClearCart()}>
                    Clear
                  </Button>
                </TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  ${cart.cartTotolAmount}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Cart;
