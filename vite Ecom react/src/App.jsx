import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import NoPage from "./pages/noPage/NoPage";
import MyState from "./context/MyState";
import Login from "./pages/registration/Login";
import SingUp from "./pages/registration/SingUp";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import AddProduct from "./pages/admin/page/AddProduct";

function App() {
  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SingUp />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/updateProduct" element={<UpdateProduct />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </Router>
      </MyState>
    </>
  );
}

export default App;
