import { useState , useEffect} from "react";
import { useAuth } from "../context/authContext"
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";

export default function PrivateRoute() {
    const[auth,setAuth] = useAuth();
    const[ok,setOk] = useState(false);
    useEffect(()=>{
        async function getStatus(){
            try {
                const response = await axios.get(process.env.REACT_APP_API+'api/user-dashboard');
                
                if(response.data.success){
                    setOk(true);
                }else{
                    setOk(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(auth?.token) getStatus();
    },[auth?.token])

  return ok? <Outlet/> : <Spinner/>;
}
