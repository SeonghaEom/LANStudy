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
      console.log(this.props.match.params)
      const questionId = this.props.match.params["id"];
      const {
        a, b, c, 
        questionList,
        _getQuestionList
      } = this.props;
      
      const question = questionList.filter(function(element, index, array){
        return (element["id"] == Number(questionId))
      })[0];
      console.log(question);
        return(
            <div className="question">
              {question["title"]}
              {question["body"]}
            </div>
        )
    }
}

//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer);