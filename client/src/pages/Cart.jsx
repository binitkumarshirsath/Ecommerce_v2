import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cartContext";
import "./Cart.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  async function getToken() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/braintree/token"
      );
      if (data.success) {
        setClientToken(data.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getToken();
  }, [user?.token]);
  function handleIncrement(itemId) {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId && item.Addedquantity < item.quantity) {
        return { ...item, Addedquantity: item.Addedquantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedItem = updatedCart.find((item) => item._id === itemId);
    if (updatedItem) {
      if (updatedItem.Addedquantity === updatedItem.quantity) {
        toast.warning(`Maximum quantity reached for ${updatedItem.name}`);
      } else {
        toast.success(`${updatedItem.name} quantity increased`);
      }
    }
  }

  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.Addedquantity;
  }, 0);

  function handleDecrement(itemId) {
    const updatedCart = cart.map((item) => {
      if (itemId === item._id && item.Addedquantity > 1) {
        toast.success(`${item.name} quantity decreased`);
        return { ...item, Addedquantity: item.Addedquantity - 1 };
      } else if (itemId === item._id && item.Addedquantity === 1) {
        toast.warning(`${item.name} removed from cart`);
        return null; // Remove the item from the cart by returning null
      } else {
        return item;
      }
    });

    const filteredCart = updatedCart.filter((item) => item !== null); // Filter out null values
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  }

  function handleRemoveItem(itemId) {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  async function handlePayment() {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post(
        process.env.REACT_APP_API + "api/braintree/payment",
        { cart, nonce }
      );
      console.log(response.data.success);
      if(response.data.success){
        toast.success("Order placed successfully")
        localStorage.removeItem('cart');
        setCart([])
        navigate('/dashboard/user/orders');
      }
    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8">
            <div className="p-2">
              <h4>Shopping cart</h4>
            </div>
            {user?.token ? (
              <>
                {cart?.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
                    >
                      <div className="mr-1">
                        <img
                          className="rounded"
                          src={
                            process.env.REACT_APP_API +
                            `api/product/get-photo/${item._id}`
                          }
                          width={70}
                        />
                      </div>
                      <div className="d-flex flex-column align-items-center product-details">
                        <span className="font-weight-bold">{item.name}</span>
                        <div className="d-flex flex-row product-desc"></div>
                      </div>
                      <div className="d-flex flex-row align-items-center qty">
                        <i
                          className="fa fa-minus text-danger"
                          onClick={() => {
                            handleDecrement(item._id);
                          }}
                        />
                        <h5 className="text-grey mt-1 mr-1 ml-1">
                          {" "}
                          {item.Addedquantity}{" "}
                        </h5>
                        <i
                          className="fa fa-plus text-success"
                          onClick={() => {
                            handleIncrement(item._id);
                          }}
                        />
                      </div>
                      <div>
                        <h5 className="text-grey">
                          ${item.price * item.Addedquantity}
                        </h5>
                      </div>
                      <div className="d-flex align-items-center">
                        <i
                          className="fa fa-trash mb-1 text-danger"
                          onClick={() => {
                            handleRemoveItem(item._id);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div id="dropin-container">
                  {clientToken && cart?.length && (
                    <DropIn
                      options={{ authorization: clientToken }}
                      onInstance={(instance) => {
                        setInstance(instance);
                      }}
                    />
                  )}
                </div>
                <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
                  <button
                    onClick={handlePayment}
                    className="btn btn-warning btn-block btn-lg ml-2 pay-button"
                    type="button"
                  >
                    Proceed to Pay
                  </button>
                  <div style={{ marginLeft: "auto" }}>
                    <h4 style={{ textAlign: "right" }}>
                      Your total is ${totalAmount}
                    </h4>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h5>
                  You have {cart.length} items in Cart ! Please login to
                  checkout
                </h5>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
