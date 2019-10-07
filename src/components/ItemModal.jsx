import { Modal, Button, Divider, InputNumber, Select, message, Spin, Alert } from 'antd';
import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../dataContext/Context'
import * as actions from '../dataContext/actions'
import axios from '../axios'
import styled from 'styled-components'

const Wrapper = styled.div`
.title{
  font-family: Roboto;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.87);
}
.divider{
  margin-top:16px
}
.slice{
  color: #6200ee;
  margin-left:10px
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: 0.4px;
}
.add_to_today{
  width: 272px;
  height: 16px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.6);
}
.num_input{
  display:flex;
  align-items:center;
  justify-content: space-between;
  .fixed_tag{
    position: absolute;
    height: 16px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0.4px;
    margin-left: 11px;
    color: #6200ee;
  }
  .food_data{
    margin-left: 10px;
    width: 100%;
    height: 44px;
    .num{
      font-family: Roboto;
      font-size: 24px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: right;
      color: rgba(0, 0, 0, 0.87);
      height: 28px;
    }
    .term{
      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: 0.4px;
      text-align: right;
      color: rgba(0, 0, 0, 0.6);
      height: 16px
    }
  }
  
  
}
`


const ItemModal = () => {
  let itemData = {}
  const { state, dispatch } = useContext(Context)
  const [nutritionData, setNutritionData] = useState(null)
  const [calData, setCalData] = useState({calories:0,weight:0,qty:0})
  const [foodType, setFoodType] = useState("")

  //check if we are in mobile version
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  });
  const isMobile = (size < 800);

  useEffect(() => {
    let urlQuery
    if (state.foodQuery !== null) {
      if (state.isCommon) {
        urlQuery = 'natural/nutrients'
        axios.post(urlQuery, { query: state.foodQuery })
          .then((res) => {
            setNutritionData(res.data.foods[0])
            if (nutritionData) setCalData({ ...calData, calories: Math.floor(nutritionData.nf_calories) })
          }).catch((error) => {
            message.warning('Sorry, We cannot find your food');
            dispatch(actions.clearQuery()) // set state.foodQuery=null, to prevent multiple unexpected API request
          })
      } else {
        urlQuery = `search/item?nix_item_id=${state.foodQuery}`
        axios.get(urlQuery)
          .then((res) => {
            setNutritionData(res.data.foods[0])
            if (nutritionData) setCalData({ ...calData, calories: Math.floor(nutritionData.nf_calories) })
          })
          .catch((error) => {
            message.warning('Sorry, We cannot find your food');
            dispatch(actions.clearQuery())
          })
      }
    }
  }, [state])
  
  const Spinner = (
    <Spin tip="Loading...">
      <Alert
        message="Finding your food..."
        description="Nutrition details about your input food is loading..."
        type="info"
      />
    </Spin>
  )
  
  const handleOk = () => {
    setTimeout(() => {
      dispatch(actions.closeModal())
    }, 3000);
  };

  const handleCancel = () => {
    dispatch(actions.closeModal())
  };

  const { Option } = Select;

  function onSearch(val) {
    console.log('search:', val);
  }

  const handleChange = (value) => {

    setCalData({
        ...calData,
        calories: value * Math.floor(nutritionData.nf_calories),
        qty: value,
        weight: Math.floor(value*nutritionData.serving_weight_grams)
      })
    
  }

  const handleAddItem = () => {

    itemData = {
      ...itemData,
      thumb: nutritionData.photo.thumb,
      food_name: nutritionData.food_name,
      nf_calories: calData.calories,
      serving_qty: calData.qty,
      serving_weight_grams: calData.weight,
      meal_type: foodType,
      serving_unit: nutritionData.serving_unit
    }
    if(itemData.serving_qty===0) {
      message.error("Please select quantity of servings"); 
      return
    }
    if(!itemData.meal_type) {
      message.error("Please select Meal Type"); 
      return
    }

    dispatch(actions.addFood(itemData))
    dispatch(actions.clearQuery())
    dispatch(actions.closeModal())
  }

  const select_style = {
    width: '100%',
    height: '48px',
    marginTop: '5%'
  }

  const img = nutritionData ? <img width='64px' src={nutritionData.photo.thumb} /> : null
  const modalDisplay = nutritionData ? (
    <Wrapper>
      <div style={{display:'flex',flexDirection:'column'}}>
      <div className='title'>
        {nutritionData.food_name}
      </div>
      {state.isCommon?null:<div>{nutritionData.brand_name}</div>}
      </div>
      <div className='divider'>
        <Divider />
      </div>
      <div className="num_input">
        <div>
          <div className="fixed_tag">Servings</div>
          <InputNumber 
            style={{ width: '120px', height: '56px', backgroundColor: 'rgba(0, 0, 0, 0.06)' }} 
            onChange = {(value)=> {handleChange(value)}}
            min = {0}/>
        </div>
        <div style={{display:'flex'}}>
          <div className='food_data'>
            <div className='num'>{nutritionData.serving_weight_grams}</div>
            <div className='term'>grams</div>
          </div>
          <div className='food_data'>
            <div className='num'>{calData.calories}</div>
            <div className='term'>calories</div>
          </div>
        </div>
      </div>
      <div className='slice'>
        {nutritionData.serving_unit}
      </div>
      <Divider />
      <div className='add_to_today'>
        ADD TO TODAY
      </div>
      <Select
        className='date_selector'
        showSearch
        style={select_style}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={(value)=>{setFoodType(value)}}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      > 
        <Option value="Snack">Snack</Option>
        <Option value="Breakfast">Breakfast</Option>
        <Option value="Lunch">Lunch</Option>
        <Option value="Dinner">Dinner</Option>
      </Select>
    </Wrapper>
  ) : Spinner;
  

  return (
    <div>
      <Modal
        height='391px'
        width={isMobile ? '80%' : '30%'}
        visible={state.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="ADD"
            onClick={handleAddItem}
            size="large"
            style={{ color: 'white', backgroundColor: '#6200ee' }}>
            Add
          </Button>
        ]}
      >
       {img}
       {modalDisplay}
      </Modal>
    </div>
  );
}


export default ItemModal;