import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import BasketContext from "../store/reducers/basketContext"; // BasketContext'i içe aktar
import "../styles/ProductDetail.css"; // CSS dosyası

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { basketCount, setBasketCount } = useContext(BasketContext); // Context'ten değerleri al

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]); // id değiştiğinde bu effect tekrar çalışır

  const handleAddToBasket = () => {
    setBasketCount(basketCount + 1); // Sepete ekleme işlemi
  };

  if (!product) {
    return <div>Loading...</div>; // Ürün yükleniyorsa bekleme mesajı
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Card>
        <CardMedia
          className="product-detail-image"
          component="img"
          height="300"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 2 }} 
            onClick={handleAddToBasket}
          >
            Add to Basket
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
