export default (state=[{id:1, title:"thisistitle", body:"thisisbody"},
  {id:2, title:"thisistitle2", body:"thisisbody"},
  {id:3, title:"thisistitle3", body:"thisisbody"},
  {id:4, title:"thisistitle4", body:"thisisbody"},
  {id:5, title:"thisistitle5", body:"thisisbody"},
  {id:6, title:"thisistitle6", body:"thisisbody"},
  {id:7, title:"thisistitle7", body:"thisisbody"},
], action) => {
    switch (action.type) {
      case 'GET_QUESTION_LIST':
        return action.questionList
      case 'UPDATE_QUESTION_LIST':
        return action.questionList
      default:
        return state
    }
   }