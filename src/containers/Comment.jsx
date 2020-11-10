import React from 'react';
import {connect} from 'react-redux';
import { addComment } from '../actions';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

const mapStateToProps = state => ({
  question: state.question,
  user: state.loginResult.value,
  comments: state.comments,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
      _addComment: (question, author, comment) => dispatch(addComment(question, author, comment)),
      // _updateComments: (question) => dispatch(updateComments(question)),
    }
}




class CommentSystem extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      text: '',
    }
  }

  handleSubmit(){
  
  this.props._addComment(this.props.question, this.props.user, this.state.text);
  // this.props._updateComments(this.props.question);
        // const {
        //     questionList,
        //     _addQuestion,
        //     _getQuestionList,
        // } = this.props;
        // console.log(this.state.titleValue, this.state.bodyValue);

        // _addQuestion({title: this.state.titleValue, body: this.state.bodyValue, topic: this.state.topicValue});
        // _getQuestionList(questionList)
  }

  handleOnChange(event) {
  event.persist();
  console.log(event);
  this.setState({
    text: event.target.value
  })
}

  render() {
    console.log("Comments ", this.props.question);
    const commentList = this.props.question["comments"];
    // console.log("commentList ", commentList["metadata"].toDate());
    return (

      <div className="container-comment">
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          {commentList.map((item,i) => {return (
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
