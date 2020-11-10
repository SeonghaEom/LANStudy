export default (state={id: 1, topic: "공시생", title: "", body: "", comments:[]}, action) => {
    switch (action.type) {
      case 'GET_QUESTION':
        return action.question
      case 'FILTER_QUESTION':
        return action.questionList.filter(function(element, index, array){
        return (element["id"] == action.id)
      })[0];
      case 'ADD_COMMENT':
        action.question["comments"]
          .push({
            author: action.author,
            metadata: new Date(),
            comment: action.comment,
          });
        return action.question;
      default:
        return state
    }
   }