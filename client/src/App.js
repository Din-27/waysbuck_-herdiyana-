import { BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import { UserContext, UserContextProvider } from "./context/userContext";
import Home from "../src/pages/Home";
import LoginModal from "./pages/LoginModals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageLogin from "./pages/PageLogin";
import PageAdmin from "./pages/PageAdmin";
import Profile from "./pages/ProfileUser";
import Transaction from "./pages/Transaction";
import AddProduct from "./pages/AddProduct";
import AddToping from "./pages/AddToping";
import Admin from "./pages/Admin";
import Cart from './pages/Cart'
import Product from './pages/BackupProduct'
import UpdateProduct from './pages/UpdateProduct'
import UpdateToping from './pages/UpdateToping'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/api";








function App() {




  

  return (
  <Router>
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<LoginModal />} />
        <Route exact path="/Login1" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/PageLogin" element={<PageLogin />} />
        <Route exact path="/PageAdmin" element={<PageAdmin />} />
        <Route exact path="/PageAdmin/:id" element={<PageAdmin />} />
        <Route exact path="/Profile/:id" element={<Profile />} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/Transaction" element={<Transaction />} />
        <Route exact path="/Admin" element={<Admin />} />
        <Route exact path="/AddProduct" element={<AddProduct />} />
        <Route exact path="/AddToping" element={<AddToping />} />
        <Route exact path="/Product/:id" element={<Product/>} />
        <Route exact path="/Product/:id/:id" element={<Product/>} />
        <Route exact path="/UpdateProduct/:id" element={<UpdateProduct/>} />
        <Route exact path="/UpdateToping/:id" element={<UpdateToping/>} />
      </Routes>
    </UserContextProvider>
</Router>
  );
}

export default App;