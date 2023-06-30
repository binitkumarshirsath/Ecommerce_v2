
import { useContext, createContext, useState , useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: "", token: null });

  useEffect(()=>{
    const data = localStorage.getItem('auth');
    if(data){
      const parsedData = JSON.parse(data);
      setAuth({...auth,user:parsedData.user,token:parsedData.token});
    }
  },[])

  return (
    <AuthContext.Provider value={[ auth, setAuth ]}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
