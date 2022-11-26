import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import pirates_token_contract from "../Blockchain/pirates_token";
import pirates_games_contract from "../Blockchain/pirates_games";
import Swal from "sweetalert2";

import { isMobile } from "react-device-detect";
import axios from "axios";
import useAxios from "axios-hooks";

export const BlockchainContext = createContext();

const { ethereum } = window;

const getProvider = () => {
  return new ethers.providers.Web3Provider(ethereum);
};

const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};

// returns promise
const getSignerAddress = () => {
  const provider = getProvider();
  return provider.getSigner().getAddress();
};

const getCurrentNetwork = () => {
  const provider = getProvider();
  return provider.getNetwork();
};

// returns Promise
const getNetworkChainId = async () => {
  const network = await getCurrentNetwork();
  return network.chainId;
};

export const BlockchainContextProvider = (props) => {
  const [currentSigner, setCurrentSigner] = useState("");
  const [currentSignerAddress, setCurrentSignerAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount(); // Event is registered in background
  }, []);

  async function listenMMAccount() {
    ethereum.on("accountsChanged", async function () {
      window.location.reload();
    });

    ethereum.on("chainChanged", (currentChainId) => {
      window.location.reload();
    });
  }

  const checkIfWalletIsConnected = async () => {
    try {
      //   if (isMobile) {
      //     if (!window.ethereum) {
      //       window.open("APP URL");
      //     }
      //   }
      const accounts = await ethereum.request({ method: "eth_accounts" });

      // Check Network
      // const chainId = await getNetworkChainId();
      // if (chainId !== 4690) {
      //   alert("Please Change Network to Iotex Mainnet!");
      //   return;
      // }

      if (accounts.length) {
        // Set Current Signer
        const signer = getSigner();
        setCurrentSigner(signer);

        // Set Current Signer Address
        const signerAddress = await getSignerAddress();
        setCurrentSignerAddress(signerAddress);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      // Check for Mobile

      //   if (isMobile) {
      //     if (!window.ethereum) {
      //       window.open(
      //         "https://metamask.app.link/dapp/elegant-starlight-536201.netlify.app/"
      //       );
      //     }
      //   }

      if (!ethereum) return alert("Please install Metamask");
      // Request Metamask for accounts
      await ethereum.request({ method: "eth_requestAccounts" });

      // Check Network
      // const chainId = await getNetworkChainId();
      // if (chainId !== 4690) {
      //   alert("Please Change Network to Iotex Mainnet");
      //   return;
      // }

      // Set Current Signer
      const signer = getSigner();
      setCurrentSigner(signer);

      // Set Current Signer Address
      const signerAddress = await getSignerAddress();
      setCurrentSignerAddress(signerAddress);
    } catch (error) {
      alert(error.data.message);

      throw new Error("No Ethereum Object");
    }
  };

  /* 
  * -------------------------------------------
            Functions
  * -------------------------------------------
  */

  const getUserMaxTokens = async () => {
    try {
      const piratesTokenContract = new ethers.Contract(
        pirates_token_contract.address,
        pirates_token_contract.abi,
        currentSigner
      );

      const maxTokens = await piratesTokenContract.balanceOf(
        currentSignerAddress
      );
      return maxTokens;
    } catch (error) {
      console.log(error);
    }
  };

  // Coin Game
  const startCoinGame = async (props) => {
    if (props.betvalue === 0) {
      alert("Please Enter Bet Amount!");
      return;
    }
    setLoading(true);

    const betAmount = ethers.utils.parseEther(props.betvalue.toString());
    let userSelectedNumber;

    if (props.betoption === "POW") {
      userSelectedNumber = 0;
    } else if (props.betoption === "PIRATES") {
      userSelectedNumber = 1;
    }

    const piratesGamesContract = new ethers.Contract(
      pirates_games_contract.address,
      pirates_games_contract.abi,
      currentSigner
    );

    const piratesTokenContract = new ethers.Contract(
      pirates_token_contract.address,
      pirates_token_contract.abi,
      currentSigner
    );

    try {
      const status = await piratesGamesContract.userApprovalStatus(
        currentSignerAddress
      );

      if (!status) {
        let approve_amount =
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"; //(2^256 - 1 )
        const tx1 = await piratesTokenContract.approve(
          pirates_games_contract.address,
          approve_amount
        );

        await tx1.wait();

        const tx_11 = await piratesGamesContract.setApprovalStatus(
          currentSignerAddress
        );

        await tx_11.wait();
      }

      // Start Game
      const tx2 = await piratesGamesContract.startCoinGame(
        userSelectedNumber,
        betAmount,
        {
          gasLimit: 3000000,
        }
      );

      const receipt = await tx2.wait();
      let eventIndex = null;

      receipt.events.forEach((event, i) => {
        if (event.event === "Coin") {
          eventIndex = i;
        }
      });

      const CoinEvent = receipt.events[eventIndex];

      let _result = null;
      _result = CoinEvent.args[0];
      const betId = CoinEvent.args[1];

      const betIdArrayIndex = betId - 1;
      const betInfo = await piratesGamesContract.getUserBets(
        currentSignerAddress,
        betIdArrayIndex
      );

      const betInfoDetail = {
        betAmount: ethers.utils.formatEther(betInfo.betAmount.toString()),
        betToken: betInfo.betToken,
        betValue: betInfo.betValue.toString(), // User Selected Side. 0 for POW and 1 for Pirates
        betValue_actual: betInfo.betValue_actual.toString(),
        game: betInfo.game,
        id: betInfo.id.toString(),
        result: betInfo.result,
      };

      setLoading(false);

      return {
        // result,
        result: _result,
        betInfoDetail,
      };
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.toString(),
      });
    }
  };

  // Dice Game
  const startDiceGame = async (props) => {
    if (props.betvalue === 0) {
      alert("Please Enter Bet Amount!");
      return;
    }
    setLoading(true);

    const betAmount = ethers.utils.parseEther(props.betvalue.toString());
    let userSelectedNumber = props.value;

    const piratesGamesContract = new ethers.Contract(
      pirates_games_contract.address,
      pirates_games_contract.abi,
      currentSigner
    );

    const piratesTokenContract = new ethers.Contract(
      pirates_token_contract.address,
      pirates_token_contract.abi,
      currentSigner
    );

    try {
      const status = await piratesGamesContract.userApprovalStatus(
        currentSignerAddress
      );

      if (!status) {
        let approve_amount =
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"; //(2^256 - 1 )
        const tx1 = await piratesTokenContract.approve(
          pirates_games_contract.address,
          approve_amount
        );

        await tx1.wait();

        const tx_11 = await piratesGamesContract.setApprovalStatus(
          currentSignerAddress
        );

        await tx_11.wait();
      }

      // Start Game
      const tx2 = await piratesGamesContract.startDiceGame(
        userSelectedNumber,
        betAmount,
        {
          gasLimit: 3000000,
        }
      );

      const receipt = await tx2.wait();
      let eventIndex = null;

      receipt.events.forEach((event, i) => {
        if (event.event === "Dice") {
          eventIndex = i;
        }
      });

      const CoinEvent = receipt.events[eventIndex];

      let _result = null;
      _result = CoinEvent.args[0];
      const betId = CoinEvent.args[1];

      const betIdArrayIndex = betId - 1;
      const betInfo = await piratesGamesContract.getUserBets(
        currentSignerAddress,
        betIdArrayIndex
      );

      const betInfoDetail = {
        betAmount: ethers.utils.formatEther(betInfo.betAmount.toString()),
        betToken: betInfo.betToken,
        betValue: betInfo.betValue.toString(), // User Selected Side. 0 for POW and 1 for Pirates
        betValue_actual: betInfo.betValue_actual.toString(),
        game: betInfo.game,
        id: betInfo.id.toString(),
        result: betInfo.result,
      };

      setLoading(false);

      console.log(betInfoDetail);
      return {
        // result,
        result: _result,
        betInfoDetail,
      };
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.toString(),
      });
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        currentSignerAddress,
        loading,
        startCoinGame,
        startDiceGame,
        getUserMaxTokens,
      }}
    >
      {props.children}
    </BlockchainContext.Provider>
  );
};
