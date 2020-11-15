import React from 'react';
import {connect} from 'react-redux';
import { addComment, getQuestionList, filterQuestion } from '../actions';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

const mapStateToProps = state => ({
  question: state.question,
  user: state.loginResult.value,
  comments: state.comments,
  questionList: state.questionList,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
      _addComment: (question, author, comment) => dispatch(addComment(question, author, comment)),
      _getQuestionList: (QL) => dispatch(getQuestionList(QL)),
      _filterQuestion: (QL, id) => dispatch(filterQuestion(QL, id)),
      // _updateQuestionList: (newQuestion) => dispatch(updateQuestionList(newQuestion)),
    }
}




class CommentSystem extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      text: '',
      commentList: this.props.question["comments"],
      question: this.props.question,
    }
  }

  handleSubmit(){
    console.log("submit ", this.props.question["comments"], this.state.commentList);
  this.props._addComment(this.props.question, this.props.user, this.state.text);
  this.props._getQuestionList();
  this.props._filterQuestion(this.props.questionList, this.props.question["id"]);
  // console.log(this.props.question);
  this.setState({text: ''});
  this.setState({commentList: this.props.question["comments"]});
  }

  handleOnChange(event) {
  event.persist();
  console.log(event);
  this.setState({
    text: event.target.value
  })
}

  // static getDerivedStateFromProps(props, state) {
  //   if (props.question != state.question) {
  //     return {
  //       text: '',
  //       commentList: props.question["comments"],
  //       question: props.question,
  //     };
  //   }
  //   else {
  //     console.log("hello ", props.question["comments"], state.commentList);
  //   }
  // }

  render() {
    console.log("Comments ", this.props);
    // console.log("Comments ", this.state.commentList);
    // console.log("commentList ", commentList["metadata"].toDate());
    return (

      <div className="container-comment">
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          {this.state.commentList.length}
          {this.state.commentList.map((item,i) => {
            return (
            <Comment key={i}>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author className = "comment-author" as='a'>{item["author"]["email"]}</Comment.Author>
                <Comment.Metadata>
                  <div>Written at {item["metadata"]}</div>
                </Comment.Metadata>
                <Comment.Text>{item["comment"]}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          )})}
          <Form reply>
            <Form.TextArea 
              onChange={(event) => this.handleOnChange(event)} value={this.state.text}
            />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary
              onClick={() => this.handleSubmit()}
            />
          </Form>
        </Comment.Group>
      </div>

    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentSystem);
