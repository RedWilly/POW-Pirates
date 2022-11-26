import erc20ABI from './abi/erc20.json';
import getContract from "./getContract";

/**
 *
 * @param address
 * @param signer
 * @returns {*}
 */
const getERC20Contract = (address, signer) => {
    return getContract(erc20ABI, address, signer);
}
/**
 *
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getERC20TotalSupply = async (address, signer) => {
    const contract = getERC20Contract(address, signer);
    return contract.totalSupply();
}
/**
 * @param address
 * @param signer
 * @param user
 * @returns {Promise<*>}
 */
export const getERC20Balance = async (address, signer, user) => {
    if(!user) throw new Error("getERC20Balance: user is required");
    const contract = getERC20Contract(address, signer);
    return contract.balanceOf(user);
}
/**
 *
 * @param address
 * @param signer
 * @param owner
 * @param spender
 * @returns {Promise<*>}
 */
export const getERC20Allowance = async (address, signer, owner, spender) => {
    const contract = getERC20Contract(address, signer);
    return contract.allowance(owner, spender);
}
/**
 *
 * @param address
 * @param signer
 * @param spender
 * @param amount
 * @returns {Promise<void>}
 */
export const approveERC20 = async (address, signer, spender, amount) => {
    const contract = getERC20Contract(address, signer);
    return contract.approve(spender, amount);
}
/**
 *
 * @param address
 * @param signer
 * @param from
 * @param to
 * @param amount
 * @returns {Promise<*>}
 */
export const transferFromERC20 = async (address, signer, from, to, amount) => {
    const contract = getERC20Contract(address, signer);
    return contract.transferFrom(from, to, amount);
}
/**
 *
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getERC20Name = async (address, signer) => {
    const contract = getERC20Contract(address, signer);
    return contract.name();
}
/**
 *
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getERC20Symbol = async (address, signer) => {
    const contract = getERC20Contract(address, signer);
    return contract.symbol();
}
/**
 *
 * @param address
 * @param signer
 * @returns {Promise<*>}
 */
export const getERC20Decimals = async (address, signer) => {
    const contract = getERC20Contract(address, signer);
    return contract.decimals();
}