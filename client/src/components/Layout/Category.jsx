import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function () {
  const params = useParams();
  const [product,setProduct] = useState([]);
  
  async function getProductByCategory(){
    const response = await axios.get(process.env.REACT_APP_API + `api/product/product-category/${params.slug}`);
    setProduct(response.data.product);
  }
  useEffect(()=>{
    getProductByCategory();
  },[params])
  return (
    <Layout>
        <div className="container-fluid">
          <h1 className='text-center'>{params.slug.toUpperCase()}</h1>
          <div className="d-flex">
          
                {product.map((item, i) => (
                  <Link key={i} to={`/dashboard/admin/products/update-product/${item.slug}`}>
                    
                    <div className="card m-4" style={{width : "18rem"}}>
                      <img
                        src={process.env.REACT_APP_API + `api/product/get-photo/${item._id}`}
                        className="card-img-top custom-card-img"
                        alt={item.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description.substring(30)}</p>
                        <p className="card-text">$ {item.price}</p>
                        {/* <Link to={'/'} className="btn btn-secondary">
                          Go somewhere
                        </Link> */}
                      </div>
                    </div>
                  
                  </Link>
                ))}
              
          </div>
        </div>
    </Layout>
  )
}
