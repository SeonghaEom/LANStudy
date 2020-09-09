import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {updateQuestionList } from '../actions';

//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
        _updateQuestionList: (newQL) => dispatch(updateQuestionList(newQL)),
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
            _updateQuestionList
        } = this.props;

        _updateQuestionList(questionList.concat([{id: questionList.length+1, title: this.state.titleValue, body: this.state.bodyValue}]))
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
            <div className="question">
              <div className = 'question-box'>
                <label>
                  Title
                </label>
                <textarea onChange={(event) => this.handleOnChange(event, "title")} value={this.state.titleValue}>  </textarea>
              </div>
              <div className = 'question-box'>
                <label>
                  Body
                </label>
                <textarea onChange={(event) => this.handleOnChange(event, "body")} value={this.state.bodyValue}> </textarea>
              </div>
                <Link to = "/">
                  <button onClick={() => this.handleSubmit()}> </button>
                </Link>
            </div>
        )
    }
}

//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(Question);