export default (state=[{id: 1, title: "", body: ""}], action) => {
    switch (action.type) {
      case 'GET_QUESTION':
        return action.question
      case 'FILTER_QUESTION':
        return action.questionList.filter(function(element, index, array){
        return (element["id"] == action.id)
      })[0];
      default:
        return state
    }
   }