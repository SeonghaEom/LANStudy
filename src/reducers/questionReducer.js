import _ from 'lodash';

export default (state={id: 1, topic: "공시생", title: "", body: "", comments:[]}, action) => {
    switch (action.type) {
      case 'SET_QUESTION':
        return action.question
      case 'FILTER_QUESTION':
        console.log("update with new question ", action.questionList);
        return action.questionList.filter(function(element, index, array){
        return (element["id"] == action.id)
      })[0];
      case 'ADD_COMMENT':
        
        var newQ = _.cloneDeep(action.question);
        console.log("ihi", newQ);
        newQ["comments"]
          .push({
            author: action.author,
            metadata: action.timestampToDate.toString(),
            comment: action.comment,
          });
        console.log("new Q ", newQ);
        return newQ;
      default:
        return state
    }
   }