const ERC20 = artifacts.require("ERC20Mock");
const ERC202 = artifacts.require("ERC20Mock");
const LP = artifacts.require('LPMock');
const DeflationToken = artifacts.require('DeflationERC20Mock');
const Farm = artifacts.require("POWFarm.sol");
const allConfigs = require("../configFarm.json");
let zero = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network, addresses) {
    if (network == 'polygon' || network == 'avax' || network == 'kovan') {
        deployer.deploy(
            Farm,
            zero,
            0,
            0,
            zero
        ); // can be initialized later
    } else if (network !== 'development' && network !== 'polygon' && network !== 'bsc' && network !== 'main' && network !== 'avax') {
        await deployer.deploy(
            ERC20,
            "POWP Mock Token",
            "POWP",
            web3.utils.toBN("1000000000000000000000000000")
        );

        await deployer.deploy(
            LP,
            "WETHW Mock Token",
            "WETHW"
        );
        const erc20 = await ERC20.deployed();
        const erc202 = await LP.deployed();
        deployer.deploy(
            Farm,
            erc20.address,
            0,
            0,
            zero
        ); // can be initialized later
    } else {
        // development deployment
        const config = allConfigs[network.replace(/-fork$/, '')] || allConfigs.default;
        if (!config) {
            return;
        }

        const erc20 = config.erc20;

        let deploy = deployer;

        if (!erc20.address) {
            deploy = deploy
                .then(() => {
                    return deployer.deploy(
                        ERC20,
                        erc20.name,
                        erc20.symbol,
                        web3.utils.toBN(erc20.supply)
                    );
                })
                .then(() => {
                    return ERC20.deployed();
                });
        }

        deploy = deploy
            .then(() => {
                return web3.eth.getBlockNumber();
            })
            .then((currentBlock) => {
                const startBlock = config.startBlock
                    || web3.utils.toBN(currentBlock).add(web3.utils.toBN(config.delay));
                return deployer.deploy(
                    Farm,
                    erc20.address || ERC20.address,
                    web3.utils.toBN(config.rewardPerBlock),
                    startBlock,
                    addresses[0]
                );
            });

        if (config.fund) {
            deploy = deploy
                .then(() => {
                    return erc20.address
                        ? ERC20.at(erc20.address)
                        : ERC20.deployed();
                })
                .then((erc20Instance) => {
                    return erc20Instance.approve(Farm.address, web3.utils.toBN(config.fund));
                })
                .then(() => {
                    return Farm.deployed();
                })
                .then((farmInstance) => {
                    return farmInstance.fund(web3.utils.toBN(config.fund));
                });
        }

        config.lp.forEach((token) => {
            if (!token.address) {
                deploy = deploy
                    .then(() => {
                        return deployer.deploy(
                            LP,
                            token.name,
                            token.symbol,
                        );
                    })
                    .then(() => {
                        return LP.deployed();
                    })
                    .then((lpInstance) => {
                        const amount = web3.utils.toBN(10).pow(web3.utils.toBN(token.decimals))
                            .mul(web3.utils.toBN(1000));

                        const promises = addresses.map((address) => {
                            return lpInstance.mint(address, amount);
                        });

                        return Promise.all(promises);
                    });
            }

            deploy = deploy
                .then(() => {
                    return Farm.deployed();
                })
                //uint256 _allocPoint, IERC20 _lpToken, uint256 _withdrawFee, uint256 _claimFee 
                .then((farmInstance) => {
                    return farmInstance.add(
                        token.allocPoint,
                        token.address || LP.address,
                        0,
                        0
                    );
                });
        });

        return deploy;
    }

};

