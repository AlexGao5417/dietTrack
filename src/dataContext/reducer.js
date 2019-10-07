const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODAY_LIST':{
      return{
        ...state,
        todayInputlist: [...state.todayInputlist, action.inputFood],
        totalCurrentCalories: state.totalCurrentCalories + action.inputFood.serving_qty * action.inputFood.nf_calories
        // make sure each time get a new array return. CANNOT USE PUSH!!!
      }
    };
    case 'GET_NUTRITION':{
      return{
        ...state,
        foodQuery: action.foodQuery,
        isCommon: action.isCommon
      }
    };
    case 'SWITCH_MODAL':{
      return{
        ...state,
        isModalOpen: action.isModalOpen
      }
    };
    case 'SELECT_DATE': {      
      let newDate = state.date + action.date
      if (state.date + action.date === 3) newDate = 0
      if (state.date + action.date === -1) newDate = 2
      return{
        ...state,
        date: newDate
      }
    };
    case 'CLEAR_QUERY': {
      return{
        ...state,
        foodQuery: null,
      }
    };
    default:      
      return{
        ...state
      }
  }
}

export default reducer 