import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestionList } from '../actions';
// function Game() {
//     return (
//         <div>Hello </div>
//     )
// }

//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
  question: state.question,

})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
  return {
      _getQuestionList: (questionList) => dispatch(getQuestionList(questionList)),
  }
}


class QuestionAnswer extends React.Component {
    constructor (props){
        super(props);
    }
    

    render(){
      console.log(this.props)
      // const questionId = this.props.match.params["id"];
      const {
        a, b, c, 
        questionList,
        question,
        _getQuestionList
      } = this.props;
      
      // const question = questionList.filter(function(element, index, array){
      //   return (element["id"] == questionId)
      // })[0];
      console.log("question ", question);
        return(
            <div className="container-question">
              <div className="question-title">
                {question["title"]}
              </div>
              <div className="question-body">
                {question["body"]}
              </div>
            </div>
        )
    }
}

//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer);