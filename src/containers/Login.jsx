import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions';
import Button from 'react-bootstrap/Button';

const mapStateToProps = state => {
  // console.log(state);
  return {
  loginResult: state.loginResult,
  }
}

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
      _login : (loginForm) => dispatch(login(loginForm))
    }
}

class Login extends React.Component {
  constructor (props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      idValue : 'test@test.com',
      pwValue: 'testing!',
    }
  }

  handleSubmit() {

    // _addQuestion({title: this.state.titleValue, body: this.state.bodyValue});
    // _getQuestionList(questionList)
    this.props._login({id: this.state.idValue, pw: this.state.pwValue});
    console.log(this.props.loginResult);
  }

  handleOnChange(event, which) {
    switch (which){
      case ("id"):
        this.setState({
          idValue: event.target.value
        })
      break;
      case ("pw"):
        this.setState({
          pwValue: event.target.value
        })
      break;
    }
  }


  render(){
    console.log(this.props.loginResult);
      return(
          <div className="container">
            <div className = 'container-question-box'>
              <label>
                ID
              </label>
              <textarea onChange={(event) => this.handleOnChange(event, "id")} value={this.state.idValue}>  </textarea>
            </div>
            <div className = 'container-question-box'>
              <label>
                PASSWORD
              </label>
              <textarea onChange={(event) => this.handleOnChange(event, "pw")} value={this.state.pwValue}> </textarea>
            </div>
            {this.props.loginResult.type
              ?
                <Link to = "/">
                  <Button variant = "primary" onClick={() => this.handleSubmit()}> Login </Button>
                </Link>
              :
                <div>
                <Button variant = "primary" onClick={() => this.handleSubmit()}> Login </Button>
                {this.props.loginResult.value && this.props.loginResult.value.message}
                </div>
            }

          </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);