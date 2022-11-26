import React, { useState, useEffect, useContext } from "react";
import "./dice.css";
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
import dice from "./GameAssets/dice.png";
import sekelton from "./GameAssets/sekelton dancing.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import powpirate from "../Games/GameAssets/POWP.png";
import song1 from "./GameAssets/mixkit-warping-slide-1531.wav";
import song2 from "./GameAssets/epic_battle_music_1-6275.mp3";
import ReactAudioPlayer from "react-audio-player";
import ReactHowler from "react-howler";
import Songs from "./Songs";
import SideNav from "./SideNav";
import { BlockchainContext } from "../../Contexts/BlockchainContext";
import Loader2 from "../../Components/Loader/Loader";
import Loader from "../Loader";
import Swal from "sweetalert2";

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

const Dice = () => {
  const [value, changeValue] = useState(1);
  const [betvalue, setbetvalue] = useState(0);
  const [betoption, setbetoption] = useState("PIRATES");
  const [showoptions, setshowoptions] = useState(false);
  const [unmuted, setunmuted] = useState(true);
  const [unzoom, setunzoom] = useState(true);

  const { connectWallet, currentSignerAddress, loading, startDiceGame } =
    useContext(BlockchainContext);

  const startDiceGameHandler = async () => {
    const res = await startDiceGame({
      betvalue,
      value,
    });

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
      ${
        res?.betInfoDetail.betAmount * res?.betInfoDetail.betValue
      } Pirates <br/>

      You Selected Value
      : 
      ${res?.betInfoDetail.betValue} <br/>

      Outcome
      : 
      ${res?.betInfoDetail.betValue_actual}  <br/>
      
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
      ${res?.betInfoDetail.betValue} <br/>

      Actual Value
      : 
      ${res?.betInfoDetail.betValue_actual}  <br/>
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
              <p className="buy_pirate ">buy $Pow Pirates </p>
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
          <div className={unzoom ? "dice_container" : "dice_container  zoom"}>
            <img className="ship" src={pirateShip} alt="pirate ship" />
            {/* <img className='moon' src={moon} alt="moon"/> */}
            <img className="skeleton" src={sekelton} alt="skeleton" />
            <img className="dice" src={dice} alt="dice" />

            <div className="dice_navbar">
              <div className="dice_nav_1">
                <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  dice
                </p>
                <div className="tooltip_container">
                  <MdOutlinePrivacyTip className="tooltip_icon" size={20} />
                  <div className="tooltip">
                    <p>
                      The game is played with 20 sided dice.The goal of the
                      game is to guess whether the lucky number will be above
                      your chosen number. <br /> 1) Set your bet amount and the
                      token <br />
                      2) Choose a number <br /> 3) Press the "Roll To Dice"
                      button to initiatiate the transaction with your wallet{" "}
                      <br /> Wait for a few second and see if you have won{" "}
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
                    size={20}
                    onClick={() => setunzoom(!unzoom)}
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
              <div className="leadboared_2">
                <p style={{ marginRight: "8px" }}>Leadboared</p>
                <RiMedalLine size={20} />
              </div>
            </div>
            <div className="dice_middle_container">
              <div className="dice_middle_content">
                <div className="slider-container">
                  <div className="value_container">
                    <span id="demo">{value}x</span>
                  </div>
                  <div className="range_parent">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={value}
                      onChange={(e) => changeValue(e.target.value)}
                      onMouseLeave={handleLeave}
                      onInput={(e) => handleRange(e, value, unmuted)}
                      className="slider"
                      id="myrange"
                    />
                    <span className="value_bubble">
                      <p>{value}</p>
                    </span>
                    <div className="ranges">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                      <span>15</span>
                      <span>20</span>
                    </div>
                  </div>
                  <div className="bet_input">
                    <div className="bet">BET</div>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={betvalue}
                      onChange={(e) => setbetvalue(e.target.value)}
                    />
                    <span className="max-btn">MAX</span>
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
                            onClick={() => setbetoption("PIRATES")}
                            className="option"
                          >
                            <TiTick
                              className={
                                betoption === "PIRATES"
                                  ? "tick_hidden show"
                                  : "tick_hidden "
                              }
                            />
                            <span>PIRATES</span>
                            <div>
                              <img
                                className="currency_icon"
                                src={powpirate}
                                alt="currencyicon"
                              />
                            </div>
                          </div>
                          {/* <div onClick={() => setbetoption('BNB')} className='option'>
<TiTick className={betoption === 'BNB' ? 'tick_hidden show' : 'tick_hidden ' }/>
<span >BNB</span>
<img className='currency_icon' src={bnbicon} alt='currencyicon' />

    </div> */}
                          {/* <div onClick={() => setbetoption('BETS')} className='option'>
<TiTick className={betoption === 'BETS' ? 'tick_hidden show' : 'tick_hidden ' } />
<span >BETS</span>
<img className='currency_icon' src={bnbicon} alt='currencyicon' />
    </div> */}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="dice_percentage"
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
                        <span>2.5% house edge</span>
                      </span>

                      <span className="tooltip_2">
                        Target payout: ~0 POWP{" "}
                        <MdOutlinePrivacyTip
                          className="tip"
                          style={{ marginBottom: "-2px" }}
                          size={15}
                        />
                        <div className="tooltip">
                          <p>Payout = bet amount + profit -house edge </p>
                          <ul>
                            <li>Bet amount 0 POWP</li>
                            <li>House Edge: ~0 POWP</li>
                            <li>Gas price 5.0000 Gewi</li>
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
                      onClick={startDiceGameHandler}
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
          <div className="analysis">
            <table>
              <thead>
                <tr className="table_data">
                  <th>
                    <span>All</span>
                  </th>
                  <th>
                    {" "}
                    <span
                      className="fadded"
                      style={{ color: "#8a8e9382", wordSpace: "nowrap" }}
                    >
                      My bets
                    </span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span>Player</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span>Target</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span>Porfit</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span>Time</span>{" "}
                  </th>
                </tr>
                <tbody>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                </tbody>
              </thead>
            </table>
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

export default Dice;
