import {useQuery} from "react-query";
import {
    getFarmEndBlock,
    getFarmIsPaused,
    getFarmPoolInfo, getFarmPoolLength, getFarmRewardPerBlock, getFarmRewardToken,
    getFarmStartBlock,
    getFarmTotalAllocPoint
} from "../web3Utils/farmUtils";
import {SimpleRpcProvider} from "../web3Utils/SimpleRpcProvider";

/**
 * @param address
 * @param signer
 * @returns {{isPaused: UseQueryResult<*, unknown>, startBlock: UseQueryResult<number, unknown>, poolLength: UseQueryResult<number, unknown>, rewardsPerBlock: UseQueryResult<*, unknown>, totalAllocPoint: UseQueryResult<number, unknown>, endBlock: UseQueryResult<number, unknown>}}
 */
const useFarmsGlobal = ({address, signer}) => {
    const poolLength = useQuery(['farms',address, 'length'], async () => {
        const length = await getFarmPoolLength(address, signer|| SimpleRpcProvider);
        return length;
    });

    const totalAllocPoint = useQuery(['farms',address, 'totalAllocPoint'], async () => {
        const totalAllocPoint = await getFarmTotalAllocPoint(address, signer|| SimpleRpcProvider);
        return Number(totalAllocPoint);
    });

    const startBlock = useQuery(['farms',address, 'startBlock'], async () => {
        const startBlock = await getFarmStartBlock(address, signer|| SimpleRpcProvider);
        return Number(startBlock);
    });

    const endBlock = useQuery(['farms',address, 'endBlock'], async () => {
        const endBlock = await getFarmEndBlock(address, signer|| SimpleRpcProvider);
        return Number(endBlock);
    });

    const isPaused = useQuery(['farms',address, 'isPaused'], async () => {
        return getFarmIsPaused(address, signer || SimpleRpcProvider);
    });

    const rewardsPerBlock = useQuery(['farms',address, 'rewardsPerBlock'], async () => {
        return getFarmRewardPerBlock(address, signer || SimpleRpcProvider);
    });

    const rewardToken = useQuery(['farms',address, 'rewardToken'], async () => {
        return getFarmRewardToken(address, signer || SimpleRpcProvider);
    });

    const blockNumber = useQuery(['farms',address, 'blockNumber'], async () => {
        return SimpleRpcProvider.getBlockNumber();
    });

    return {
        poolLength, totalAllocPoint, startBlock, endBlock, isPaused, rewardsPerBlock,rewardToken,blockNumber
    }
}

export default useFarmsGlobal;