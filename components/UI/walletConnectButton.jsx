"use client"

import { useEffect, useState } from "react";

import usePhantomProvider from "@/lib/hooks/phantomProvider"
import axios from "axios"
import { useGlobalContext } from "@/context/MainContextProvider";
import { usePathname } from "next/navigation";

const WalletConnectButton = () => {
    const {provider} = usePhantomProvider();
    const {publicKey, setPublicKey} = useGlobalContext();
    const {user} = useGlobalContext();
  
    const pathname = usePathname();
  
    const handleConnect = async () => {
      if (!provider) throw new Error("Phantom wallet not installed");
  
      try {
        await provider?.connect();
      } catch (err) {
        console.error(err);
      }
    }
  
    const handleDisconnect = async () => {
      if (!provider) throw new Error("Phantom wallet not installed");
  
      try {
        await provider?.disconnect();
      } catch (err) {
        console.error(err);
      }
    }
  
    useEffect(() => {
      if (!provider) return;
  
      provider?.connect({ onlyIfTrusted: true })
        .catch((err) => {
          console.error(err);
        });
  
      provider?.on('connect', (publicKey) => {
        setPublicKey(publicKey);
      });
  
      provider?.on('disconnect', () => {
        setPublicKey(null);
      });
  
      provider?.on('accountChanged', (publicKey) => {
        if (publicKey) {
          setPublicKey(publicKey);
        } else {
          provider.connect().catch((error) => {
            console.error('Failed to reconnect:', error);
          });
        }
      });
  
    }, [provider]);
  
    return (
      <>
        {provider?.isConnected ?
          <button className={` cursor-pointer bg-gradient-to-br absolute top-4 right-4 z-50 from-slate-900 to-black border-[1px] rounded-lg border-slate-800 px-8 py-3  h-12 text-white `} onClick={handleDisconnect}>
            {publicKey?.toString().slice(0, 6) + "..." + publicKey?.toString().slice(-6)}
          </button> :
          <button className={` cursor-pointer bg-gradient-to-br absolute top-4 right-4 z-50 from-slate-900 to-black border-[1px] rounded-lg border-slate-800 px-8 py-3 h-12 text-white`} onClick={handleConnect}>
            Wallet Connect
          </button>
        }
  
      </>
    )
  }
  
  export default WalletConnectButton