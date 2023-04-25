import {
  Stack,
  List,
  ListItem,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import {
  setProductSortType,
  selectCurrentProductSortType,
} from "../redux/features/product/productSlice";

const ProductListing = ({ products }) => {
  const currentProductItems = products;
  const currentProductSortType = useSelector(selectCurrentProductSortType);
  const [sortProduct, setSortProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    sortingProducts();
  }, [currentProductItems, currentProductSortType]);

  const priceFilter = (products, ascending = true) => {
    return [...products].sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const alphabetFilter = (products, ascending = true) => {
    return [...products].sort((a, b) => {
      if (ascending) {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      } else {
        return b.title.toLowerCase() > a.title.toLowerCase() ? 1 : -1;
      }
    });
  };

  const sortingProducts = () => {
    switch (currentProductSortType) {
      case "lowToHigh":
        setSortProduct(priceFilter(currentProductItems));
        return;
      case "highToLow":
        setSortProduct(priceFilter(currentProductItems, false));
        return;
      case "AZ":
        setSortProduct(alphabetFilter(currentProductItems));
        return;
      case "ZA":
        setSortProduct(alphabetFilter(currentProductItems, false));
        return;
      default:
        setSortProduct(currentProductItems);
        return;
    }
  };

  const handleSortChange = (event) => {
    dispatch(setProductSortType(event.target.value));
  };

  return (
    <>
      <Box
        sx={{ display: "flex", direction: "row", justifyContent: "flex-end" }}
      >
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <InputLabel id="select-sort-label">Sort by</InputLabel>
          <Select
            labelId="select-sort-label"
            id="select-sort"
            value={currentProductSortType}
            label="Sort by"
            onChange={handleSortChange}
          >
            <MenuItem value={"relevence"}>Relevance</MenuItem>
            <MenuItem value={"lowToHigh"}>Price: Low to High</MenuItem>
            <MenuItem value={"highToLow"}>Price: High to Low</MenuItem>
            <MenuItem value={"AZ"}>A ~ Z</MenuItem>
            <MenuItem value={"ZA"}>Z ~ A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack
        direction="column"
        sx={{
          alignItems: "center",
        }}
      >
        {sortProduct.length === 0 ? (
          <Typography variant="subtitle1">No product found</Typography>
        ) : (
          <List>
            {sortProduct.map((item) => (
              <ListItem key={item.id} sx={{ py: 2 }}>
                <ProductCard product={item} />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </>
  );
};

export default ProductListing;
