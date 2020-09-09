export default (state=[{id: 1, title: "", body: ""}], action) => {
    switch (action.type) {
     case 'GET_QUESTION':
      return action.question
     default:
      return state
    }
   }