import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestionList, getComments } from '../actions';
import CommentSystem from './Comment';

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
      _getComments: (question) => dispatch(getComments(question)),
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
        _getQuestionList,
        _getComments
      } = this.props;
      
      // const question = questionList.filter(function(element, index, array){
      //   return (element["id"] == questionId)
      // })[0];
      console.log("question ", this.props);
      // const commentList = _getComments(question);
      // console.log("commentList ", commentList);
        return(
            <div className="container-question">
              <div className="question-title">
                {question["title"]}
              </div>
              <div className="question-body">
                {question["body"]}
              </div>
              <CommentSystem comments={question["comments"]} question={question}/>
            </div>
        )
    }
}

//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer);