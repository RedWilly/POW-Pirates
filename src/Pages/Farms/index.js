import {Navbar} from "../../Components"
import './index.css';
import '../../Components/Header/Stars.css'
import Paper from "@mui/material/Paper";
import {Alert, Box, Button, createTheme, Link, Skeleton, ThemeProvider, Zoom} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, {useContext, useEffect, useState} from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import usePair from "../../Hooks/usePair";
import configs from "../../web3Utils/configs";
import useERC20 from "../../Hooks/useERC20";
import {StateContext} from "../../Contexts/StateContext";
import {ethers} from "ethers";
import useFarmsGlobal from "../../Hooks/useFarmsGlobal";
import Loader from "../Loader";
import useFarm from "../../Hooks/useFarm";
import {yellow} from "@mui/material/colors";
import {toast, ToastContainer} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import {StakeDialog, UnStakeDialog} from "./Components";
import MoreDetails from "./MoreDetails";


const FarmsPage = () => {
    const theme = createTheme({
        dark: true,
        palette: {
            mode: 'dark',
            primary: {
                main: '#fe009c',
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        "&.Mui-disabled": {
                            //color: "red",
                        },
                        "&.MuiButton-containedPrimary": {
                            fontFamily: "Mark Pro",
                        },
                        "&.MuiButton-containedPrimary:hover": {
                            backgroundColor: '#fe009c',
                            boxShadow: "0 0 10px rgb(241 4 148 / 65%), 0 0 20px rgb(241 4 148 / 30%)",
                        }
                    }
                }
            }
        }
    });
    const stateContext = useContext(StateContext);
    const [validNetwork, setValidNetwork] = useState(false);
    useEffect(() => {
        setValidNetwork(Number(stateContext.currentNetwork) === Number(configs.chainId));
    }, [stateContext.currentNetwork])

    const farms = [
        {
            token: {
                name: "POWP",
                symbol: "POWP",
                address: "0xb82D7cd6710da0f2f5035c03ac596E2A9dA211f7",
                isLp: false,
                icon: '/images/_POWP.webp'
            },
        },
        {
            token: {
                name: "POW-WETH",
                symbol: "POW-WETH",
                address: "0x5D8741d2596dfd1815f22C15497F47D57F2b8CcF",
                isLp: true,
                composition: ['0xb82d7cd6710da0f2f5035c03ac596e2a9da211f7', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'],
                icon: '/images/POPW-ETHW.png'
            }
        }


    ]
    const farmsState = useFarmsGlobal({address: configs.farm});

    useEffect(() => {
        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, -100)

    }, [farmsState]);

    return (
        <ThemeProvider theme={theme}>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div style={{}}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="farmContainer">
                    <Navbar/>
                    <h1 style={{
                        color: '#BB86FC',
                        fontSize: '3rem',
                        fontWeight: 900,
                        WebkitTextStrokeWidth: '2px',
                        'WebkitTextStrokeColor': 'black',
                        textStroke: '2px black'
                    }}
                    >
                        POWP Farms
                    </h1>
                    <Box sx={{width: '100%', textAlign: 'center'}}>
                        {
                            !validNetwork && <Alert sx={{width: 365, margin: 'auto'}} severity={"error"}>
                                Wrong Network, please switch to {configs.networkName}
                            </Alert>
                        }

                        {farmsState.blockNumber?.data < farmsState.startBlock?.data && <Alert sx={{
                            backgroundColor: '#fff55', color: yellow[900]
                        }} variant={"outlined"} severity={"warning"}>
                            Farms not started yet - starts on block {farmsState.startBlock?.data}
                        </Alert>}
                        {
                            farmsState.startBlock?.data && farmsState.endBlock?.data && farmsState.startBlock?.data == farmsState.endBlock?.data &&
                            <Alert sx={{
                                backgroundColor: '#fff55', color: yellow[900]
                            }} variant={"outlined"} severity={"warning"}>
                                Farms not initialized yet
                            </Alert>
                        }
                        {!(farmsState.startBlock?.data == farmsState.endBlock?.data) && farmsState.blockNumber?.data > farmsState.endBlock?.data &&
                            <Alert sx={{
                                backgroundColor: '#fff55', color: yellow[900]
                            }} variant={"outlined"} severity={"warning"}>
                                Farms has ended and no longer distributing rewards please unstake your tokens
                            </Alert>}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 4,
                        }}
                    >
                        {
                            !!farmsState.poolLength?.data ? farms.map((item, index) => {
                                    return (
                                        <FarmCard key={index} farm={item} pid={index}/>)
                                }) :
                                <Loader/>
                        }
                    </Box>

                </div>
            </div>
        </ThemeProvider>
    )
}

export default FarmsPage


export const FarmCard = ({farm, pid}) => {
    const [expended, setExpended] = useState(false);
    const [stakeOpen, setStakeOpen] = useState(false);
    const [unStakeOpen, setUnStakeOpen] = useState(false);
    const [harvestBusy, setHarvestBusy] = useState(false);
    const stateContext = useContext(StateContext);
    const [tokenPrice, setTokenPrice] = useState(null);
    const [apy, setApy] = useState(null);
    const pair = usePair({address: farm?.token?.isLp ? farm?.token?.address : undefined});
    const farms = useFarmsGlobal({address: configs.farm});
    const farmData = useFarm({
        farmAddress: configs.farm,
        pid: pid,
        account: stateContext.currentAccount
    });
    const token = useERC20({
        tokenAddress: farm?.token?.address,
        account: stateContext?.currentAccount,
        allowancesSpenders: [configs.farm]
    });
    const [validNetwork, setValidNetwork] = useState(false);
    useEffect(() => {
        setValidNetwork(Number(stateContext.currentNetwork) === Number(configs.chainId));
    }, [stateContext.currentNetwork])
    useEffect(() => {
        if (!stakeOpen && !token.balance?.isFetching) {
            token?.balance?.refetch();
        }
    }, [stakeOpen])


    useEffect(() => {

        if (farm.isLp && pair.priceLpInToken0 && pair.priceLpInToken1 && farms.rewardToken?.data) {
            const rewardToken = farms.rewardToken?.data;
            if (rewardToken) {
                if (rewardToken == pair.token0?.data) {
                    setTokenPrice(pair.priceLpInToken0)
                } else if (rewardToken == pair.token1?.data) {
                    setTokenPrice(pair.priceLpInToken1)
                } else {
                    setTokenPrice(1)
                }
            }
        } else if (!farm.isLp) {
            setTokenPrice(1)
        }
    }, [pair.priceLpInToken0, pair.priceLpInToken1, farms.rewardToken?.data, farm.token.isLp]);

    useEffect(() => {
        if (
            tokenPrice && (farmData.yearlyRewards || farmData.yearlyRewards == 0) && farmData.poolInfo?.data?.stakedAmount
        ) {

            const stakeValue = tokenPrice * farmData.poolInfo?.data?.stakedAmount;
            if (stakeValue > 0) {
                const _apy = (farmData.yearlyRewards / stakeValue) * 100;
                setApy(_apy);
            } else {
                setApy(500);
            }
        }
    }, [tokenPrice, farmData.yearlyRewards, farmData.poolInfo?.data?.stakedAmount]);

    const [approvedBusy, setApprovedBusy] = useState(false);
    const handleEnable = async () => {
        setApprovedBusy(true)
        const signer = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum).getSigner() : null;
        await token.approve(signer, configs.farm, ethers.constants.MaxUint256).then((tx) => {
            toast.success('Approved');
        }).catch((err) => {
            toast.error(err.message);
        }).finally(
            () => {
                setApprovedBusy(false)
            }
        );
    }

    const handleStake = async (amount) => {
        setStakeOpen(true);
    }

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                background: 'rgba(47,26,81,0.52)',
                color: 'white',
                width: 352,
                backdropFilter: 'blur(5px)',
                border: "1px solid rgba( 255,255,255,0.18 )",
                borderRadius: 2,
                alignSelf: 'baseline',
            }}
        >
            {
                farmData.userInfo?.data?.amount && unStakeOpen &&
                <UnStakeDialog balance={farmData.userInfo?.data?.amount} setOpen={setUnStakeOpen}
                               decimals={token?.decimals?.data} open={unStakeOpen} withdraw={farmData.withdraw}/>
            }
            {
                stakeOpen &&
                <StakeDialog balance={token.balance?.data} open={stakeOpen} setOpen={setStakeOpen}
                             decimals={token.decimals?.data} deposit={farmData.stake}/>
            }
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <h2
                    >
                        Earn POW
                    </h2>
                    <Box
                        sx={{
                            fontWeight: 400,
                            fontFamily: 'Circular Std Book',
                        }}
                    >
                        Stake {farm?.token?.symbol || token.symbol?.data}
                    </Box>
                </Box>
                <Box>
                    <img src={farm?.token?.icon} alt="egg" width={farm?.token?.isLp ? 81 : 64}
                         height={farm?.token?.isLp ? 64 : 64}/>
                </Box>
            </Box>

            <Box sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Box>
                    <b>APR:</b>
                </Box>
                <Box>
                    {apy ? apy.toFixed(2) : 'Loading...'}%
                </Box>
            </Box>
            <Box sx={{
                mt: 2
            }}>
                <h3
                    style={{
                        lineHeight: '1em'
                    }}
                >POWP <span style={{color: "#fe009c"}}>Earned</span></h3>
                <h1 style={{
                    paddingTop: 0,
                    lineHeight: '1.3em'
                }}>{farmData.pending?.data ? formatLongNumber(farmData.pending?.data / 10 ** 18, 4) + ' $POWP' :
                    stateContext.currentAccount ? <Skeleton/> : '0.00'}</h1>
                {<Button
                    disabled={farmData.pending?.data == 0 || harvestBusy || !stateContext.currentAccount || !validNetwork}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#fe009c',
                        borderRadius: '5px',
                        fontSize: '1.1rem',
                        //p: 1,
                        '&:hover': {
                            backgroundColor: '#fe009c',
                            boxShadow: "0 0 10px rgb(241 4 148 / 65%), 0 0 20px rgb(241 4 148 / 30%)",
                        },
                        '&:disabled': {
                            color: 'gray'
                        }
                    }}
                    fullWidth
                    variant={"contained"}
                    onClick={async () => {
                        setHarvestBusy(true);
                        const signer = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum).getSigner() : null;
                        await farmData.withdraw(signer, 0).finally(() => {
                            setHarvestBusy(false);
                            toast.success('Harvested');
                        });
                    }}
                >
                    {harvestBusy ? <CircularProgress sx={{mr: 2}} size={24} color="secondary"/> : ''}
                    Harvest
                </Button>}
            </Box>
            <Box
                sx={{marginTop: 0}}
            >
                {/*<Typography
                            variant={"subtitle1"}
                            sx={{fontSize: '0.8rem', marginLeft: 1}}
                        >
                            STAKE {" "}
                            <span style={{color: '#fe009c', fontWeight: "bold"}}>
                            $POWP
                        </span>
                        </Typography>*/}
                <Box sx={{minHeight: '35px'}}>

                    {
                        token.allowances?.data && token.allowances?.data[configs.farm] == 0 && <Button
                            sx={{
                                mt: 2,
                                backgroundColor: '#fe009c',
                                borderRadius: '5px',
                                //p: 1,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    backgroundColor: '#fe009c',
                                    boxShadow: "0 0 10px rgb(241 4 148 / 65%), 0 0 20px rgb(241 4 148 / 30%)",
                                },
                                '&:disabled': {
                                    color: 'gray'
                                }
                            }}
                            fullWidth
                            variant={"contained"}
                            disabled={!stateContext?.currentAccount || approvedBusy || !validNetwork}
                            onClick={handleEnable}
                        >
                            {(approvedBusy || token.allowances?.isFetching) &&
                                <CircularProgress sx={{color: 'gray', mr: 2}} size={24}/>} Enable Contract
                        </Button>}
                    {
                        ((token.allowances?.data && token.allowances?.data[configs.farm] > 0) || !token.allowances?.data) &&
                        <Button
                            sx={{
                                m: 0,
                                mt: 2,
                                backgroundColor: '#fe009c',
                                borderRadius: '5px',
                                //p: 1,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    backgroundColor: '#fe009c',
                                    boxShadow: "0 0 10px rgb(241 4 148 / 65%), 0 0 20px rgb(241 4 148 / 30%)",
                                },
                                '&:disabled': {
                                    color: 'gray'
                                }
                            }}
                            fullWidth
                            variant={"contained"}
                            disabled={!stateContext?.currentAccount || approvedBusy || !token.allowances?.data || token.balance?.data == 0 || !validNetwork}
                            onClick={handleStake}
                        >
                            Stake
                        </Button>
                    }
                </Box>
                {
                    <Button
                        sx={{
                            m: 0,
                            mt: 2,
                            backgroundColor: '#fe009c',
                            borderRadius: '5px',
                            //p: 1,
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#fe009c',
                                boxShadow: "0 0 10px rgb(241 4 148 / 65%), 0 0 20px rgb(241 4 148 / 30%)",
                            },
                            '&:disabled': {
                                color: 'gray'
                            }
                        }}
                        fullWidth
                        variant={"contained"}
                        disabled={!farmData.userInfo?.data || !stateContext?.currentAccount || approvedBusy || farmData.userInfo?.data?.amount == 0 || !validNetwork}
                        onClick={() => {
                            setUnStakeOpen(true)
                        }}
                    >
                        Unstake
                    </Button>
                }
            </Box>
            {/*  More details expandable  */}
            <Box
                sx={{
                    mt: 3,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                }}>
                    <Typography
                        component={Button}
                        sx={{
                            color: '#fff',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setExpended(!expended)}
                    >
                        {expended ? "Hide " : "Details "} {expended ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                    </Typography>
                </Box>
                <MoreDetails expended={expended} farm={farm} decimals={token.decimals?.data}
                             totalStaked={farmData.poolInfo?.data}/>
            </Box>
        </Paper>
    )
}

function formatMoneyNumber(number, decimals = 3) {
    if (number === 0) return 0;
    if (!number) return null;
    number = Number(number);
    return new Intl.NumberFormat('en-US', { /*maximumSignificantDigits: 30*/}).format(number.toFixed(decimals));
}

export const formatLongNumber = (n, decimals = 2) => {
    if (!n) return 0;
    n = Number(n);
    if (n < 1e3) return +n.toFixed(decimals);
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(decimals) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(decimals) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(decimals) + "B";
    if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(decimals) + "T";
    if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(decimals) + "Q";
    if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(decimals) + "Qi";
    if (n >= 1e21 && n < 1e24) return +(n / 1e21).toFixed(decimals) + "Sx";
    if (n >= 1e24 && n < 1e27) return +(n / 1e24).toFixed(decimals) + "Sp";
    if (n >= 1e27 && n < 1e30) return +(n / 1e27).toFixed(decimals) + "Oc";
    if (n >= 1e30 && n < 1e33) return +(n / 1e30).toFixed(decimals) + "No";
    if (n >= 1e33 && n < 1e36) return +(n / 1e33).toFixed(decimals) + "Dc";
    if (n >= 1e36 && n < 1e39) return +(n / 1e36).toFixed(decimals) + "Ud";
    if (n >= 1e39 && n < 1e42) return +(n / 1e39).toFixed(decimals) + "Dd";
    if (n >= 1e42 && n < 1e45) return +(n / 1e42).toFixed(decimals) + "Td";
    if (n >= 1e45 && n < 1e48) return +(n / 1e45).toFixed(decimals) + "Qd";
    if (n >= 1e48) return +(n / 1e48).toFixed(decimals) + "Qid";
};