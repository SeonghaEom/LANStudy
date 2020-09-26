import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuestion, getQuestionList } from '../actions';
import Button from 'react-bootstrap/Button';

//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
        _addQuestion: (newQ) => dispatch(addQuestion(newQ)),
        _getQuestionList: (QL) => dispatch(getQuestionList(QL)),
    }
}

class Question extends React.Component {
    constructor (props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
          titleValue : 'enter title',
          bodyValue: 'enter body',
      }
    }

    handleSubmit() {
        const {
            questionList,
            _addQuestion,
            _getQuestionList,
        } = this.props;

        _addQuestion({title: this.state.titleValue, body: this.state.bodyValue});
        _getQuestionList(questionList)
    }

    handleOnChange(event, which) {
      switch (which){
        case ("title"):
          this.setState({
            titleValue: event.target.value
          })
        break;
        case ("body"):
          this.setState({
            bodyValue: event.target.value
          })
        break;
      }
    }

    render(){
        return(
            <div className="container">
              <div className = 'container-question-box'>
                <label>
                  Title
                </label>
                <textarea onChange={(event) => this.handleOnChange(event, "title")} value={this.state.titleValue}>  </textarea>
              </div>
              <div className = 'container-question-box'>
                <label>
                  Body
                </label>
                <textarea onChange={(event) => this.handleOnChange(event, "body")} value={this.state.bodyValue}> </textarea>
              </div>
                <Link to = "/">
                  <Button variant = "primary" onClick={() => this.handleSubmit()}> Save </Button>
                </Link>
            </div>
        )
    }
}

//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(Question);