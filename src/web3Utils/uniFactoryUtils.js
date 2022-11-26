import factoryABI from './abi/factory.json';

import getContract from "./getContract";
import {SimpleRpcProvider} from "./SimpleRpcProvider";

export const getFactoryContract = (address, signer) => {
    const signerOrProvider = signer || SimpleRpcProvider;
    return getContract(factoryABI, address, signerOrProvider);
}


export const getFactoryPair = async (address, signer, tokenA, tokenB) => {
    const contract = getFactoryContract(address, signer);
    return contract.getPair(tokenA, tokenB);
}