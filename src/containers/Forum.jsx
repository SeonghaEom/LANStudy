import React from 'react';
import {connect} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getQuestionList } from '../actions';


//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
        _updateQuestionList: (QuestionList) => dispatch(getQuestionList(QuestionList)),
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
    this.handleClick = this.handleClick.bind(this);
    this.writeButtonClick = this.writeButtonClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/question");
  }

  writeButtonClick() {
    this.props.history.push("/write");
  }
  render () {
      console.log("at Foruum", this.props.questionList)
      const questionList = this.props.questionList;
      // let history = useHistory();


      return (
          <div className = 'container-question-board'>
              <Button class = "button-question" variant = "primary" onClick = {() => this.writeButtonClick()}> Ask a Question </Button>
              <div className = 'container-board'>
              <ListGroup>
                {questionList.map(item => (
                  <Link to={`/question/${item["id"]}`}>
                    <ListGroup.Item onClick={() => this.handleClick()}>{item["title"]}</ListGroup.Item>
                  </Link>
                ))
                }
              </ListGroup>
              </div>
          </div>
      )
  }

}



//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(QuestionBoard);