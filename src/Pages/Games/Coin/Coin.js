import React,{useEffect , useState} from 'react'
import './coin.css'



let flippin = false, doc = document;
let winner
// doc.querySelector('.coin').addEventListener('click', e => {

const handlecoin = (e , winner , flip , setflip) => {

setflip(!flip)


  if(flippin) return false; flippin = true;
  
  //declare objects to animate, remove any existing anim
  let objs = doc.querySelectorAll('.line, .coin-container .coin');
  objs.forEach((line) => line.classList.remove('anim'));
  
  //choose heads or tails

    
    doc.querySelector(':root').style.setProperty('--flips', flip ? '900deg' : '720deg')
    
  
  //apply animation and wait for completion
  setTimeout(() => {
    objs.forEach((line) => line.classList.add('anim'));
    e.target.addEventListener('animationend', () => flippin = false);
  });
}
// });

//click once on load for the thumbnail
// setTimeout(() => doc.querySelector('.coin').click(), 750)




const Coin = () => {
  const [flip, setflip] = useState(true)
  useEffect(() => {
    if(doc.querySelector('.coin')){
      winner = '900deg'
    let timer =setTimeout(() => doc.querySelector('.coin').click(), 750) 
  
    return () => {
      clearTimeout(timer)
    }
  }
  }, [])
  return (
   
<div className='coin-container'>
  <div class="floor">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
  <div onClick={(e)  => handlecoin(e , winner , flip , setflip)}   class="coin" >
    <div class="edge">
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
      <div class="segment"></div>
    </div>
  </div>
</div>


  )
}

export default Coin
