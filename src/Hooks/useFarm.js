import useFarmsGlobal from "./useFarmsGlobal";
import {useQuery, useQueryClient} from "react-query";
import {
    farmDeposit,
    farmWithdraw,
    getFarmPendingReward,
    getFarmPoolInfo,
    getFarmUserInfo
} from "../web3Utils/farmUtils";
import {SimpleRpcProvider} from "../web3Utils/SimpleRpcProvider";
import {useEffect, useState} from "react";

const useFarm = ({farmAddress,pid,account}) => {
    const [yearlyRewards, setYearlyRewards] = useState();
    const queryClient = useQueryClient();

    const farms = useFarmsGlobal({address: farmAddress});

    const poolInfo = useQuery(['farms',farmAddress, pid, 'allocationPoint'], async () => {
            const poolinf = await  getFarmPoolInfo(farmAddress, SimpleRpcProvider, pid);
            console.log('poolinf',poolinf);
            return {
                lpToken: poolinf[0],
                allocPoint: poolinf[1],
                lastRewardBlock: poolinf[2],
                accERC20PerShare: poolinf[3],
                stakedAmount: poolinf[4],
            };
    });

    const userInfo = useQuery(['farms',farmAddress, pid, 'userInfo'], async () => {
        const userInf = await getFarmUserInfo(farmAddress, SimpleRpcProvider, pid, account);
        return {
            amount: userInf[0],
            rewardDebt: userInf[1]
        };
    });

    const pending = useQuery(['farms',farmAddress, pid, 'pending'], async () => {
        return getFarmPendingReward(farmAddress, SimpleRpcProvider, pid, account);
    });


    useEffect(() => {
        if(!!poolInfo?.data && !!farms.totalAllocPoint?.data && (!!farms.rewardsPerBlock.data)){
            if(farms.totalAllocPoint?.data == 0) return 0;
            const blockTime = 13;
            const blocksPerYear = 60 * 60 * 24 * 365 / blockTime;
            const yearR = farms.rewardsPerBlock?.data * blocksPerYear / farms.totalAllocPoint?.data;
            setYearlyRewards(yearR);
        }
    },[poolInfo?.data,farms.totalAllocPoint?.data,farms.rewardsPerBlock.data]);


    const stake = async (_signer, amount) => {
        const tx = await farmDeposit(farmAddress, _signer, pid, amount);
        await tx.wait();
        await poolInfo.refetch();
        await userInfo.refetch();
        await pending.refetch();
        console.log('farms.rewardToken?.data',farms.rewardToken?.data);
        await queryClient.refetchQueries(['erc20',farms.rewardToken?.data,'balance']);
    }

    const withdraw = async (_signer, amount) => {
        const tx = await farmWithdraw(farmAddress, _signer, pid, amount);
        await tx.wait();
        await poolInfo.refetch();
        await userInfo.refetch();
        await pending.refetch();
        await queryClient.refetchQueries(['erc20',farms.rewardToken?.data,'balance']);
    }

    return {
        poolInfo, userInfo, pending, yearlyRewards,stake,withdraw
    }
}

export default useFarm;