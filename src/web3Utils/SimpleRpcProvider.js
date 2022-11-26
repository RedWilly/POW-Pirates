import {ethers} from 'ethers';
import configs from "./configs";

export const SimpleRpcProvider = new ethers.providers.JsonRpcProvider(
    configs.rpcURL
);