// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout"; // layout klasöründen import
import Home from "./pages/Home";
import About from "./components/About"; // Yeni oluşturduğun About sayfası (örnek)
import ProductDetail from "./components/ProductDetail"; // Başka bir sayfa (örnek)
import { BasketProvider } from "./store/reducers/basketContext";

const App: React.FC = () => {
  return (
    <BasketProvider>
      <Router>
        <MainLayout>
          {/* Sayfalar arasında geçiş yapılacak alan */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Ana Sayfa */}
            <Route path="/about" element={<About />} /> {/* Hakkında Sayfası */}
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Detaylar Sayfası */}
          </Routes>
        </MainLayout>
      </Router>
    </BasketProvider>
  );
};

export default App;
