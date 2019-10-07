import React from 'react';
import styled from 'styled-components'
import AutoCompleteBar from '../components/AutoCompleteBar'
import img from '../logo192.png'

const Wrapper = styled.div`
width: 100%;
height: 144px;
background: #6200ee;
.searchBar{
  display: flex;
  justify-content: center;
}
.avatar{
  justify-content: space-between;
  align-items: center;
  height: 56px;
  display: flex;
  margin-left:4%;
  margin-right:4%;
  .name{
    height: 24px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    color: #ffffff;
  }
}
`

const OvalNum = styled.div`
font-family: Roboto;
width: 56px;
height: 56px;
background: rgba(0, 0, 0, 0.5);
border-radius: 50px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
float: right;
.num{
  width: 40px;
  height: 24px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.25px;
  text-align: center;
  color: #ffffff;
}
.unit{
  width: 40px;
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: 0.4px;
  text-align: center;
  color: #ffffff;
}
`
const RightOval = styled.div`
float: left;
display: flex;
justify-content: end;
align-items: center;
width: 50%;
`
const LeftOval = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
width: 40%;
`
const MHeader = () => {
  return (
    <Wrapper>
      <div className="searchBar">
        <AutoCompleteBar />
      </div>
      <div className='avatar'>
        <RightOval>
        <OvalNum style={{background: 'none'}}>
          <img src={img} width='100%'/>
        </OvalNum>
        <div style={{width:'5%'}}></div>
        <div className='name'>Jane</div>
        </RightOval>
          <LeftOval style={{width:'40%'}}>
          <OvalNum className="oval_left">
            <div className="num">57</div>
            <div className="unit">kg</div>
          </OvalNum>
          <OvalNum style={{ 'marginLeft': '4%' }}>
            <div className="num">163</div>
            <div className="unit">cm</div>
          </OvalNum>
          </LeftOval>
      </div>
    </Wrapper>
  )
}

export default MHeader