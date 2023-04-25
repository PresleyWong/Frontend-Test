import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage.jsx";
import CategoryPage from "./pages/CategoryPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/search" element={<SearchPage />} />
          <Route path="/products/category/*" element={<CategoryPage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
