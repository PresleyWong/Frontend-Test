import ProductListing from "../components/ProductListing";
import { useGetProductsQuery } from "../redux/api/productApi";
import Spinner from "../components/Spinner";

const Homepage = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
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

export default Homepage;
