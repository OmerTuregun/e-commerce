import React, { useContext, useEffect, useState } from "react";
import { Box, Slide, Card, CardMedia, CardContent, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Stil dosyası
import BasketContext from "../store/reducers/basketContext";

const images = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAA1BMVEWhy4Mjf9aSAAAAPUlEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvgyZwAABCrx9CgAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAA1BMVEWUzOcEQcJvAAAAPUlEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvgyZwAABCrx9CgAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAA1BMVEX65hV60HtdAAAAPUlEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvgyZwAABCrx9CgAAAABJRU5ErkJggg==",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("left");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add Basket
  const { basketCount, setBasketCount } = useContext(BasketContext);

  const handleAddToBasket = () => {
    setBasketCount(basketCount + 1);
  }

  return (
    <div className="home-container">
      {/* Reklam Panosu */}
      <Box className="top-banner-container" sx={{ position: "relative" }}>
        {images.map((src, index) => (
          <Slide
            key={index}
            direction={direction}
            in={currentIndex === index}
            mountOnEnter
            unmountOnExit
            timeout={1000}
          >
            <Box
              component="img"
              src={src}
              alt={`Reklam ${index + 1}`}
              className="top-banner-image"
            />
          </Slide>
        ))}
      </Box>

      {/* Ürünleri Göster */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Card className="product-card" key={product.id}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-details">
                <Typography variant="h6" component="div" className="product-title">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="product-price">
                  {product.price} USD
                </Typography>
                <Link to={`/product/${product.id}`} className="product-link">
                  View Details
                </Link>
                <Button variant="contained" color="primary" className="add-to-cart-button" onClick={handleAddToBasket}>
                  Add to Basket
                </Button> 
              </div>
            </Card>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
