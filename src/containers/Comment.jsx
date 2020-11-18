import React from 'react';
import {connect} from 'react-redux';
import { addComment, updateQuestionList, filterQuestion } from '../actions';
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
      _updateQuestionList: (id, QL, newQ) => dispatch(updateQuestionList(id, QL, newQ)),
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
      needChange: false,
    }
  }

  handleSubmit(){
    console.log("submit ", this.props.question["comments"], this.state.commentList);
  this.props._addComment(this.props.question, this.props.user, this.state.text);
  const newQ = this.props.question;
  console.log("newQ", newQ, this.state.question);
  this.props._updateQuestionList(this.props.question["id"], this.props.questionList, newQ);
  // this.props._filterQuestion(this.props.questionList, this.props.question["id"]);
  // console.log(this.props.question);
  this.setState({text: ''});
  // this.setState({commentList: this.props.question["comments"]});
  this.setState({needChange: true});
  // this.forceUpdate();
  }

  handleOnChange(event) {
  event.persist();
  console.log(event);
  this.setState({
    text: event.target.value
  })
}

drawComment = (item, i) => (
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
  )


  static getDerivedStateFromProps(props, state) {
    if (props.question != state.question) {
      console.log("derive stat4e from props ", props.question["comments"].length, props.question);
      return {
        text: '',
        commentList: props.question["comments"],
        question: props.question,
        length: props.question.length,
      };
    }
    else {
      console.log("hello ", props.question["comments"].length, state.commentList.length);
      return {}
      // return {
      //   needChange: false,
      // };
    }
  }

  // shouldComponentUpdate(nextProps, nextState){

  //       return ( != );
  //   }

  render() {
    console.log("Comments ", this.props);
    // console.log("Comments ", this.state.commentList);
    // console.log("commentList ", commentList["metadata"].toDate());
    
    return (

      <div className="container-comment" key={this.props.questionList}>
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          <div >
            {this.state.commentList.map((item,i) => this.drawComment(item, i))}
          </div>
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
