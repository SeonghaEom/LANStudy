import React from 'react';
import {connect} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import QuestionAnswer from './QuestionAnswer';
import { getQuestionList, filterQuestion } from '../actions';
import { useFirebase } from "react-redux-firebase";
import firestore from '../config/fbconfig';



//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
  user: state.loginResult.value,
  question: state.question,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
      _getQuestionList: () => dispatch(getQuestionList()),
      _filterQuestion: (QL, id) => dispatch(filterQuestion(QL, id)),
    }
}

function Item(props){
    return (
        <button className ="forum-item" onClick = {props.onClick}>
            {props.value}
        </button>
    )
}

class QuestionBoard extends React.Component {
  constructor (props){
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    this.writeButtonClick = this.writeButtonClick.bind(this);
    this.joinButtonClick = this.joinButtonClick.bind(this);
  }

  handleClick = (id) => {
    // this.props.history.push("/:id");
    console.log("click a question")
    this.props._filterQuestion(this.props.questionList, id)
  }

  writeButtonClick() {
    this.props.history.push("/write");
  }

  joinButtonClick() {
    this.props.history.push("/room-list");
  }

  render () {
      console.log("at Foruum", this.props);
      const questionList = this.props.questionList.filter(q => {
        return q["topic"] == this.props.selectedKey;
      });
      const _getQuestionList = this.props._getQuestionList;
      // if (questionList.length == 0){
      //   _getQuestionList();
      // }
      
      // let history = useHistory();

      return (
          <div className="container-board"> 
            <div className = 'container-forum'>
              <div className = 'forum-top'>
                <Button bsPrefix="button" className="button-askquestion" onClick = {() => this.writeButtonClick()}> Ask a Question </Button>
                <Button bsPrefix="button" className="button-joinsession" onClick = {() => this.joinButtonClick()}> Join Session </Button>
              </div>
              <div >
              <ListGroup bsPrefix="forum" className="forum-list">
                {questionList.map(item => (
                  <ListGroup.Item bsPrefix="forum" className = "forum-item" key={item["id"]} onClick={() => this.handleClick(item["id"])}>{item["title"].slice(0,15) + "..."}</ListGroup.Item>
                ))
                }
              </ListGroup>
              </div>
            </div>
            <QuestionAnswer/>
          </div>
      )
  }

}



//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(QuestionBoard);
