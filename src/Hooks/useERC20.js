import {StateContext} from "../Contexts/StateContext";
import {useContext} from "react";
import {ethers} from "ethers";
import {
    approveERC20,
    getERC20Allowance,
    getERC20Balance,
    getERC20Decimals,
    getERC20Name,
    getERC20Symbol
} from "../web3Utils/erc20Utils";
import {useQuery, useQueryClient} from "react-query";
import {SimpleRpcProvider} from "../web3Utils/SimpleRpcProvider";

const useERC20 = ({tokenAddress, allowancesSpenders, account , signer}) => {
    const queryClient = useQueryClient();

    const balance = useQuery(['erc20',tokenAddress,'balance'], async () => {
        return await getERC20Balance(tokenAddress, signer || SimpleRpcProvider, account);
    },{enabled: !!account});

    const decimals = useQuery(['erc20',tokenAddress,'decimals'], async () => {
        return await getERC20Decimals(tokenAddress, signer || SimpleRpcProvider);
    });

    const allowances = useQuery(['erc20',tokenAddress,'allowances'], async () => {
        const _allowances = {};
        for(let spender of allowancesSpenders){
            _allowances[spender] = await getERC20Allowance(tokenAddress, signer || SimpleRpcProvider, account, spender);
        }
        return _allowances;
    },{
        enabled: !!account && !!allowancesSpenders && allowancesSpenders.length > 0,
    });

    const name = useQuery(['erc20',tokenAddress,'name'], async () => {
        return await getERC20Name(tokenAddress, signer || SimpleRpcProvider);
    });

    const symbol = useQuery(['erc20',tokenAddress,'symbol'], async () => {
        return await getERC20Symbol(tokenAddress, signer || SimpleRpcProvider);
    });


    const approve = async (signerArg, spender, amount) => {
        const tx = await approveERC20(tokenAddress, signerArg, spender, amount);
        await tx.wait();
        //await allowances.refetch();
        await queryClient.invalidateQueries(['erc20',tokenAddress,'allowances']);
    }



    return {
        balance,decimals,allowances,name,symbol,approve
    };
}

export default useERC20;