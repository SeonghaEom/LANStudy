export default (state = 0, action) => {
    switch (action.type) {
     case 'UPDATE_STEP_NUMBER':
      return action.step
     default:
      return state
    }
   }