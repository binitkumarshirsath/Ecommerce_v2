
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    
      <div className="list-group">
        <NavLink
          to = "/dashboard/user/profile"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          MY PROFILE
        </NavLink>
        <NavLink to = "/dashboard/user/orders" className="list-group-item list-group-item-action">
          MY ORDERS
        </NavLink>
       
        
      </div>
    
  );
}
