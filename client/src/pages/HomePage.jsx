import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Radio } from "antd";
import { Prices } from "../components/price.js";
import { useSearch } from "../context/searchContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  async function getTotal() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + "api/product/product-count"
      );
      setTotal(response.data.totalProduct);
    } catch (e) {
      toast.error("Something went wrong while fetching Categories");
      console.log(e);
    }
  }

  useEffect(() => {
    getTotal();
  }, []);
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
        process.env.REACT_APP_API + `api/product/:${page}`
      );
      setProducts(response.data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  // get filtered products
  const getFilteredProducts = async () => {
    const params = {
      checked: checked,
      radio: radio,
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "api/product/filtered-products",
        params
      );
      setProducts(response.data.filteredProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked?.length || radio?.length) getFilteredProducts();
  }, [checked?.length, radio]);

  function handleChange(value, id) {
    let allCheckedCategories = [...checked];
    if (value) {
      allCheckedCategories.push(id);
    } else {
      allCheckedCategories = allCheckedCategories.filter((acc) => acc !== id);
    }
    setChecked(allCheckedCategories);
  }

  function handleReset() {
    setChecked([]);
    setRadio([]);
    window.location.reload();
  }

  function handleCart(product) {
    const existingItem = cart.find((item) => item._id === product._id);
    const availableQuantity = product.quantity; // Assuming the available quantity is provided in the 'quantity' property of the product
    
    if (existingItem) {
      if (existingItem.Addedquantity < availableQuantity) {
        setCart((prevData) =>
          prevData.map((item) =>
            item._id === product._id
              ? { ...item, Addedquantity: item.Addedquantity + 1 }
              : item
          )
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`${product.name} quantity increased in cart`);
      } else {
        toast.error(`${product.name} has reached the maximum quantity available in cart`);
      }
    } else {
      const newCartItem = { ...product, Addedquantity: 1 };
      setCart((prevData) => [...prevData, newCartItem]);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`${product.name} added to cart`);
    }
    
  }
  

  async function handlePageUpdate(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await axios.get(
        process.env.REACT_APP_API + `api/product/${nextPage}`
      );
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.product,
      ]);
      setPage(nextPage);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="mb-4 ms-2">Filter by Category</h2>

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
            <h2 className="mb-4 ms-2">Filter by Price</h2>

            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>
                      <h5>{p.name}</h5>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="text-center m-3">
              <button className="btn btn-danger" onClick={handleReset}>
                Reset filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="row">
              {products?.map((product, i) => (
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
                     <b> <p className="card-text " style={{color:"green"}}>$ {product.price}</p></b>

                      <button
                        className="btn btn-info mb-2 me-3"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        See more details
                      </button>
                      <button
                        className="btn btn-success mb-2 "
                        onClick={() => handleCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {products?.length < total && !checked?.length && !radio?.length && (
              <div className="text-center">
                <button className="btn btn-dark m-4" onClick={handlePageUpdate}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
