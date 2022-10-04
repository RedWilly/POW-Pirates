import React from 'react'
import styled from 'styled-components'
//TimeLine
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Bg from '../../Media/RoadMap/Bg.png'
import {FaHome} from 'react-icons/fa'
import Title from '../Title/Title';
import Icon from '../../Media/RoadMap/OpenSeaIcon.png'



function RoadMap() {
  return (
  <StyledRoadMap  id='RoadMap' >
    <Title title='RoadMap'/>
     <div className='Light'>
     </div>

    <section id="timeline" class="timeline-outer">
    <div class="container" id="content">
      <div class="row">
        <div class="col s12 m12 l12">
          <ul class="timeline">
            <li class="event">
              <h4 className='Launch'>Launch</h4>
              <p>
              Create an epic empowering community where you'll be inspired to create the life of your dreams.
              </p>
            </li>
            <li class="event" >
            <h4 className='Launch'>$POWP Staking</h4>
              <p>After the mint date, we will use 30% of the profits to create the $POWP token and provide liquidity for possible trading on Uniswap, and later we will launch our erc-721tokens (NFT's) staking protocol.</p>
            </li>
            <li class="event">
            <h4 className='Launch'>DAO</h4>
              <p>
              Our goal is to create a DAO to be able to agree on the direction of the project, through votes that will be held once a month. Those who will be able to have the voting power will only be the holders of $POWP.
              </p>
            </li>
            <li class="event" >
            <h4 className='Launch'>Merch</h4>
              <p>To create a sense of community and again reward our holders, we are going to do a merch drop, which will only be available to holders and only purchasable with our $POWP token.</p>
            </li>
            <li class="event" >
              <p>(?): Really BIG surprise</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </section>

  
  </StyledRoadMap>
  )
}


const StyledRoadMap = styled.div`
position : relative;
overflow : hidden;

border-width: 1px;
    border-style: solid;
    border-image: linear-gradient(90deg, rgba(137,74,241,0) 0%, rgba(137,74,241,0.2) 100%) 1;
   border-top:0;
   border-left:0;
   border-right:0;

.Light{
  position :absolute;
  width: 230px;
height: 230px;
background: rgba(145,78,255, 0.9);
filter: blur( 100px );
top : 35%;
right :0;
}


#content {
  margin-top: 50px;
  text-align: center;
}

section.timeline-outer {
  width: 80%;
  margin: 0 auto;
}
/* Timeline */

.timeline {
  border-left: 8px solid var(--MainColor);
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  color: white;
  margin: 50px auto;
  letter-spacing: 0.5px;
  position: relative;
  line-height: 1.4em;
  padding: 20px;
  list-style: none;
  text-align: left;
  font-family: 'Nunito Sans', sans-serif;
  background: rgba(47,26,81, 0.32);
  backdrop-filter: blur( 5px );
  -webkit-backdrop-filter: blur( 5px );
  
border-bottom: 1px solid rgba( 255, 255, 255, 0.18 );
border-top: 1px solid rgba( 255, 255, 255, 0.18 );
border-right: 1px solid rgba( 255, 255, 255, 0.18 );
}

.timeline h1,
.timeline h2,
.timeline h3 {
  font-size: 1.4em;
}

.timeline .event {
  border-width: 1px;
    border-style: solid;
    border-image: linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%) 1;
   border-top:0;
   border-left:0;
   border-right:0;
  padding-bottom: 15px;
  margin-bottom: 20px;
  position: relative;

  .Launch{
    font-family : var(--font-secondary);
  }
}

.timeline .event:last-of-type {
  padding-bottom: 0;
  margin-bottom: 0;
  border: none;
}

.timeline .event:before,
.timeline .event:after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline .event:before {
  left: -177.5px;
  color: #212121;
  content: attr(data-date);
  text-align: right;
  /*  font-weight: 100;*/
  
  font-size: 16px;
  min-width: 120px;
  
}

.timeline .event:after {
  box-shadow: 0 0 0 5px var(--MainColor);
  left: -30px;
  background: var(--Bg);
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: "";
  top: 5px;
  
}
/**/
/*——————————————
Responsive Stuff
———————————————*/

@media (max-width: 945px) {
  .timeline .event::before {
    left: 0.5px;
    top: 20px;
    min-width: 0;
    font-size: 13px;
  }
  .timeline h3 {
    font-size: 16px;
  }
  .timeline p {
    padding-top: 20px;
  }
  section.lab h3.card-title {
    padding: 5px;
    font-size: 16px
  }
}

@media (max-width: 768px) {
  .timeline .event::before {
    left: 0.5px;
    top: 20px;
    min-width: 0;
    font-size: 13px;
  }
  .timeline .event:nth-child(1)::before,
  .timeline .event:nth-child(3)::before,
  .timeline .event:nth-child(5)::before {
    top: 38px;
  }
  .timeline h3 {
    font-size: 16px;
  }
  .timeline p {
    padding-top: 20px;
  }
}
/*——————————————
others
———————————————*/

a.portfolio-link {
  margin: 0 auto;
  display: block;
  text-align: center;
}
`

export default RoadMap