export default (state=[{author: 1, metadata: "", comment: ""}], action) => {
    switch (action.type) {
      case 'GET_COMMENTS':
        return action.comments
      default:
        return state
    }
   }