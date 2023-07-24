'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Box } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/product/getAll')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1 className='titleh1'>Welcome to Our Phone Store</h1>
      <p className='phone'>Phones are the Spirit of Fashion</p>
      <p id='main'>Main Collection</p>
      <p id='market'>Creators Market</p>
      <p className='iphone'>
        We offer the latest and trendiest smartphones in the market. Stay connected in style with our wide range of smartphones from top brands.
      </p>
      <p className='exploree'>Explore Now</p>
      <p className='create'>Create</p>
      <p id='yes'>100+</p>
      <p id='brands'>Brands</p>
      <p id='k'>50k+</p>
      <p id='fashion'>Fashion Designers</p>
      <p id='y'>60+</p>
      <p id='shows'>Fashion Shows</p>
      <div id='under'>
      <Box>
        <table id='box'></table>
      </Box>
      <Box>
        <table id='box1'></table>
      </Box>
      <Box>
        <table id='box2'></table>
      </Box>
      <Box>
        <table id='box3'></table>
      </Box>
       <Box>
        <table id='box4'></table>
        </Box>
        <Box>
          <h2 className='titleh2'>Featured Products</h2>
          <div className='featured-products'>
            {products.map((product) => (
              <div key={product.id} className='product'>
                <img src={product.imageUrl} alt={product.name} />
                <p className='product-name'>{product.name}</p>
                <p className='product-price'>Price: ${product.price}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>

      <div className='lorm'>
        <p id='about'>About Us</p>

        <p id='us'>
          We are a passionate team of technology enthusiasts who are dedicated to bringing you the best smartphones and accessories. Our mission is to provide high-quality products and excellent customer service.
        </p>
        <p id='speak'>Fashion That Speaks</p>
        <p id='p'>
          Our carefully curated collection of smartphones reflects the latest fashion trends and cutting-edge technology. Whether you're a tech-savvy individual or a fashion-forward enthusiast, we have the perfect phone for you.
        </p>
        <p id='more'>Show more</p>
      </div>
    </div>
  );
};

export default Home;
