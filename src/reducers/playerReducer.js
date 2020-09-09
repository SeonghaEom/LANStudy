export default (state=true, action) => {
    switch (action.type) {
     case 'UPDATE_PLAYER':
      return action.player
     default:
      return state
    }
   }