const nextDay = (dDate) => {
  return{
    type:'SELECT_DATE',
    date: dDate
  }
}

const openModal = () => {
  return{
    type:'SWITCH_MODAL',
    isModalOpen: true
  }
}

const closeModal = () => {
  return{
    type:'SWITCH_MODAL',
    isModalOpen: false
  }
}

const foodQuery = (query, isFoodCommon) => {  
  return{
    type:'GET_NUTRITION',
    foodQuery: query,
    isCommon: isFoodCommon
  }
}

const addFood = (foodItemData) => {  
  return{
    type:'ADD_TODAY_LIST',
    inputFood: foodItemData
  }
}

const clearQuery = () => {
  return{
    type:'CLEAR_QUERY'
  }
}

module.exports = { nextDay, openModal, closeModal, foodQuery, addFood, clearQuery }