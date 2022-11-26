import pairABI from './abi/pair.json';
import getContract from "./getContract";
import {SimpleRpcProvider} from "./SimpleRpcProvider";

export const getPairContract = (address, signer) => {
    if(!address) throw new Error("address is required");
    const signerOrProvider = signer || SimpleRpcProvider;
    return getContract(pairABI, address, signerOrProvider);
}

/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getPairReserves = async (address, signer) => {
    const contract = getPairContract(address, signer);
    return contract.getReserves();
}

export const getPairToken0 = async (address, signer) => {
    const contract = getPairContract(address, signer);
    return contract.token0();
}

export const getPairToken1 = async (address, signer) => {
    const contract = getPairContract(address, signer);
    return contract.token1();
}