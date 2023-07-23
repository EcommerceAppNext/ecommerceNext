'use client';
import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/isAuth/authContext'
import Link from 'next/link';



const AddProduct = () => {
  const  useAuth = useContext(AuthContext)
  const { user } = useAuth
  
  const [products, setProducts] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: null,
  });
  const [data, setData] = useState([]);

  const router = useRouter();

  const handleChange = (e: any) => {
    setProducts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/product/add/${user.userId}`, products);
      router.push('/products');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/product/getOneU/${user.userId}`);
        setData(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();

  }, []);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'phoneProduct');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      setProducts((prev) => ({ ...prev, imageUrl: imageUrl }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/product/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="prdadd">You can add your product now </h1>
      <form className="w3-container w3-card-4 xt" action="/action_page.php">
        <h2 className="w3-text tit">Add The Product</h2>
        <p>welcome you can add your product frome here </p>
        <p>
          <label className="w3-text tit">
            <b>Name :</b>
          </label>
          <input
            onChange={handleChange}
            className="w3-input w3-border inp"
            name="name"
            type="text"
          />
        </p>
        <p>
          <label className="w3-text tit">
            <b>Description : </b>
          </label>
          <input
            onChange={handleChange}
            className="w3-input w3-border inp"
            name="description"
            type="text"
          />
        </p>
        <p>
          <label className="w3-text tit">
            <b>Price : </b>
          </label>
          <input
            onChange={handleChange}
            className="w3-input w3-border inp"
            name="price"
            type="text"
          />
        </p>
        <p>
          <label className="w3-text tit">
            <b>Stock :</b>
          </label>
          <input
            onChange={handleChange}
            className="w3-input w3-border inp"
            name="stock"
            type="text"
          />
        </p>
        <p>
          <label className="w3-text tit">
            <b>Picture :</b>
          </label>
          <input
            onChange={handleImageUpload}
            className="w3-input w3-border"
            name="imageUrl"
            type="file"
          />
        </p>
        <Button
          className="rgst"
          variant="contained"
          onClick={handleClick}
          disableElevation
        >
          Add
        </Button>
      </form>

      <div className="tbbb">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Cover</th>
              <th scope="col">Price</th>
              <th scope="col">delete Product</th>
              <th scope="col">Update Product</th>
            </tr>
          </thead>
          <tbody>
            
{data.map((elem : any)=>{
  return (

            <tr key={elem.id}>
              <th scope="row">{elem.name}</th>
              <td>{elem.description}</td>
              <td>
                <img src={elem.imageUrl} alt="" style={{ height: '90px' }} />
              </td>
              <td>{elem.price}</td>
              <td>
                <button type="button" className="btn btn-success  ">
                <Link   href={{
                        pathname: '/updateProducts',
                        query: { id: elem.id },
                     }}>Update</Link>
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(elem.id)} type="button" className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
  )
})}
           

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;