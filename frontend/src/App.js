import './style/App.scss';
import AdminProducts from './components/Admin/AdminProducts/AdminProducts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHeader from './components/User/UserHeader/UserHeader';
import UserFooter from './components/User/UserFooter/UserFooter';
import UserHome from './components/User/UserHome/UserHome';
import Size from './components/User/Size/Size';
import Introduce from './components/User/Introduce/Introduce';
import BuyingGuide from './components/User/Tutorial/BuyingGuide';
import Security from './components/User/Tutorial/Security';
import Return from './components/User/Tutorial/Return';
import Contact from './components/User/Tutorial/Contact';
import Products from './components/User/Products/Products';
import Cart from './components/User/Cart/Cart';
import Login from './components/User/Login/Login';
import { useSelector } from 'react-redux';
import AdminHeader from './components/Admin/AdminHeader/AdminHeader';
import Register from './components/User/Register/Register';
import Orders from './components/Admin/Orders/Orders';
import ProductDetails from './components/User/ProductDetails/ProductDetails';
import { useEffect, useState } from 'react';
import Test from './components/Admin/Test/Test';
import UsersInformation from './components/Admin/UsersInformation/UsersInformation';
import Checkout from './components/User/Checkout/Checkout';
import Profile from './components/User/Profile/Profile';
import ScrollToTop from './ScrollToTop';
import ChangePassword from './components/User/ChangePassword/ChangePassword';
import OrdersHistory from './components/User/OrdersHistory/OrdersHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [admin, setAdmin] = useState(0);
  const [refreshHeader, setRefreshHeader] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    setAdmin(user?.user?.user_id);
  }, [user])

  return (

    <Router>
      {user?.user?.user_id === 1 && admin === 1 ? <AdminHeader admin={admin} setAdmin={setAdmin} /> : <UserHeader admin={admin} setAdmin={setAdmin} refreshHeader={refreshHeader} setRefreshHeader={setRefreshHeader} />}
      {/* <UserHeader /> */}
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<UserHome />}></Route>
          <Route path="/admin/products" element={<AdminProducts />}></Route>
          <Route path="/admin/orders" element={<Orders />}></Route>
          <Route path="/admin/users-information" element={<UsersInformation />}></Route>
          <Route path="/admin/test" element={<Test />}></Route>
          <Route path="/size" element={<Size />}></Route>
          <Route path="/introduce" element={<Introduce />}></Route>
          <Route path="/products/all" element={<Products type={"all"} title={"Tất cả sản phẩm"} />}></Route>
          <Route path="/products/tee" element={<Products type={"tee"} title={"Tee CSDL"} />}></Route>
          <Route path="/products/jacket" element={<Products type={"jacket"} title={"Jacket CSDL"} />}></Route>
          <Route path="/products/accessories" element={<Products type={"accessory"} title={"ACCESSORIES"} />}></Route>
          <Route path="/products/pants" element={<Products type={"Pants"} title={"Pants"} />}></Route>
          <Route path="/products/hoodie" element={<Products type={"hoodie"} title={"Hoodie CSDL"} />}></Route>
          <Route path="/products/sweater" element={<Products type={"sweater"} title={"Sweater CSDL"} />}></Route>
          <Route path="/products/sale" element={<Products type={"sale"} title={"Đang Giảm Giá"} />}></Route>
          <Route path="/product-details/:id" element={<ProductDetails refreshHeader={refreshHeader} setRefreshHeader={setRefreshHeader} />}></Route>
          <Route path="/tutorial/buy" element={<BuyingGuide />}></Route>
          <Route path="/tutorial/security" element={<Security />}></Route>
          <Route path="/tutorial/return" element={<Return />}></Route>
          <Route path="/tutorial/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<Cart setNote={setNote} note={note} refreshHeader={refreshHeader} setRefreshHeader={setRefreshHeader} />}></Route>
          <Route path="/checkout" element={<Checkout note={note} refreshHeader={refreshHeader} setRefreshHeader={setRefreshHeader} />}></Route>
          <Route path="/user-profile" element={<Profile />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/orders-history" element={<OrdersHistory />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ fontSize: "1.4rem", height: "32px" }}
        />
        <UserFooter />
      </ScrollToTop>
    </Router>
  );
}

export default App;
