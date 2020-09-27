
export default (state={ type: false, value: null }, action) => {
    // console.log(action);
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { type: true , value: action.user }
      case 'LOGIN_ERROR':
        return { type: false, value: action.err}
      default:
        return state
    }
   }