import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useGetProductByCategoryQuery } from "../redux/api/productApi";
import ProductListing from "../components/ProductListing";

const CategoryPage = () => {
  const cat = useLocation().pathname.split("/").pop();
  const { data, isLoading, isSuccess, isError, error } =
    useGetProductByCategoryQuery(cat);
  let content = "";

  if (isSuccess) {
    content = <ProductListing products={data.products} />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default CategoryPage;
