import React, { useContext } from 'react';
import styled from 'styled-components'
import { Button } from 'antd';
import AutoCompleteBar from './AutoCompleteBar'
import { Context } from '../dataContext/Context'
import * as actions from '../dataContext/actions'

const Wrapper = styled.div`
width: 100%;
height: 128px;
background: #6200ee;
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
    height: 40px;
    margin-top: 8px;
    font-family: Roboto;
    font-size: 34px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.25px;
    text-align: center;
    color: #ffffff;
  }
}

`
const Header = () => {
  
  const date = ['Today', '5 Oct', '6 Oct']

  const { state, dispatch }= useContext(Context)

  
  const handleClick = (dDate) => {
    dispatch(actions.nextDay(dDate))
  }

  return (
    <Wrapper>
      <div className="searchBar">
        <AutoCompleteBar />
      </div>
      <div className="dateDisplay">
        <Button icon="left" type="link" ghost={true} onClick={() => handleClick(-1)} />
        <div className="headline">
          {date[state.date]}
        </div>
        <Button icon="right" type="link" ghost={true} onClick={() => handleClick(1)} />

      </div>
    </Wrapper>
  )
}

export default Header