import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter basename="/frontend-test">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
