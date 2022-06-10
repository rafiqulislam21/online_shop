import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

import { ShopProvider } from "./contexts/ShopContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <ShopProvider>
      <ProductProvider>
        <CartProvider>
          <div className="App">
            <Router>
              <Nav />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Shop />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
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