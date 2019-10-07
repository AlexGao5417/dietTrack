import React, { useContext } from 'react';
import styled from 'styled-components'
import { Divider, Progress } from 'antd';
import img from '../logo192.png'
import {Context} from '../dataContext/Context'


const Wrapper = styled.div`
width: 31%;
height: 100%;
background: #f5f5f5;
position:absolute;
img{
  border-radius: 50%
}
.ovals{
  margin-top:24px;
  display: flex;
  justify-content: center;
  align-items: center;
  .oval_img{
    margin-left:24px;
    margin-right:24px;
    width: 96px;
    height: 96px;
    border-radius: 50px;
    background-color: rgba(98, 2, 238, 0);
  }
  .oval_number {
    font-family: Roboto;
    width: 56px;
    height: 56px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
  }
}
.username{
  margin-top:12px;
  height: 28px;
  font-family: Roboto;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
}
.cal_data{
  margin-left:16px;
  margin-right:16px
  display: flex;
  flex-direction: column;
  .cal_data_num{
    justify-content: space-between;
    align-items: center;
    display: flex;
    height: 28px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgba(0, 0, 0, 0.87);
  }
  .cal_data_unit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: 0.4px;
    color: rgba(0, 0, 0, 0.6);
  }
.dinning_data{
  display: flex;
  flex-direction: column;
  .dinning_data_num{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    margin-top:10%;
  }
  .dinning_data_name{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
  }
}
}
`

const PersonalInfo = () => {
  const { state } = useContext(Context)  
  const totalCalories = state.date === 0 ? state.totalCurrentCalories : 1289
  const percentage = state.date === 0 ? Math.floor((state.totalCurrentCalories/1500)*100) : 86
  return(
    <Wrapper>
      <div className="ovals">
        <div className="oval_number">
          <div className="num">57</div>
          <div className="unit">kg</div>
        </div>
        <div className="oval_img">
          <img src={img} width='100%'/>
        </div>
        <div className="oval_number">
          <div className="num">163</div>
          <div className="unit">cm</div>
        </div>
      </div>
      <div className="username">
      Jane Appleseed
      </div>
      <Divider style={{marginTop:'13%',color:'grey'}}/>
      <div className='cal_data'>
        <div className='cal_data_num'>
          <div>{`${totalCalories} cal`}</div>
          <div>1500 cal</div>
        </div>
        <div className='cal_data_unit'>
          <div>consumed</div>
          <div>daily goal</div>
        </div>
        <Progress percent={percentage} strokeColor={'#6200ee'} style={{marginTop:'8%'}}/>
      <div className="dinning_data">
        <div className="dinning_data_num">
          <div>153</div>
          <div> 570</div>
          <div>430</div>
          <div>113</div>
        </div>
        <div className="dinning_data_name">
          <div>Breakfast</div>
          <div>Lunch</div>
          <div>Dinner</div>
          <div>Snack</div>
        </div>
      </div>
      </div>
    </Wrapper>
  )
}

export default PersonalInfo