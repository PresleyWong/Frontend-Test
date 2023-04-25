import { useSearchParams } from "react-router-dom";
import { useGetProductSearchQuery } from "../redux/api/productApi";
import ProductListing from "../components/ProductListing";
import Spinner from "../components/Spinner";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetProductSearchQuery(searchParams.get("q"));
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

export default SearchPage;
