import { Box, Stack, List, ListItem } from "@mui/material";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const Homepage = () => {
  const { data, isSuccess } = useGetProductsQuery();

  let content;

  if (isSuccess) {
    content = (
      <Stack
        direction="column"
        sx={{
          alignItems: "center",
        }}
      >
        <List>
          {data.products.map((item) => (
            <ListItem key={item.id} sx={{ py: 2 }}>
              <ProductCard product={item} />
            </ListItem>
          ))}
        </List>
      </Stack>
    );
  } else {
    content = <Spinner />;
  }

  return content;
};

export default Homepage;
