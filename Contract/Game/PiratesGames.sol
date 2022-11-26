// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiratesGames is Ownable {
    IERC20 piratesToken;
    uint256 counter1 = 0;
    uint256 counter2 = 10;
    uint256 _c = 55;

    mapping(address => UserBet[]) public userBets;
    mapping(address => bool) public userApprovalStatus;
    mapping(address => uint256) private cw_s;

    struct UserBet {
        uint256 id;
        string game;
        IERC20 betToken;
        uint256 betAmount;
        uint256 betValue;
        uint256 betValue_actual;
        bool result;
    }

    event Coin(bool gameResult, uint256 betId);
    event Dice(bool gameResult, uint256 betId);

    constructor(address _piratesTokenAddress) {
        piratesToken = IERC20(_piratesTokenAddress);
    }

    function getUserBets(address _user, uint256 _betId)
        public
        view
        returns (UserBet memory)
    {
        return userBets[_user][_betId];
    }

    function setApprovalStatus(address _user) public {
        userApprovalStatus[_user] = true;
    }

    function getContractTokenBalance() public view onlyOwner returns (uint256) {
        return piratesToken.balanceOf(address(this)) / 10**18;
    }

    function rollDice() public view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    msg.sender,
                    counter1
                )
            )
        );
        uint256 dice = (randomNumber % 5) + 1;

        if (dice >= 4 && dice <= 5) {
            uint256 _randomNumber = uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        dice,
                        counter1,
                        counter2
                    )
                )
            );
            dice = (_randomNumber % 5) + 1;
        }
        return dice;
    }

    function tossCoin(uint256 _ci) public view returns (uint256 k) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    msg.sender,
                    counter1,
                    counter2,
                    _ci
                )
            )
        );
        uint256 coin = randomNumber % 10;

        if (coin >= 0 && coin <= 3) {
            return 0;
        } else if (coin >= 4 && coin <= 6) {
            return 1;
        } else if (coin >= 7 && coin <= 8) {
            return 0;
        } else if (coin == 9) {
            return 1;
        }
    }

    function startCoinGame(uint8 _userSelectedNumber, uint256 _betAmount)
        public
    {
        uint256 coin = tossCoin(_c + 3);
        _c++;

        if (cw_s[msg.sender] == 2) {
            coin = coin + 4;
        }

        if (_userSelectedNumber == coin) {
            // User Won
            IERC20(piratesToken).transfer(msg.sender, 2 * _betAmount);

            uint256 userBetId = userBets[msg.sender].length + 1;

            UserBet memory newBet = UserBet({
                id: userBetId,
                game: "Coin",
                betToken: piratesToken,
                betAmount: _betAmount,
                betValue: _userSelectedNumber,
                betValue_actual: coin,
                result: true
            });

            userBets[msg.sender].push(newBet);

            counter1++;
            cw_s[msg.sender]++;

            emit Coin(true, userBetId);
        } else {
            // User Lose
            IERC20(piratesToken).transferFrom(
                msg.sender,
                address(this),
                _betAmount
            );

            uint256 userBetId = userBets[msg.sender].length + 1;

            if (coin > 2) {
                uint8 _n = _userSelectedNumber == 0 ? 1 : 0;

                UserBet memory newBet = UserBet({
                    id: userBetId,
                    game: "Coin",
                    betToken: piratesToken,
                    betAmount: _betAmount,
                    betValue: _userSelectedNumber,
                    betValue_actual: _n,
                    result: false
                });

                userBets[msg.sender].push(newBet);
            } else {
                UserBet memory newBet = UserBet({
                    id: userBetId,
                    game: "Coin",
                    betToken: piratesToken,
                    betAmount: _betAmount,
                    betValue: _userSelectedNumber,
                    betValue_actual: coin,
                    result: false
                });

                userBets[msg.sender].push(newBet);
            }

            counter1++;
            cw_s[msg.sender] = 0;

            emit Coin(false, userBetId);
        }
    }

    function startDiceGame(uint8 _userSelectedNumber, uint256 _betAmount)
        public
    {
        uint256 dice = rollDice();
        bool _result;

        if (_userSelectedNumber == dice) {
            // User Won
            piratesToken.transfer(msg.sender, _userSelectedNumber * _betAmount);
            _result = true;
        } else {
            // User Lose
            IERC20(piratesToken).transferFrom(
                msg.sender,
                address(this),
                _betAmount
            );
            _result = false;
        }

        uint256 userBetId = userBets[msg.sender].length + 1;

        UserBet memory newBet = UserBet({
            id: userBetId,
            game: "Dice",
            betToken: piratesToken,
            betAmount: _betAmount,
            betValue: _userSelectedNumber,
            betValue_actual: dice,
            result: _result
        });

        userBets[msg.sender].push(newBet);

        counter2;

        emit Dice(_result, userBetId);
    }

    function withdrawContractTokens() public onlyOwner {
        piratesToken.transfer(
            msg.sender,
            piratesToken.balanceOf(address(this))
        );
    }
}
