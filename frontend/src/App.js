import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from "./pages/Cart";
import Report1 from "./pages/Report1";
import Report2 from "./pages/Report2";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute"

import { ShopProvider } from "./contexts/ShopContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));

  return (
    <ShopProvider>
      <ProductProvider>
        <CartProvider>
          <div className="App">
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetail />} />

                <Route
                  path="/report-1"
                  element={
                    <ProtectedRoute
                      redirectPath="/"
                      isAllowed={loggedUser?.user_role === "admin"}
                    >
                      <Report1 />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/report-2"
                  element={
                    <ProtectedRoute
                      redirectPath="/"
                      isAllowed={loggedUser?.user_role === "admin"}
                    >
                      <Report2 />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/product/add"
                  element={
                    <ProtectedRoute
                      redirectPath="/"
                      isAllowed={loggedUser?.user_role === "admin"}
                    >
                      <AddProduct />
                    </ProtectedRoute>
                  }
                />

                <Route path="/shop/cart" element={<Cart />} />
              </Routes>
              <Footer />
            </Router>
          </div>
        </CartProvider>
      </ProductProvider>
    </ShopProvider>
  );
}

export default App;
