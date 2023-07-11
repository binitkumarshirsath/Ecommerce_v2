import React from "react";
import Layout from "./Layout/Layout";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    
      <div className="list-group">
        <NavLink
          to = "/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          CREATE CATEGORY
        </NavLink>
        <NavLink to = "/dashboard/admin/create-product" className="list-group-item list-group-item-action">
          CREATE PRODUCT
        </NavLink>
        <NavLink to = "/dashboard/admin/users" className="list-group-item list-group-item-action">
          USERS
        </NavLink>
        <NavLink to = "/dashboard/admin/products" className="list-group-item list-group-item-action">
          PRODUCTS
        </NavLink>
        
      </div>
    
  );
}
