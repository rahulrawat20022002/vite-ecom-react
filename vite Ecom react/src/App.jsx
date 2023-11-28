import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import NoPage from "./pages/noPage/NoPage";
import Dashboard from "./pages/dashboard/Dashboard";
import MyState from "./context/MyState";
import Login from "./pages/registration/Login";
import SingUp from "./pages/registration/SingUp";
import ProductInfo from "./pages/productInfo/ProductInfo";

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
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </Router>
      </MyState>
    </>
  );
}

export default App;
