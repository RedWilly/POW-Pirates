import React,{useRef} from 'react'
import song2 from './GameAssets/epic_battle_music_1-6275.mp3'
import ReactAudioPlayer from 'react-audio-player';
import ReactHowler from 'react-howler'

const Songs = ({unmuted}) => {
    
    const handlePlay =()=>{
       
       console.log(document.querySelector('.song2'))
    }
  return (
    
    <ReactHowler
      className='song2'
      src={song2}
  playing={unmuted ? true :false}
  preload={true}
  html5={true}
  loop={true}
  onLoad={{handlePlay}}

/>
  )
}

export default Songs