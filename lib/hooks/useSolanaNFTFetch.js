"use client"

import { useState, useEffect } from "react";

import { ShyftSdk, Network } from '@shyft-to/js';

import { useGlobalContext } from "@/context/MainContextProvider";

const useSolanaNFTFetch = () => {
    const { publicKey } = useGlobalContext();
    const shyft = new ShyftSdk({apiKey: "AkEA6RnkX6IwV-Ni", network: Network.Mainnet});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [NFTs, setNFTs] = useState();

    useEffect(() => {
        if (!publicKey) return;
        
        setLoading(true)
        let cancel = false;
        shyft.nft.getNftByOwner({owner: publicKey?.toString()}).then( res => {
            console.log(res);
            if (cancel) return
            setLoading(false)
            setNFTs(res)
        }, error => {
            if (cancel) return
            setLoading(false)
            setError(error)
        })
        
        return () => {
            cancel = true;
        }
    }, [publicKey])

    return {loading, error, NFTs};
};

export default useSolanaNFTFetch;