"use client"

import { useState, useEffect } from "react";

import { ShyftSdk, Network } from '@shyft-to/js';

import { useGlobalContext } from "@/context/MainContext";

const useSolanaNFTFetch = ({apiKey }) => {
    const { publicKey } = useGlobalContext();
    const shyft = new ShyftSdk({apiKey: apiKey, network: Network.Mainnet});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [NFTs, setNFTs] = useState();

    useEffect(() => {
        if (!publicKey) return;
        
        setLoading(true)
        let cancel = false;
        shyft.nft.getNftByOwner({owner: publicKey?.toString()}).then( res => {
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