import { Stack, List, ListItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import {
  setProductItems,
  selectCurrentProductItems,
} from "../redux/features/product/productSlice";
import Spinner from "../components/Spinner";

const Homepage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const currentProductItems = useSelector(selectCurrentProductItems);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=10`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setProductItems(res.products));
        setIsLoading(false);
      });
  }, []);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <Stack
        direction="column"
        sx={{
          alignItems: "center",
        }}
      >
        {currentProductItems.length === 0 ? (
          <Typography variant="subtitle1">No product found</Typography>
        ) : (
          <List>
            {currentProductItems.map((item) => (
              <ListItem key={item.id} sx={{ py: 2 }}>
                <ProductCard product={item} />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    );
  }

  return content;
};

export default Homepage;
