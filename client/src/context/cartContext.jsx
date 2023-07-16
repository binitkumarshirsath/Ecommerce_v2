import { useState, useContext, createContext, useEffect } from "react";

const CARTCONTEXT = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    const data = localStorage.getItem('cart');
    if(data){
        setCart(JSON.parse(data));
    }
  },[])

  return (
    <CARTCONTEXT.Provider value={[cart, setCart]}>
      {children}
    </CARTCONTEXT.Provider>
  );
}

function useCart() {
  return useContext(CARTCONTEXT);
}

export { useCart, CartProvider };
