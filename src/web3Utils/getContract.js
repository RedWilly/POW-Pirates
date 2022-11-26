import {ethers} from "ethers";
import {SimpleRpcProvider} from "./SimpleRpcProvider";

export default function getContract(abi , address, signer) {
    const signerOrProvider = signer || SimpleRpcProvider;
    return new ethers.Contract(address, abi, signerOrProvider);
}