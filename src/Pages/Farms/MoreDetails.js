import {Box, Link, Zoom} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import {ethers} from "ethers";
import eToNumber from "../../utils/number.utils";

const MoreDetails = ({farm,expended, totalStaked, decimals  }) => {
    /*
    ethers.utils.formatUnits(totalStaked?.stakedAmount, decimals)
     */
    return (
        <Box>
            {expended && <Zoom in={expended}>
                <Box
                    sx={{width: '100%'}}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Box sx={{flex: 1}}>
                            <p

                            >
                                Total Staked
                            </p>
                        </Box>
                        <Box>
                            <p>
                                {totalStaked?.stakedAmount ? eToNumber(ethers.utils.formatUnits(totalStaked?.stakedAmount, decimals), 2) : '0.00' } $POWP
                            </p>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            flexDirection: 'row'
                        }}
                    >
                        <Link color={'#fff'}
                              href={
                                  farm?.token?.isLp ?
                                      `https://app.uniwswap.com/#/add/${farm?.token?.composition[0]}/${farm.token?.composition[1]}` :
                                      `https://app.uniwswap.com/#/swap?outputCurrency=${farm.token?.address}`
                              } target={"_blank"}>
                            Get {farm?.token?.symbol}{" "}
                            <LogoutIcon sx={{
                                fontSize: '0.8rem',
                            }
                            }/>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            flexDirection: 'row'
                        }}
                    >
                        <Link color={'#fff'}
                              href={`https://www.oklink.com/en/ethw/token/${farm.token.address}`}
                              target={"_blank"}>
                            View Contract {" "}
                            <LogoutIcon sx={{
                                fontSize: '0.8rem',
                            }
                            }/>
                        </Link>
                    </Box>
                </Box>
            </Zoom>}
        </Box>
    )
}

export default MoreDetails