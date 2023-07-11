import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const { Option } = Select;
export default function UpdateProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    isShipping: "",
    category: "",
    quantity: "",
  });
  const[photo,setPhoto] = useState("");
  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);
  const [id, setId] = useState();
  async function getSingleProduct() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + `api/product/get-product/${params.slug}`
      );
      // console.log(data.product); forgot photo had a diff route ;-;
      setId(data.product._id);
      setProduct({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        isShipping: data.product.isShipping,
        category: data.product.category._id,
        quantity: data.product.quantity,
      });
    } catch (error) {
      console.log(error);
    }
  }


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

  async function handleOnClick(e) {
    e.preventDefault();
    try {
      if (
        !product.name ||
        !product.description ||
        !product.price ||
        !product.category ||
        !product.quantity
      ) {
        toast.error("Please fill out all the fields");
        return;
      }
      if (isNaN(Number(product.price)) || isNaN(Number(product.quantity))) {
        toast.error("Price and quantity must be numeric values");
        return;
      }

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      photo && formData.append("photo", photo);
      formData.append("isShipping", product.isShipping);
      formData.append("category", product.category);
      formData.append("quantity", product.quantity);

      const response = await axios.put(
        process.env.REACT_APP_API + `api/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(()=>{
          navigate('/dashboard/admin/products')
        },1000) 
      }
    } catch (error) {
      toast.error("Error while updating product");
      console.log(error);
    }
  }
  
  function handleOnChange(e) {
    const{name,value} = e.target;
    setProduct((prevData)=>({
      ...prevData,
      [name] : value
    }))
  }

  async function handleDelete(e){
    e.preventDefault();
    try{
      const response = await axios.delete( process.env.REACT_APP_API + `api/product/delete-product/${id}`);
      console.log(response);
      if(response.data.success){
        toast.success(response.data.message);
        setTimeout(()=>{
          navigate('/dashboard/admin/products')
        },1000) 
      }
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="mb-2">Update Product</h2>
            <Select
              showSearch
              showArrow
              placeholder="Select Category"
              className="w-50 "
              value={product.category}
              onChange={(value) =>
                setProduct((prevValue) => ({
                  ...prevValue,
                  category: value,
                }))
              }
            >
              {categories?.map((item, i) => {
                return (
                  <Option key={i} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>

            <div className="mb-2">
              {!photo ? (
                <div className="text-left">
                  <img
                    src={
                      process.env.REACT_APP_API + `api/product/get-photo/${id}`
                    }
                    // onChange={(e)=>{setPhoto(process.env.REACT_APP_API + `api/product/get-photo/${id}`)}}
                    className="img img-responsive"
                    height={"200px"}
                    alt="product-photo"
                  />
                </div>
              ) : (
                <div className="text-left">
                  <img
                    src={URL.createObjectURL(photo)}
                    className="img img-responsive"
                    height={"200px"}
                    alt="product-photo"
                  />
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="btn btn-outline-secondary mt-2">
                {" "}
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <div className="mb-2">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Product Name</label>
                  <input
                    type="text"
                    className="form-control mb-2 w-50"
                    placeholder="Enter product name"
                    value={product.name}
                    name="name"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    className="form-control mb-2 w-50"
                    rows={3}
                    placeholder="Description"
                    value={product.description}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Product price</label>
                  <input
                    type="text"
                    className="form-control mb-2 w-50"
                    placeholder="Price"
                    value={product.price}
                    name="price"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Product quantity</label>
                  <input
                    type="text"
                    className="form-control mb-2 w-50"
                    placeholder="Quantity"
                    value={product.quantity}
                    name="quantity"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Shipping">Shipping ?</label>
                  <Select
                    placeholder="Is product shipping available"
                    className="w-50 form-control mb-4"
                    onChange={(value) =>
                      setProduct((prevValue) => ({
                        ...prevValue,
                        isShipping: value,
                      }))
                    }
                    name="isShipping"
                    value={product.isShipping ? "TRUE" : "FALSE"}
                  >
                    <Option value={true}>TRUE</Option>
                    <Option value={false}>FALSE</Option>
                  </Select>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success me-4 mb-4"
                    onClick={handleOnClick}
                  >
                    Update product
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger ms-4 mb-4"
                    onClick={handleDelete}
                  >
                    Delete product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
