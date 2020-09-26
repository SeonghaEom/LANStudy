
export default (state=[], action) => {
    switch (action.type) {
      case 'GET_QUESTION_LIST':
        return action.questionList
      case 'UPDATE_QUESTION_LIST':
        return action.questionList
      default:
        return state
    }
   }