import React,{useContext} from 'react'
import './dice.css'
import Logo from '../../Media/Logos/Logo_.png'
import {Link as Link_} from 'react-router-dom'
import styled from 'styled-components'
import {GiPirateFlag ,GiHamburgerMenu } from 'react-icons/gi'
import {BsBellFill , BsChevronDown} from 'react-icons/bs'
import {ImDatabase} from 'react-icons/im'
import {MdOutlinePrivacyTip ,MdOutlineZoomOutMap} from 'react-icons/md'
import {FaFileContract} from 'react-icons/fa'
import {RiMedalLine} from 'react-icons/ri'
import {useLocation } from 'react-router-dom';
import {IoMdArrowDropdown} from 'react-icons/io'
import {TiTick} from 'react-icons/ti'
import bnbicon from '../Games/GameAssets/Binance-Coin-BNB-icon.png'
import { StateContext } from '../../Contexts/StateContext'

const handleGameOption =(e,setgamesOpt)=>{

if(e.target.classList.contains('available')){
  document.querySelectorAll('.available').forEach((opt,i) => {
opt.classList.remove('active')
if(opt === e.target){
  setgamesOpt(i) 
 

}

  })

  e.target.classList.add('active')
}


}
const SideNav = () => {
    const location = useLocation()
console.log(location.pathname , "urlllllll")
const lastSegment = location.pathname.split("/").pop();

    const context = useContext(StateContext)
const {gamesOpt ,setgamesOpt} = context
console.log(gamesOpt)
  return (
    <div className='game_side_menu'>
<Link_ to='/' className='Logo'>
    <StyledLogo src={Logo} alt="logo"/>
    </Link_>
<div className='game_side_all'>
<div className='game_protocol' onClick={(e)=>handleGameOption(e,setgamesOpt)}>
  <p className='buy_pirate formobile'>buy $Pow Pirates </p>
  
<p className='games-title'>Games</p>

<a href='/Games/Dice' className={lastSegment == 'Dice' ?'games-opt available active':'games-opt available' }>
  <div className='circle'></div>
 dice
 </a>
<a  href='/Games/CoinToss' className={lastSegment == 'CoinToss'?'games-opt available active':'games-opt available'}>
  <div className='circle'></div>
  coin toss</a>

</div>
<div className='doc_powered'>
<div className='logo_money'>
<GiPirateFlag color="#fe009c" size={25}/>
<p>$0.0000101</p>

</div>
<Link_ to='/' className='Logo'>
<div className='powered_by'>
<p>powered by</p>
    <StyledLogosmall src={Logo} alt="logo"/>

</div>
    </Link_>
</div>



</div>


</div>
  )
}
const StyledLogo = styled.img`
  height : 90px;
  cursor : pointer;

  @media (max-width :768px){
    height : 50px;
  }

`
const StyledLogosmall = styled.img`
  height : 40px;
  cursor : pointer;

  @media (max-width :768px){
    height : 30px;
  }

`



export default SideNav
