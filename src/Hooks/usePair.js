import {useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getPairReserves, getPairToken0, getPairToken1} from "../web3Utils/uniPair";
import {StateContext} from "../Contexts/StateContext";
import {ethers} from "ethers";
import {getERC20TotalSupply} from "../web3Utils/erc20Utils";

const usePair = ({address}) => {
    const stateContext = useContext(StateContext);
    const [price0, setPrice0] = useState(null);
    const [price1, setPrice1] = useState(null);
    const [priceLpInToken1, setPriceLpInToken1] = useState(null);
    const [priceLpInToken0, setPriceLpInToken0] = useState(null);

    const getSigner = () => {
        return;
        if(!stateContext.currentAccount)
            return;
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        return provider.getSigner();
    }

    const reserves = useQuery(['pair',address,'reserves'], async () => {
        let signer = getSigner();
        console.log("signer ? ", !!signer);
        const _reserves = await getPairReserves(address, signer).catch(error => {
            console.log(error);
        })
        if(!_reserves) throw new Error("reserves not found");
        return {
            reserve0: _reserves[0],
            reserve1: _reserves[1],
        };
    } , {enabled: !!address});

    useEffect(() => {
        if(reserves.data){
            setPrice0(reserves.data.reserve1/reserves.data.reserve0);
            setPrice1(reserves.data.reserve0/reserves.data.reserve1);
        }
    },[reserves?.data?.reserve0,reserves?.data?.reserve1]);

    const token0 = useQuery(['pair',address,'token0'], async () => {
        let signer = getSigner();
        const token0 = await getPairToken0(address, signer);
        return token0;
    },{enabled: !!address});

    const token1 = useQuery(['pair',address,'token1'], async () => {
        let signer = getSigner();
        const token1 = await getPairToken1(address, signer);
        return token1;
    },{enabled: !!address});

    const totalSupply = useQuery(['pair',address,'totalSupply'], async () => {
        let signer = getSigner();
        return await getERC20TotalSupply(address, signer);
    },{enabled: !!reserves.data && !!address});

    useEffect(() => {
        if(totalSupply.data && reserves.data){
            setPriceLpInToken0(reserves.data.reserve0/totalSupply.data);
            setPriceLpInToken1(reserves.data.reserve1/totalSupply.data);
            console.log('useEffect total supplky')
            console.log(reserves.data.reserve0/totalSupply.data)
            console.log(reserves.data.reserve1/totalSupply.data)
        }
    },[totalSupply.data,reserves.data?.reserve0,reserves.data?.reserve1 ]);


    return {
        reserves,token0, token1, price0, price1, totalSupply, priceLpInToken0, priceLpInToken1
    }
}

export default usePair;