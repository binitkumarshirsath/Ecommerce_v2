import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import './Products.css'
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + "api/product/get-product/"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 ">
              <h3 className="text-center mb-4">All Products</h3>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product, i) => (
                  <Link key={i} to={`/dashboard/admin/products/update-product/${product.slug}`}>
                    <div  className="col">
                    <div className="card mb-4">
                      <img
                        src={process.env.REACT_APP_API + `api/product/get-photo/${product._id}`}
                        className="card-img-top custom-card-img"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(30)}</p>
                        <p className="card-text">$ {product.price}</p>
                        {/* <Link to={'/'} className="btn btn-secondary">
                          Go somewhere
                        </Link> */}
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      
    </Layout>
  );
}
