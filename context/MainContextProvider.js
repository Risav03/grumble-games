"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {


  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [user, setUser] = useState({});

  const[fetch, setFetch] = useState(false);

  async function getUser(){
    try{
      const res = await axios.post("/api/user/create",{wallet: publicKey?.toString()});
      setUser(res.data.user);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(publicKey){
      getUser();
    }
  },[publicKey])

  return (
    <GlobalContext.Provider value={{ loader, setLoader, publicKey, setPublicKey, user, setUser, fetch, setFetch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
