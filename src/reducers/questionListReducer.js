
export default (state=[], action) => {
    switch (action.type) {
      case 'GET_QUESTION_LIST':
        return action.questionList
      case 'UPDATE_QUESTION_LIST':
        return action.questionList
      case 'FILTER_QUESTION_LIST':
        return action.questionList.filter(question => {
          return question['topic'] == action.key
          })
      default:
        return state
    }
   }