import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <RouterLink
        to={`/product/${product.id}`}
        style={{ textDecoration: "none" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            width="140"
            image={product.thumbnail}
            alt={product.title}
          />
          <CardContent>
            <Stack
              direction="column"
              sx={{
                alignItems: "center",
              }}
            >
              <Typography color="text.primary" variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>

              <Rating name="read-only" value={product.rating} readOnly />
            </Stack>
          </CardContent>
        </CardActionArea>
      </RouterLink>
      <CardActions
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography color="text.secondary" variant="h5">
          ${product.price}
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#673ab7",
            "&:hover": {
              backgroundColor: "#512da8",
            },
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
