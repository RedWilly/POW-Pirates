import React from 'react'
import styled from 'styled-components'


function Welcome() {
    return (
        <StyledWelcome id='About'>
            <div className='img'>
            </div>
            <div className='Infos'>
               <p>
               The POW Pirates are custom made 3D art designed Photoshop . Everything was carefully hand-drawn while focusing on quality and details. The result is a piece of art that we hope you will be proud of owning and holding.

               The artwork is at the base of the POW Pirates project and we wanted it to represent and transpire our vision and main values. 

Beyond the Power, Strength, Protection and Wealth that the POW Pirates represents the quality and work behind the artwork itself are proof of our seriousness in this project

<br/> <span>Build Together!</span>
               </p>
            </div>
        </StyledWelcome>
    )
}

const StyledWelcome = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 6%;
  margin-top: 20px;
  display : flex;
  justify-content : center;
  align-items : center;
  color : white;
 
  .Infos{
    text-align : center;
    font-family: 'Poppins', sans-serif;
  }
  

  h1{
    margin-bottom : 15px;
  }
  p{
    font-family: 'Nunito Sans', sans-serif;
      font-size: 1.2rem;
      opacity : 0.9;
      transition : 0.2s ease-in-out;
      line-height : 1.6rem;

      span{
        font-weight : bold;
      }
      &:hover{
        opacity : 1;
      }
  }
`

export default Welcome
