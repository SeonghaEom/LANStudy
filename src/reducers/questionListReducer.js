
export default (state=[], action) => {
    switch (action.type) {
      case 'GET_QUESTION_LIST':
        return action.questionList
      case 'UPDATE_QUESTION_LIST':
      const index = action.questionList.map(e => e.id).indexOf(action.id);
        // var idx = action.questionList.indexOf(action.question);
        if (index !== -1) {
          console.log("update questionList with new");
          action.questionList[index] = action.newQuestion;
        }
        return action.questionList;
      case 'FILTER_QUESTION_LIST':
        return action.questionList.filter(question => {
          return question['topic'] == action.key
          })
      default:
        return state
    }
   }