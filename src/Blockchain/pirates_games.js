const PiratesGamesContract = {
  address: "0xDB29585f8414d138391B80f1b39999497ee9C5b1",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_piratesTokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "gameResult",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "betId",
          type: "uint256",
        },
      ],
      name: "Coin",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "gameResult",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "betId",
          type: "uint256",
        },
      ],
      name: "Dice",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "getContractTokenBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_betId",
          type: "uint256",
        },
      ],
      name: "getUserBets",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "game",
              type: "string",
            },
            {
              internalType: "contract IERC20",
              name: "betToken",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "betAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "betValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "betValue_actual",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "result",
              type: "bool",
            },
          ],
          internalType: "struct PiratesGames.UserBet",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rollDice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "_userSelectedNumber",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "_betAmount",
          type: "uint256",
        },
      ],
      name: "startCoinGame",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "_userSelectedNumber",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "_betAmount",
          type: "uint256",
        },
      ],
      name: "startDiceGame",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "tossCoin",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "userBets",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "game",
          type: "string",
        },
        {
          internalType: "contract IERC20",
          name: "betToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "betAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "betValue",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "betValue_actual",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "result",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export default PiratesGamesContract;
