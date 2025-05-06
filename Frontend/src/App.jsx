import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/pageNotFound";
import HomePage from "./components/HomePage";
import Layout from "./Layout/Layout";
import Products from "./components/Products";
import ProductDetails from "./components/DetailPage";
import Cart from "./components/Cart";
import Login from "./components/login";
import Register from "./components/Register";
import Blog from "./components/blog/Blog";
import Profile from "./components/profile/Profile";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import NotFound from "./components/dashboard/PageNotFound/NotFound";
import AdminUser from "./components/dashboard/adminUser/AdminUser";
import Dashboard from "./components/dashboard/Dashboard";
import AdminProduct from "./components/dashboard/adminProduct/AdminProduct";
import AdminBlog from "./components/dashboard/adminBlog/AdminBlog";

function App() {
  return (
    <Routes>
      {/* Các route có layout */}

      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/profile" element={<Profile />} />


      {/* Route KHÔNG dùng layout */}
      <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<Dashboard />} />
        <Route path="adminUser" element={<AdminUser />} />
        <Route path="adminProduct" element={<AdminProduct />} />
        <Route path="adminBlog" element={<AdminBlog />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
