import React, { useContext } from 'react';
import styled from 'styled-components'
import { Progress, Divider } from 'antd'
import { Context } from '../dataContext/Context'

const Wrapper = styled.div`
  margin: 10% 5% 5% 5%;
  display: flex;
  justify-content: space-between;
}
`
const DataWrapper = styled.div`
width: 45%;
display:flex;
flex-direction: column;
.headline{
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
.describtion{
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
`

const ProgressBar = styled.div`
  width: 80%;
  margin: auto;
`
const MealWrapper = styled.div`
margin: 10% 5% 5% 5%;
display: flex;
justify-content: space-between;
`
const MealDataWrapper = styled.div`
width: 66px
display:flex;
flex-direction:column;
.headline2 {
  text-align: center;
  height: 24px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.25px;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
}
.caption{
  width: 66px;
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: 0.4px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}
`

const MCalPanel = () => {
  const { state } = useContext(Context)  
  const totalCalories = state.date === 0 ? state.totalCurrentCalories : 1289
  const percentage = state.date === 0 ? Math.floor((state.totalCurrentCalories/1500)*100) : 86

  return (
    <div>
      <Wrapper>
        <DataWrapper>
          <div className="headline">{`${totalCalories} Cal`}</div>
          <div className="describtion">consumed</div>
        </DataWrapper>
        <DataWrapper>
          <div
            className="headline"
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            1500 Cal
          </div>
          <div
            className="describtion"
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            goal
            </div>
        </DataWrapper>
      </Wrapper>
      <ProgressBar>
        <Progress percent={percentage} strokeColor={'#6200ee'} />
      </ProgressBar>
      <MealWrapper>
      <MealDataWrapper>
      <div className="headline2">1289</div>
          <div className="caption">consumed</div>
      </MealDataWrapper>
      <MealDataWrapper>
      <div className="headline2">1289</div>
          <div className="caption">consumed</div>
      </MealDataWrapper>
      <MealDataWrapper>
      <div className="headline2">1289</div>
          <div className="caption">consumed</div>
      </MealDataWrapper>
      <MealDataWrapper>
      <div className="headline2">1289</div>
          <div className="caption">consumed</div>
      </MealDataWrapper>
      </MealWrapper>
      <Divider style={{marginBottom:'0px'}}/>
    </div>
  )
}

export default MCalPanel