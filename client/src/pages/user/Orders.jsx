import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";
import "./Orders.css";
import axios from "axios";
import { useAuth } from "../../context/authContext";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  async function getOrders() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api/order/user-orders`
      );
      setOrders(response.data.order);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOrders();
  }, [auth?.token]);
  {console.log(orders)}
  return (
    <Layout>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="container mt-5">
              <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                  <div className="rounded">
                    <div className="table-responsive table-borderless">
                      {orders?.map((item, i) => {
                        return (
                          <table key={item._id} className="table">
                            <thead>
                              <tr>
                                <th>
                                  Created at :{" "}
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </th>
                                <th>Company name</th>
                                <th>status</th>
                                <th>Total</th>
                                <th>Created</th>
                                <th />
                              </tr>
                            </thead>
                            {item.products? (
                              item.products.map((p,i)=>{
                                return <tbody key={i} className="table-body">
                                <tr className="cell-1">
                                  {console.log(p)}
                                  <td>{i+1}</td>
                                  <td>{p.name}</td>
                                  <td>
                                    <span className="badge badge-success">
                                      Fullfilled
                                    </span>
                                  </td>
                                  <td>$2674.00</td>
                                  <td>Today</td>
                                  <td>
                                    <i className="fa fa-ellipsis-h text-black-50" />
                                  </td>
                                </tr>
                              </tbody>
                              })
                              
                            ) : (
                              <></>
                            )}
                          </table>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
