// src/components/Header.tsx
import React, { useContext } from "react";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TextField, InputAdornment } from '@mui/material';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import BasketContext from "../store/reducers/basketContext";

const Header = () => {

  const {basketCount} = useContext(BasketContext);

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">My Application</h1>
      </div>

      <div className="main-search-container">
        <TextField
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="search-box"
        />
      </div>

      <Link to="/">
          <button className="page-link-button">Home</button>
        </Link>
        <Link to="/about">
          <button className="page-link-button">About</button>
        </Link>
        <Link to="/product">
          <button className="page-link-button">Detail</button>
        </Link>

      <div className="icon-container">
        <FavoriteIcon className="icon-favorite" />
          <div className="basket-icon">
            <LocalGroceryStoreIcon className="icon-grocery" />
            <span>{basketCount}</span> {/* Sepet Sayısı */}
          </div>
      </div>
    </header>
  );
};

export default Header;
