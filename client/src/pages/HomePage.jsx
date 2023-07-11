import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/category/get-category"
      );
      if (data.success) setCategories(data.data);
    } catch (e) {
      toast.error("Something went wrong while fetching Categories");
      console.log(e);
    }
  }

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
    getAllCategories();
  }, []);

  //this function is taking the id of category and the event of checkbox named checked
  //value can be true or false , if its false , means checkbox is unticked and so to remove we are using filter methid
  //
  function handleChange(value, id) {
    let allCheckedCategories = [...checked];
    if (value) {
      allCheckedCategories.push(id);
    } else {
      allCheckedCategories = allCheckedCategories.filter((acc) => acc !== id);
    }
    setChecked(allCheckedCategories);
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="mb-4 ms-2">Categories</h2>
            
            <div className="d-flex flex-column">
              {categories?.map((category) => (
                <Checkbox
                  className="ms-2 mb-2"
                  key={category._id}
                  onChange={(e) => handleChange(e.target.checked, category._id)}
                >
                  <h5>{category.name}</h5>
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="row">
              {products.map((product, i) => (
                <div key={product._id} className="col-md-4">
                  <div className="card m-2" style={{ widows: "18rem" }}>
                    <img
                      src={
                        process.env.REACT_APP_API +
                        `api/product/get-photo/${product._id}`
                      }
                      className="card-img-top custom-card-img"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <button className="btn btn-info mb-2 me-3">
                        See more details
                      </button>
                      <button className="btn btn-success mb-2 ">Add to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
