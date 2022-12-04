import React, { useState, useEffect, useContext } from "react";
import "./cointoss.css";
import Logo from "../../Media/Logos/Logo_.png";
import { Link as Link_ } from "react-router-dom";
import styled from "styled-components";
import {
  GiPirateFlag,
  GiHamburgerMenu,
  GiSpeaker,
  GiSpeakerOff,
} from "react-icons/gi";
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { ImDatabase } from "react-icons/im";
import { MdOutlinePrivacyTip, MdOutlineZoomOutMap } from "react-icons/md";
import { FaFileContract } from "react-icons/fa";
import { RiMedalLine } from "react-icons/ri";
import pirateShip from "./GameAssets/island.png";
import moon from "./GameAssets/moon.png";
import cointoss from "./GameAssets/cointoss.jpg";
import coin from "./GameAssets/Binance-Coin-BNB-icon.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import powpirate from "../Games/GameAssets/POWP.png";
import song1 from "./GameAssets/mixkit-warping-slide-1531.wav";
import song2 from "./GameAssets/epic_battle_music_1-6275.mp3";
import ReactAudioPlayer from "react-audio-player";
import ReactHowler from "react-howler";
import Songs from "./Songs";
import { StateContext } from "../../Contexts/StateContext";
import SideNav from "./SideNav";
import Coin from "./Coin/Coin";
import { BlockchainContext } from "../../Contexts/BlockchainContext";
import Loader2 from "../../Components/Loader/Loader";
import Loader from "../Loader";
import Swal from "sweetalert2";
import { ethers } from "ethers";

const handleopen = () => {
  document.querySelector(".blackpage").classList.add("appear");
  document.querySelector(".game_side_menu").classList.add("open");
};
const handleLeave = () => {
  document.querySelector(".value_bubble").style.visibility = "hidden";
};
const handleclose = () => {
  document.querySelector(".blackpage").classList.remove("appear");
  document.querySelector(".game_side_menu").classList.remove("open");
};

const handleRange = (e, value, unmuted) => {
  // new Audio(song1).play()
  unmuted
    ? document.getElementById("song1").play()
    : document.getElementById("song1").pause();

  var newValue = ((value - e.target.min) / (e.target.max - e.target.min)) * 100;
  let width = document.querySelector(".slider").offsetWidth;
  let way = (newValue / 100) * width;
  console.log(way);
  document.querySelector(".value_bubble").style.left = `calc(28.3255px + ${
    way * 0.95
  }px )`;
  document.querySelector(".value_bubble").style.visibility = "visible";
  document.querySelector(
    ".slider"
  ).style.background = `linear-gradient(to right ,#fe009c 0% ,#fe009c ${newValue}% , #fff ${newValue}%,  #fff 100%)`;
};

const CoinToss = () => {
  const context = useContext(StateContext);
  const { gamesOpt, setgamesOpt } = context;
  const [value, changeValue] = useState(2);
  const [betvalue, setbetvalue] = useState(0);
  const [betoption, setbetoption] = useState("PIRATES");
  const [showoptions, setshowoptions] = useState(false);
  const [unmuted, setunmuted] = useState(true);
  const [unzoom, setunzoom] = useState(true);

  console.log(gamesOpt);

  const {
    connectWallet,
    currentSignerAddress,
    loading,
    startCoinGame,
    getUserMaxTokens,
  } = useContext(BlockchainContext);

  const maxHandler = async () => {
    let maxT = await getUserMaxTokens();
    maxT = ethers.utils.formatEther(maxT.toString());
    setbetvalue(maxT);
  };

  const startCoinGameHandler = async () => {
    const res = await startCoinGame({
      betoption,
      betvalue,
    });

    let betValue;
    let betValue_actual;

    if (res?.betInfoDetail.betValue === "0") {
      betValue = "POW";
    }

    if (res?.betInfoDetail.betValue === "1") {
      betValue = "PIRATES";
    }

    if (res?.betInfoDetail.betValue_actual === "0") {
      betValue_actual = "POW";
    }

    if (res?.betInfoDetail.betValue_actual === "1") {
      betValue_actual = "PIRATES";
    }

    var myTrackingContentWon = `<div class='col-md-2'><span>
      You Bet ID No.
      : 
      ${res?.betInfoDetail.id} <br/>

      Game
      : 
      ${res?.betInfoDetail.game} <br/>


      Bet Amount
      : 
      ${res?.betInfoDetail.betAmount} Pirates <br/>

      Amount Claimed
      : 
      ${res?.betInfoDetail.betAmount * 2} Pirates <br/>

      Your Selected Value
      : 
      ${betValue} <br/>

      Actual Value
      : 
      ${betValue_actual}  <br/>
      
      </span> </div>`;

    var myTrackingContentLost = `<div class='col-md-2'><span>
      You Bet ID No.
      : 
      ${res?.betInfoDetail.id} <br/>

      Game
      : 
      ${res?.betInfoDetail.game} <br/>


      Bet Amount
      : 
      ${res?.betInfoDetail.betAmount} Pirates <br/>

      Your Selected Value
      : 
      ${betValue} <br/>

      Actual Value
      : 
      ${betValue_actual}  <br/>
      </span> </div>`;

    if (res?.result) {
      // Won
      Swal.fire({
        icon: "success",
        title: "Congratulations You WON!",
        html:
          "<div class='row my_tracking_swal'>" +
          myTrackingContentWon +
          "</div>",
      });
    } else if (!res?.result) {
      // Lost
      Swal.fire({
        icon: "error",
        title: "Better Luck Next Time!",
        html:
          "<div class='row my_tracking_swal'>" +
          myTrackingContentLost +
          "</div>",
      });
    } else {
      // Error
    }
  };
  return (
    <div className="games_page">
      {/* <audio id="countdown"
      preload='true'
      autoplay
      loop
 src={song2} 
     /> */}
      <audio id="song1" src={song1} />

      <div className="blackpage" onClick={handleclose}>
        {" "}
      </div>
      <div className="games_container">
        <SideNav />
        <div className="game__scene">
          <div className="game_scene_nav">
            <div className="first_nav">
              <GiHamburgerMenu
                className="burger"
                onClick={handleopen}
                color="white"
                size={30}
              />
              <a href="https://app.uniwswap.com/#/swap?outputCurrency=0xb82d7cd6710da0f2f5035c03ac596e2a9da211f7" target="blank">
              <p className="buy_pirate ">buy $Pow Pirates </p></a>
            </div>
            <div className="second_nav">
              <BsBellFill className="bell" color="white" size={35} />
              {!currentSignerAddress ? (
                <p className="connect" onClick={connectWallet}>
                  connect wallet <ImDatabase size={15} className="database" />{" "}
                </p>
              ) : (
                <p className="connect">
                  Wallet Connected <ImDatabase size={15} className="database" />{" "}
                </p>
              )}
            </div>
          </div>
          <div
            className={
              unzoom ? "cointoss_container" : "cointoss_container  zoom"
            }
          >
            <img className="cointoss" src={cointoss} alt="CoinToss" />

            <div className="cointoss_navbar">
              <div className="cointoss_nav_1">
                <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  Coin Toss
                </p>
                <div className="tooltip_container">
                  <MdOutlinePrivacyTip className="tooltip_icon" size={20} />
                  <div className="tooltip">
                    <p>
                      The game is played with 2 a sided Coin.The goal of the
                      game is to guess whether the lucky coin face will be Heads
                      or Tails. <br /> 1) Set your bet amount <br />
                      2) Choose POW or PIRATES <br /> 3) Presss the "Start Game"
                      button to initiatiate the transaction with your wallet{" "}
                      <br /> Wait for a few second and see the result{" "}
                    </p>
                  </div>
                </div>
                <div className="contract_container">
                  <FaFileContract size={20} />
                  <div className="tooltip">
                    <p>View a contract </p>
                  </div>
                </div>
                <div className="zoom-container">
                  <MdOutlineZoomOutMap
                    cursor="pointer"
                    onClick={() => setunzoom(!unzoom)}
                    size={20}
                  />
                </div>
                <div className="speaker_container">
                  {unmuted ? (
                    <GiSpeaker
                      cursor="pointer"
                      onClick={() => setunmuted(!unmuted)}
                      size={23}
                    />
                  ) : (
                    <GiSpeakerOff
                      cursor="pointer"
                      onClick={() => setunmuted(!unmuted)}
                      size={23}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="cointoss_middle_container">
              <div className="cointoss_middle_content">
                <div className="slider-container">
                  <div className="value_container">
                    <span id="demo">{value}x</span>
                  </div>
                  {/* <div className='range_parent'>
<input type="range" min="1" max="100" value={value} onChange={e => changeValue(e.target.value)} onMouseLeave={handleLeave} onInput={e => handleRange(e,value,unmuted)}  className='slider' id='myrange' />
<span className='value_bubble'><p>{value}</p></span>
<div className='ranges'>
  <span>1</span>
  <span>25</span>
  <span>50</span>
  <span>75</span>
  <span>99</span>
</div>
</div> */}

                  <Coin />

                  <div className="bet_input">
                    <div className="bet">BET</div>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={betvalue}
                      onChange={(e) => setbetvalue(e.target.value)}
                    />
                    <span onClick={maxHandler} className="max-btn">
                      MAX
                      </span>
                    <div className="value_select">
                      <div
                        onClick={() => setshowoptions(!showoptions)}
                        className="selected"
                      >
                        <IoMdArrowDropdown size={27} />
                        <span>{betoption}</span>
                        <img
                          className="currency_icon"
                          src={powpirate}
                          alt="currencyicon"
                        />
                      </div>
                      {showoptions && (
                        <div className="options">
                          <div
                            onClick={() => setbetoption("POWP")}
                            className="option"
                          >
                            <TiTick
                              className={
                                betoption === "POWP"
                                  ? "tick_hidden show"
                                  : "tick_hidden "
                              }
                            />
                            <span>POWP</span>
                            <div>
                              <img
                                className="currency_icon"
                                src={powpirate}
                                alt="currencyicon"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="cointoss_percentage"
                    style={{
                      color: "#d7b1b1",
                      fontSize: "12px",
                      width: "fit-content",
                      marginTop: "20px",
                      wordBreak: "break-word",
                    }}
                  >
                    <div
                      className="first_row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <span style={{ marginRight: "60px" }}>
                        <span style={{ marginRight: "5px" }}>
                          99% win chance
                        </span>
                        <span>house edge</span>
                      </span>

                      <span className="tooltip_2">
                      For the love of the game{" "}
                        <MdOutlinePrivacyTip
                          className="tip"
                          style={{ marginBottom: "-2px" }}
                          size={15}
                        />
                        <div className="tooltip">
                          <p>Payout = bet amount + profit</p>
                          <ul>
                            <li>Bet amount 0 POWP</li>
                            <li>Gas price 1.5000 Gwei</li>
                          </ul>
                        </div>
                      </span>
                    </div>
                  </div>

                  {!currentSignerAddress && (
                    <div
                      onClick={connectWallet}
                      className="connect_your_wallet"
                    >
                      Connect Your Wallet
                    </div>
                  )}
                  {!loading && currentSignerAddress && (
                    <div
                      onClick={startCoinGameHandler}
                      className="connect_your_wallet_2"
                    >
                      Start Game
                    </div>
                  )}

                  {loading && currentSignerAddress && (
                    <div>
                      {" "}
                      <Loader2 /> <Loader />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Songs unmuted={unmuted} />
    </div>
  );
};

const StyledLogo = styled.img`
  height: 90px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 50px;
  }
`;
const StyledLogosmall = styled.img`
  height: 40px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

export default CoinToss;
