import React, { useState, useContext, useEffect } from 'react'
import diet from '../mockdata'
import styled from 'styled-components'
import { Divider } from 'antd'
import { Context } from '../dataContext/Context'


const Wrapper = styled.div`
width: 69%;
float: right;
flex-direction: column;
@media only screen and (max-width: 800px) {
  width: 100%;
}
`
const FoodItem = styled.div`
  height: 90px;
  display: flex;
  justify-content: space-between;
  .img_and_food_block_1{
    display: flex;
    width: 100%;
    align-items: center;
  }
  .image{
    margin: 2% 0% 2% 2%
  }
  .food_name{
    height: 24px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
  }
  .food_input{
    display:flex;
    flex-direction:row;
    height: 20px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.6);
  }
  .food_cal{
    width: 64px;
    height: 24px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: 0.15px;
    text-align: right;
    color: rgba(0, 0, 0, 0.87);
  }
  .food_type{
    width: 64px;
    height: 20px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: 0.25px;
    text-align: right;
    color: rgba(0, 0, 0, 0.6);
  }
  .food_blcok_1{
    padding:2.5%
    width:100%
  }
  .food_blcok_2{
    padding:2.5%
  }
`
const ItemData = styled.div`
margin-right: 1%
`

const MFoodList = () => {
  const { state }= useContext(Context)
  const [menuData, setMenuData] = useState(diet.data_points[0])

  useEffect(()=>{
    setMenuData(diet.data_points[state.date])
  },[state])
  
  let inputFoodData = menuData.intake_list[0] ? menuData.intake_list : state.todayInputlist  
  
  let foodItems = (
    inputFoodData.map(data => (
      <div>
      <FoodItem>
        <div className="img_and_food_block_1">
        <div className='image'><img style={{ height:'50px', width:'50px' }} src={data.thumb} /></div>
        <div className='food_blcok_1'>
          <div className='food_name'>{data.food_name}</div>
          <div className='food_input'>
            <ItemData>{data.serving_qty}</ItemData>
            <ItemData>{data.serving_unit}</ItemData>
            {(data.serving_weight_grams) ?  <ItemData>({Math.floor(data.serving_weight_grams)}g)</ItemData> : null}
            
          </div>
        </div>
        </div>
        <div className='food_blcok_2'>
          <div className='food_cal'>{data.nf_calories}</div>
          <div className='food_type'>{data.meal_type}</div>
        </div>
      </FoodItem>
      <Divider style={{
        margin: '0',
        width:'80%',
        minWidth: '80%',
        marginLeft: '10%'
        }}/>
      </div>
      
    ))
  )

  return (
    <Wrapper>
      {foodItems}
    </Wrapper>
  )
}

export default MFoodList