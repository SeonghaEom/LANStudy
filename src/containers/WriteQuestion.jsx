import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuestion, getQuestionList } from '../actions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
          titleValue : null,
          bodyValue: null,
          topicValue: '영어',
          isAnnounce: false,
      }
    }

    handleSubmit() {
        const {
            questionList,
            _addQuestion,
            _getQuestionList,
        } = this.props;
        // console.log(this.state.titleValue, this.state.bodyValue);

        _addQuestion({title: this.state.titleValue, body: this.state.bodyValue, topic: this.state.topicValue, announcement: this.state.isAnnounce});
        _getQuestionList(questionList)
    }

    handleOnChange(event, which) {
      event.persist();
      console.log(event);
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
        case ("topic"):
          this.setState({
            topicValue: event.target.value
          })
        break;        
        case ("check"):
          this.setState({
            isAnnounce: event.target.checked
          })
        break;
      }
    }

    render(){
        return(
            <div className="container-writequestion">
              <div>
                <Form>

                  <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label column="lg" lg={2}> Write a question summary </Form.Label> */}
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Write a question summary"
                      onChange={(event) => this.handleOnChange(event, "title")} value={this.state.titleValue}
                      />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      size="sm"
                      as="textarea"
                      rows={5}
                      placeholder="Write the details about your complex question"
                      onChange={(event) => this.handleOnChange(event, "body")} value={this.state.bodyValue}
                      />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Make this question announcement!" value={this.state.isAnnounce}
                    onChange={(event) => this.handleOnChange(event, "check")}
                    />
                    <Form.Control
                      as="select"
                      onChange={(event) => this.handleOnChange(event, "topic")} value={this.state.topicValue}
                      custom>
                      <option>영어</option>
                      <option>수능</option>
                      <option>취업준비</option>
                      <option>공시생</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
                <Link to = "/">
                  <Button variant = "primary" onClick={() => this.handleSubmit()}> Post </Button>
                </Link>
            </div>
        )
    }
}

//(reducer, action)
export default connect(mapStateToProps, mapDispatchToProps)(Question);