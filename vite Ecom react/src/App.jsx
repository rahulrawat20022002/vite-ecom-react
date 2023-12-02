import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Order,
  Cart,
  NoPage,
  Login,
  ProductInfo,
  UpdateProduct,
  AddProduct,
  Dashboard,
  Signup,
} from "./pages/index";

import MyState from "./context/MyState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/order"
              element={
                <ProtectedRoutes>
                  <Order />
                </ProtectedRoutes>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutesForAdmin>
                  <Dashboard />
                </ProtectedRoutesForAdmin>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route
              path="/updateProduct"
              element={
                <ProtectedRoutesForAdmin>
                  <UpdateProduct />
                </ProtectedRoutesForAdmin>
                // <UpdateProduct />
              }
            />
            <Route
              path="/addProduct"
              element={
                <ProtectedRoutesForAdmin>
                  <AddProduct />
                </ProtectedRoutesForAdmin>
              }
            />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </Router>
      </MyState>
    </>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    window.location.href = "/login";
  }
};

export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin && admin.user.email === "abcd@gmail.com") {
    return children;
  } else {
    window.location.href = "/login";
  }
};
