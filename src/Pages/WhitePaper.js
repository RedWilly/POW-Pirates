import React from 'react'
import styled from 'styled-components'
import logo from '../Media/Logos/Logo.png'
import Footer from '../Components/Footer/Footer'
import { Navbar } from '../Components'
import { motion } from 'framer-motion' 
import { Title } from '@mui/icons-material'
import {FaInstagram,FaGlobe} from 'react-icons/fa'
import Logo from '../Media/Logos/LogoLoading.png'
import Member1 from '../Media/Team/Member1.jpeg'
import Member2 from '../Media/Team/Member2.jpeg'
import Member3 from '../Media/Team/Member3.jpeg'

function WhitePaper() {
  return (
    <motion.div
    initial ={{opacity:0}}
    animate= {{opacity:1, transition :{delay: 0.1,duration:1.3}}}
    exit={{ opacity:0 ,transition :{delay: 0.1,duration:0.2}}}
    >
    <StyledWhitePaper>
        <Navbar/>

        <div className='Content'>
            <h3 className='TopTitle'>POW Pirates LitePaper</h3>
            <div className='Infos'>
              <h3 className='Title'>Introduction</h3>
              <p className='Par'>
              The POW Pirates are custom-made 3D art designed with Forger 3D & Photoshop. Everything was carefully hand-drawn while focusing on quality and details. The result is a piece of art that we hope you will be proud of owning and holding. The artwork is at the base of the POW Pirates project and we wanted it to represent and transpire our vision and main values. Beyond the Power, Strength, Protection and Wealth that the POW Pirates represents the quality and work behind the artwork itself are proof of our seriousness in this project.
              </p>
              <p className='Par'>
              Tribal Style, Power, Strength and Protection are the main aspects of the POW Pirates. We’ve combined these attributes into one symbol to create a unique and powerful image that will become a symbol of strength for all involved in this project. These POW Pirates are the most powerful and ferocious pirates in the seven seas. They have been blessed by the Gods of War to be able to capture, hold, and control all the wealth from their enemies.               The POW Pirates are a powerful symbol of strength, protection and power. This will be the first time that a pirate has been represented in this fashion.
              </p>
              <p className='Par'>
              The POW is the most revered and powerful symbol of the human spirit, donned only by those who in the wombs of danger and attackers view themselves as bold protagonists.
              </p>
              <p className='Par'>
              The P symbolizes protection from above. It safeguards, deflects the malevolent, and is believed to be the protector of all POW Pirates Holders. The O represents the cycle of energy, power, and money. It is a symbol of wealth and financial abundance. And the W represents family, friendship and brotherhood, and stands for the force and the vitality of the many united.
              </p>
              <p className='Par'>
              This collection not only features original in-house artwork but also delivers community, utility, and longevity
              </p>

              <h3 className='Title'>Pirates Mint</h3>
              <p className='Par'>2100 Pirates from the 3D dimension fell from the sky right into ETHW blockchain. Pirates is unique and programmatically generated with over 200+ possible attributes and traits like background, clothes, mouth, head (Common & rares).
              Price pre-sale 0.30ethw Price Public sale 0.38ethw
              Mint date: TBA
              </p>

              <h3 className='Title'>Giveaway</h3>
              <p className='Par'>
              Airdrop giveaway will be hosted in our telegram group & on our Twitter page we have a special airdrop on POW Pirates, so make sure you join our telegram and follow us on Twitter. This giveaway includes POW NFT, the project erc20 token $POWP, contest & collaboration with other existing or upcoming projects.
              </p>
              
              <h3 className='Title'>Our RoadMap</h3>
              <p className='Par'><span style={{fontWeight :'bold'}}>DAO</span><br/>
              Our goal is to create a DAO to be able to agree on the direction of the project, through votes that will be held once a month. Those who will be able to have the voting power will only be the holders of $POWP. Voting power will be proportionate to the number of POWP they hold. 1 Vote = 1 $POWP. We will use the tokens to create a unique ecosystem where everyone is able to participate in the governance and share their skills and ideas in a very democratic way. This will result in the development of the project in a more productive way. Also, holders of $POWP will also be in charge of hosting and conducting community events.
              </p>
              <p className='Par'><span style={{fontWeight :'bold'}}>$POWP Staking</span><br/>
              After the mint date, we will use 30% of the profits to create the $POWP token and provide liquidity for possible trading on Uniswap, and later we will launch our erc-721 tokens (NFT's) staking protocol. $POWP token holders will have the potential to earn a yield from staking as a form of a stake-lock reward. Holders of $POWP will have a monthly return of 8% that will be paid through the dividend distribution system, while the rest will be distributed proportionately to the holders.
              </p>
              <p className='Par'><span style={{fontWeight :'bold'}}>Cap Merch</span><br/>
              To create a sense of community and again reward our holders, we are going to do a Cap merch drop, which will only be available to holders and only purchasable with our $POWP. The Cap will be limited in quantity and unique. All proceeds from the sales will go towards our marketing & Increase $POWP liquidity on Uniswap to help us gain further exposure for the project. 
              </p>
            
              <h3 className='Title'>Legal Disclaimer</h3>
              <div>
              <p className='Par' style={{textAlign :'left'}}>This whitepaper acts both as a future roadmap as well as a guide for our holders, though do note that the information in this whitepaper is still subject to change going forward. </p>
              
              <p className='Par' style={{textAlign :'left' ,marginBottom :'10px', fontWeight :'bold'}}>No Advice:</p>
              <p className='Par' style={{textAlign :'left'}}>This white paper does not obligate anybody to sign a contract or make a legally enforceable commitment to contribute. This white paper also does not constitute any form or part of any opinion that can be construed as advice, or that can be used to sell or solicit any offer by POW Pirates to purchase our NFTs, nor shall it be construed as a part of any effect that can be used in the formation of a contract or an investment decision. </p>

              <p className='Par' style={{textAlign :'left' ,marginBottom :'10px', fontWeight :'bold'}}>Compliance with tax obligations:</p>
              <p className='Par' style={{textAlign :'left'}}>Users of the Website are entirely responsible for determining what, if any, taxes, if any, apply to their transactions. The Website's owners or authors are not responsible for determining which taxes apply to transactions.</p>

              <p className='Par' style={{textAlign :'left' ,marginBottom :'10px', fontWeight :'bold'}}>Limitation of liability:</p>
              <p className='Par' style={{textAlign :'left'}}>POW Pirates shall not be held liable for any loss or harm resulting from the use of this website's material, including written material, links to third-party sites, data, quotations, charts, and buy/sell signals. Please be fully informed about the dangers and expenses of trading assets on the financial markets (digital or otherwise). ICOs, in particular, is one of the riskiest investing options. There's a chance you'll lose your whole investment. </p>

              <p className='Par' style={{textAlign :'left' ,marginBottom :'10px', fontWeight :'bold'}}>Investment risks:</p>
              <p className='Par' style={{textAlign :'left'}}>Trading cryptocurrencies have a high level of risk and is not suited for all investors. You should carefully evaluate your investing goals, level of expertise, and risk appetite before opting to trade cryptocurrencies, tokens, or any other digital asset. We recommend investing only what you can afford to lose.</p>
              </div>


              <div style={{display :'flex', alignItems : 'center', justifyContent :'center'}}>
              <img style={{width : '250px'}} src={Logo}/>
              </div>
            </div>
        </div>

        <Footer/>
    </StyledWhitePaper>
    </motion.div>
  )
}

const StyledWhitePaper = styled.div`
display : flex;
flex-direction :column;
justify-content : center;
align-items : center;
color : white;


 
.Content{
    background-color : white ;
    border-radius : 15px;
    margin  : 10%;
    background: rgba(47,26,81, 0.32);
    backdrop-filter: blur( 5px );
    -webkit-backdrop-filter: blur( 5px );
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    overflow : hidden;
    border :  1px solid rgba( 255, 255, 255, 0.05 );
    margin-bottom : 50px;

    .Member{
      display : flex;
      margin-bottom : 10px;
      
      .ImgHolder{
        width : 30%;
        border-top-left-radius : 6px;
        border-bottom-left-radius : 6px;
        background-position : center;
        background-size : cover;
        border :  1px solid rgba( 255, 255, 255, 0.4 );
      }
      .img1{
        background-image : url(${Member1});
      }
      .img2{
        background-image : url(${Member2});
      }
      .img3{
        background-image : url(${Member3});
      }

      .MemberContent{
       width : 70%;
       background: linear-gradient(90deg, rgba(53,28,94,0.8) 0%, rgba(53,28,94,0) 30%);

       .Top{
         display :flex;
         flex-direction : row;
         align-items : center;
         margin-left : 4%;
         margin-bottom : 10px;
         font-family  : 'Nunito Sans';
         line-height  : 1.5;
         font-size    : 1.1rem;
         font-weight : bold;
         padding : 6px 0px;
         border-top-left-radius : 5px;
         border-bottom-left-radius : 5px;
         .Title_{
           margin-right : 10px;
         }
         .IconHolder{
           display : flex;
           justify-content : center;
           align-items : center;
          
         }
       }
      }

    }

    @media (max-width : 768px){
      margin  : 25% 7%;
    }


  .TopTitle{
    font-family  : var(--font-tertiary);
    font-size    : 2.2rem;
    margin-bottom: 25px;
    background: linear-gradient(90deg, rgba(53,28,94,0) 0%, rgba(53,28,94,0.5) 50%, rgba(53,28,94,0) 100%);
    width : 100%;
    padding : 8px 5%;
    display : flex;
    justify-content :center;
    align-items :center;
    border-width: 1px;
border-style: solid;
border-image: linear-gradient(280deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 100%) 1;
border-top:0;
border-left:0;
border-right:0;
  }
  .Infos{
    padding : 0px 5%;
    
    .Title{
    font-family  : var(--font-tertiary);
    font-size    : 1.7rem;
    margin-bottom: 25px;
    background: linear-gradient(90deg, rgba(53,28,94,0.5) 0%, rgba(53,28,94,0) 30%);
    padding : 10px;
    border-top-left-radius :25px;
    }
    .Par{
    font-family  : 'Nunito Sans';
    line-height  : 1.5;
    font-size    : 1.1rem;
    padding : 0px 4%;
    margin-bottom : 30px;
  }
  }
}
`

export default WhitePaper