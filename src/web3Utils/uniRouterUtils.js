import routerABi from './abi/router.json';
import getContract from "./getContract";
import {SimpleRpcProvider} from "./SimpleRpcProvider";

export const getRouterContract = (address, signer) => {
    const signerOrProvider = signer || SimpleRpcProvider;
    return getContract(routerABi, address, signerOrProvider);
}