import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  setProductItems,
  setProductLoading,
} from "../redux/features/product/productSlice";
import ProductListing from "./ProductListing";

const Homepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductLoading(true));
    fetch(`https://dummyjson.com/products?limit=10`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setProductItems(res.products));
        dispatch(setProductLoading(false));
      });
  }, []);

  return <ProductListing />;
};

export default Homepage;
