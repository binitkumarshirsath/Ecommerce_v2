import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  async function getSingleProduct() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api/product/get-product/${params.slug}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [params.slug]);

  async function getRelatedProduct() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API +
          `api/product/related-product/${product?._id}/${product?.category._id}`
      );

      setRelatedProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRelatedProduct();
  }, [product]);
  return (
    <Layout>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={
                  process.env.REACT_APP_API +
                  `api/product/get-photo/${product?._id}`
                }
                alt="..."
                style={{ width: "100%", maxHeight: "650px" }}
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{product?.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">
                  ${product?.price * 1.5}
                </span>
                <span> ${product?.price}</span>
              </div>
              <p className="lead">{product?.description}</p>
              <div className="d-flex">
                {/* <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  defaultValue={1}
                  
                  style={{ maxWidth: "3rem" }}
                /> */}
                <p className="lead me-3">
                  Max Quantity available {product?.quantity}{" "}
                </p>
                <Link to={"/"}>
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                  >
                    <i className="bi-cart-fill me-1" />
                    Add to cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          {relatedProduct.length === 0 && (
            <h4 className="fw-bolder mb-4">No products found</h4>
          )}

          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {relatedProduct?.map((item, i) => {
              return (
                <div className="col mb-5" key={item._id}>
                  <div className="card h-100">
                    {/* Product image*/}
                    <img
                      className="card-img-top"
                      src={
                        process.env.REACT_APP_API +
                        `api/product/get-photo/${item?._id}`
                      }
                      alt="..."
                    />
                    {/* Product details*/}
                    <div className="card-body p-4">
                      <div className="text-center">
                        {/* Product name*/}
                        <h5 className="fw-bolder">{item?.name}</h5>
                        {/* Product price*/}${item?.price}
                      </div>
                    </div>
                    {/* Product actions*/}

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <a
                          className="btn btn-outline-dark mt-auto"
                          onClick={() => navigate(`/product/${item.slug}`)}
                        >
                          View options
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
