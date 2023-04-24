import { useParams } from "react-router-dom";
import { Box, Typography, Button, Rating, Stack } from "@mui/material";

import { useGetProductDetailQuery } from "../redux/api/productApi";
import Spinner from "../components/Spinner";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isSuccess, isError, error } =
    useGetProductDetailQuery(productId);

  let content;

  if (isSuccess) {
    content = (
      <Stack direction="column">
        <img width="100%" src={data.thumbnail} alt={productId.title} />
        <Box
          sx={{
            my: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            textTransform: "capitalize",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" mr={2}>
            {data.title}
          </Typography>

          <Rating name="read-only" value={data.rating} readOnly />
        </Box>

        <Box
          sx={{
            mb: "20px",
          }}
        >
          <Typography variant="h5">Details:</Typography>
          <Typography variant="subtitle1">Price: ${data.price}</Typography>
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
            variant="subtitle1"
          >
            Brand: {data.brand}
          </Typography>
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
            variant="subtitle1"
          >
            Category: {data.category}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Stock: {data.stock}
          </Typography>
        </Box>

        <Box
          sx={{
            mb: "20px",
          }}
        >
          <Typography variant="h5">Description:</Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ fontStyle: "italic" }}
          >
            {data.description}
          </Typography>
        </Box>
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
      </Stack>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  } else {
    content = <Spinner />;
  }

  return content;
};

export default ProductDetail;
