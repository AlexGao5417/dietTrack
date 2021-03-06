import React, { useContext } from 'react';
import styled from 'styled-components'
import { Button } from 'antd';
import { Context } from '../dataContext/Context'
import * as actions from '../dataContext/actions'

const Wrapper = styled.div`
margin-top:5px;
width: 100%;
height: 24px;
.searchBar{
  display: flex;
  justify-content: center;
}
.dateDisplay{
  
  display: flex;
  justify-content: center;
  align-items: center;
  .headline{
    width: 320px;
    height: 24px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    text-align: center;
    color: black;
  }
}

`
const DateSelector = () => {
  
  const date = ['Today', '5 Oct', '6 Oct']

  const { state, dispatch }= useContext(Context)

  
  const handleClick = (dDate) => {
    dispatch(actions.nextDay(dDate))
  }

  return (
    <Wrapper>
      <div className="dateDisplay">
        <Button icon="left" type="link" ghost={true} style={{color:'#6200ee'}} onClick={() => handleClick(-1)} />
        <div className="headline">
          {date[state.date]}
        </div>
        <Button icon="right" type="link" ghost={true} style={{color:'#6200ee'}} onClick={() => handleClick(1)} />
      </div>
    </Wrapper>
  )
}

export default DateSelector