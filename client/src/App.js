import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Category from "./components/Layout/Category";
import SearchResult from "./pages/SearchResult";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/searchedProduct" element = {<SearchResult/>}/>
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route path="/category/:slug" element = {<Category/>}/>
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="/dashboard/user" element={<Dashboard />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />
        <Route path="/dashboard/user/profile" element={<Profile />} />
        
      </Route>
      <Route path="/dashboard" element = {<ProtectedRoute/>}>
        <Route path="/dashboard/admin" element = {<AdminDashboard/>} />
        <Route path="/dashboard/admin/create-category" element = {<CreateCategory/>} />
        <Route path="/dashboard/admin/create-product" element = {<CreateProduct/>} />
        <Route path="/dashboard/admin/users" element = {<Users/>} />
        <Route path="/dashboard/admin/products" element = {<Products/>} />
        <Route path="/dashboard/admin/products/update-product/:slug" element = {<UpdateProduct/>} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}
