'use client';
import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import axios from 'axios';
import { AuthContext } from '@/components/isAuth/authContext'

import './style.css';
interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
}
const Products = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [data, setData] = useState<number>(6000);
  type Anchor = 'right';
  const [state, setState] = useState<Record<string, boolean>>({});
  const role = sessionStorage.getItem("userRole")
  console.log("role",role);


  const [form, setForm] = useState({});
  const onchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e: any) => {
    e.preventDefault(e);
    axios
      .post('http://localhost:3000/api/payment/', form)
      .then((res) => {
        const { result } = res.data;
        window.location.href = result.link;
      })
      .catch((err) => console.log(err));
  };
  /////
  const toggleDrawer =
    (productId: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [productId]: open });
    };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemText primary="Hello" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get('http://localhost:3000/product/getAll');
        setProduct(res.data);
        console.log(product);
       
        // setSearch(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, []);
  const filteredProducts = product.filter((p) => p.price <= data);
  return (
    <div>
      {role !=="client" &&(
      <Link href="/addproduct">
        <Button className="btnSeller" variant="contained" disableElevation>
          Seller
        </Button>
      </Link>
      )}
      <div className="filtered">
        {' '}
        <h1 className="wordfilters">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="17"
            viewBox="0 0 30 17"
            fill="none"
          >
            <path
              d="M0 15.7857C0 15.4637 0.127934 15.1548 0.355656 14.9271C0.583379 14.6994 0.892237 14.5714 1.21429 14.5714H8.5C8.82205 14.5714 9.13091 14.6994 9.35863 14.9271C9.58635 15.1548 9.71429 15.4637 9.71429 15.7857C9.71429 16.1078 9.58635 16.4166 9.35863 16.6443C9.13091 16.8721 8.82205 17 8.5 17H1.21429C0.892237 17 0.583379 16.8721 0.355656 16.6443C0.127934 16.4166 0 16.1078 0 15.7857ZM0 8.5C0 8.17795 0.127934 7.86909 0.355656 7.64137C0.583379 7.41365 0.892237 7.28571 1.21429 7.28571H18.2143C18.5363 7.28571 18.8452 7.41365 19.0729 7.64137C19.3006 7.86909 19.4286 8.17795 19.4286 8.5C19.4286 8.82205 19.3006 9.13091 19.0729 9.35863C18.8452 9.58635 18.5363 9.71429 18.2143 9.71429H1.21429C0.892237 9.71429 0.583379 9.58635 0.355656 9.35863C0.127934 9.13091 0 8.82205 0 8.5ZM0 1.21429C0 0.892237 0.127934 0.583379 0.355656 0.355656C0.583379 0.127934 0.892237 0 1.21429 0H27.9286C28.2506 0 28.5595 0.127934 28.7872 0.355656C29.0149 0.583379 29.1429 0.892237 29.1429 1.21429C29.1429 1.53633 29.0149 1.84519 28.7872 2.07292C28.5595 2.30064 28.2506 2.42857 27.9286 2.42857H1.21429C0.892237 2.42857 0.583379 2.30064 0.355656 2.07292C0.127934 1.84519 0 1.53633 0 1.21429Z"
              fill="white"
            />
          </svg>{' '}
          Filters
        </h1>
        <Grid className="star"></Grid>
        <div className="dvvv">
          <h3 className="wordf">Filter buy the price :</h3>
          <h4>{data} $</h4>
          <input
            type="range"
            min="0"
            max="6000"
            step="1"
            value={data}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData(parseInt(e.target.value))
            }
          />
        </div>
      </div>
      <div className="grid-container">
        {filteredProducts.map((e: any) => {
          return (
            <div className=" item3" key={e.id}>
              <img className="img1" src={e.imageUrl} alt="" />
              <div>
                <p className=" txt ">{e.name}</p>
                <p className=" title ">{e.description}</p>

                
                

                <Link
                        href={{
                        pathname: '/rate',
                        query: { id: e.id },
                     }}>

                <svg
                  className="rate"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <path
                    d="M19.5028 4.29051C19.1968 3.58754 18.7556 2.95052 18.2039 2.41511C17.6518 1.8781 17.0008 1.45134 16.2864 1.15805C15.5456 0.852714 14.7511 0.696426 13.9489 0.698258C12.8236 0.698258 11.7256 1.00403 10.7714 1.5816C10.5431 1.71976 10.3263 1.87152 10.1208 2.03686C9.91539 1.87152 9.69854 1.71976 9.47026 1.5816C8.51609 1.00403 7.41811 0.698258 6.29273 0.698258C5.48237 0.698258 4.69711 0.852276 3.95523 1.15805C3.23846 1.45249 2.59245 1.87604 2.03775 2.41511C1.48533 2.94992 1.04404 3.58709 0.738891 4.29051C0.421594 5.02209 0.259521 5.79898 0.259521 6.59852C0.259521 7.35275 0.414746 8.1387 0.722912 8.93824C0.980859 9.6064 1.35066 10.2995 1.82318 10.9994C2.57191 12.1069 3.60141 13.2621 4.87973 14.4331C6.99809 16.3741 9.0959 17.715 9.18493 17.7694L9.72593 18.1136C9.96561 18.2654 10.2738 18.2654 10.5135 18.1136L11.0545 17.7694C11.1435 17.7127 13.239 16.3741 15.3597 14.4331C16.638 13.2621 17.6675 12.1069 18.4162 10.9994C18.8887 10.2995 19.2608 9.6064 19.5165 8.93824C19.8246 8.1387 19.9799 7.35275 19.9799 6.59852C19.9822 5.79898 19.8201 5.02209 19.5028 4.29051Z"
                    fill="#FF2525"
                  />
                </svg>
                     </Link>
                    
                <button onClick={toggleDrawer(e.id, true)} className="btnn">
                  {e.price} $
                </button>
                <Drawer
                  anchor="right"
                  open={state[e.id] || false}
                  onClose={toggleDrawer(e.id, false)}
                >
                  <Box sx={{ width: 250 }} role="presentation">
                    <List>
                      <ListItem>
                        <ListItemText primary={`name: ${e.name} `} />
                        <ListItemText primary={`Price: ${e.price} $`} />
                        <img src={`${e.imageUrl}`} className="dr" />
                      </ListItem>
                    </List>
                    <Divider />
                    <h3 className="tinp">
                      TOTAL :{' '}
                      <input onChange={onchange} typeof="text" name="amount" />
                    </h3>
                    <Button
                      onClick={onSubmit}
                      className="btn"
                      variant="contained"
                      disableElevation
                    >
                      Buy Now
                    </Button>
                  </Box>
                </Drawer>
              </div>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};
export default Products;
