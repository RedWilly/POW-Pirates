import getContract from "./getContract";
import farmABI from './abi/farm.json';
import {SimpleRpcProvider} from "./SimpleRpcProvider";

/**
 * @param address
 * @param signer
 * @returns {*}
 */
const getFarmContract = (address, signer) => {
    return getContract(farmABI, address, signer);
}
/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmStartBlock = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.startBlock();
}
/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmEndBlock = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.endBlock();
}
/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmRewardPerBlock = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.rewardPerBlock();
}

/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmTotalAllocPoint = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.totalAllocPoint();
}
/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmPoolLength = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.poolLength();
}

/**
 * @param address
 * @param signer
 * @param pid
 * @returns {Promise<*>}
 */
export const getFarmPoolInfo = async (address, signer, pid) => {
    const contract = getFarmContract(address, signer);
    return contract.poolInfo(pid);
}

/**
 * @param address
 * @param signer
 * @param pid
 * @param user
 * @returns {Promise<UserInfo<Buffer>|UserInfo<string>>}
 */
export const getFarmUserInfo = async (address, signer, pid, user) => {
    const contract = getFarmContract(address, signer);
    return contract.userInfo(pid, user);
}

/**
 * @param address
 * @param signer
 * @param pid
 * @param user
 * @returns {Promise<*>}
 */
export const getFarmPendingReward = async (address, signer, pid, user) => {
    const contract = getFarmContract(address, signer);
    return contract.pending(pid, user);
}
/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmRewardToken = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.rewardToken();
}

/**
 * @param address
 * @param signer
 * @param pid
 * @param amount
 * @returns {Promise<*>}
 */
export const farmDeposit = async (address, signer, pid, amount) => {
    if(!signer) throw new Error("signer is required");
    const contract = getFarmContract(address, signer);
    return contract.deposit(pid, amount);
}

/**
 * @param address
 * @param signer
 * @param pid
 * @param amount
 * @returns {Promise<*>}
 */
export const farmWithdraw = async (address, signer, pid, amount) => {
    if(!signer) throw new Error("signer is required");
    const contract = getFarmContract(address, signer);
    return contract.withdraw(pid, amount);
}

/**
 * @param address
 * @param signer
 * @param pid
 * @returns {Promise<*>}
 */
export const farmHarvest = async (address, signer, pid) => {
    if(!signer) throw new Error("signer is required");
    const contract = getFarmContract(address, signer);
    return contract.withdraw(pid , 0);
}

/**
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getFarmIsPaused = async (address, signer) => {
    const contract = getFarmContract(address, signer);
    return contract.paused();
}

export const initFarmContract = (address, signer) => {
    const contract =  getFarmContract(address, signer);
    return contract.callStatic.fund(100000000000);
}

export const getCurrentBlockNumber = async (signer) => {
    return SimpleRpcProvider.getBlockNumber();
}