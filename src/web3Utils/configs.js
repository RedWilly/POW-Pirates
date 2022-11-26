const configs = {
    chainId: 10001,
    chainName: "ETHW Mainnet",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
    rpcURL: 'https://mainnet.ethereumpow.org',
    blockExplorerUrls: "https://www.oklink.com/en/ethw",
    powpToken: {
        address: '0xb82d7cd6710da0f2f5035c03ac596e2a9da211f7',
        symbol: 'POWP',
        decimals: 18,
    },
    wethwToken: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        symbol: 'WETH',
        decimals: 18,
    },
    swapRouter: '0x633e494C22D163F798b25b0264b92Ac612645731',
    factory: '0xaBC4325bAD182076EAa5877c68437833d596D3Ee',
    farm: '0x3991a89546b3e2c33de056D0eD4797743Be62d13',

}

const configstest = {
    powpToken: {
        address: '0xb16109a4F40F13705E98a4AD4BC94aDeA1dd909d',
        symbol: 'POWP',
        decimals: 18,
    },
    wethwToken: {
        address: '0xDCB7223b45d38Dc2cdd57a70B16740aCa59d2799',
        symbol: 'WETH',
        decimals: 18,
    },
    swapRouter: "0x633e494C22D163F798b25b0264b92Ac612645731",
    factory: '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
    lpToken: '0x1030d7d89b0C86d832526EF94cE3dBE6667e721b',
    farm: '0x6F1911DF653816dc2f8Ce4431d0A1783aF4B97DB',
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97,
    networkName: "Binance Smart Chain Testnet",
}

export default configs;