export default (state = [{squares: Array(9).fill(null)}], action) => {
    switch (action.type) {
     case 'UPDATE_HISTORY':
      return action.history
     default:
      return state
    }
   }