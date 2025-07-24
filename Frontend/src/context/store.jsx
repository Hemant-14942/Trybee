import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const TrybeContext = createContext();

export const TrybeProvider = ({ children })=>{
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const[token,setToken] = useState('');
  const backendUrl = "";

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
    toast.success("Logged Out Successfully")
  }


//   useEffect(()=>{
//     const tokenData = localStorage.getItem('token');
//     if(tokenData){
//       setToken(tokenData);
//     }
//   },[])

  const value = {
    isAuthVisible,
    setIsAuthVisible,
    backendUrl,
    token,
    setToken,
    logOut,
  }

  return (
    <TrybeContext.Provider value={value}>
      {children}
    </TrybeContext.Provider>
  );
}