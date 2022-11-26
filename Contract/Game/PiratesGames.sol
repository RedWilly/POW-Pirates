// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiratesGames is Ownable {
    IERC20 piratesToken;
    uint256 counter1 = 0;
    uint256 counter2 = 10;

    mapping(address => UserBet[]) public userBets;

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
        uint256 dice = (randomNumber % 20) + 1;

        if (dice >= 10 && dice <= 20) {
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
            dice = (_randomNumber % 20) + 1;
        }
        return dice;
    }

    function tossCoin() public view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    msg.sender,
                    counter1,
                    counter2
                )
            )
        );
        uint256 coin = randomNumber % 2;
        return coin;
    }

    function startCoinGame(uint8 _userSelectedNumber, uint256 _betAmount)
        public
    {
        uint256 coin = tossCoin();

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

            emit Coin(true, userBetId);
        } else {
            // User Lose
            IERC20(piratesToken).transferFrom(
                msg.sender,
                address(this),
                _betAmount
            );

            uint256 userBetId = userBets[msg.sender].length + 1;

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

            counter1++;

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
