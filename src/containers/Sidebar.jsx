import React from 'react';
import {connect} from 'react-redux';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { getQuestionList, filterQuestionList } from '../actions';
import Forum from './Forum';
import firestore from '../config/fbconfig';
import * as firebase from 'firebase';

//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
  user: state.loginResult.value,
  isLoggedIn: state.loginResult.type,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
      _getQuestionList: () => dispatch(getQuestionList()),
      _filterQuestionList: (key, QL) => dispatch(filterQuestionList(key, QL)),
    }
}

class Sidebar extends React.Component {
  constructor (props){
    super(props);
    this.loginButtonClick = this.loginButtonClick.bind(this);
    this.signOut = this.signOut.bind(this);
    this.changeListClick = this.changeListClick.bind(this);
    this.state = {
      totalQL: this.props.questionList,
      selectedKey: '수능',
    }
  }


  loginButtonClick() {
    this.props.history.push("/login");
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  changeListClick(selectedKey, totalQuestionList) {
    // console.log("filterquestion");
    // this.props._filterQuestionList(this.state.totalQL, selectedKey);
    this.setState({selectedKey: selectedKey});
  }
  render(){
    console.log("sidebar ", this.props);
    const totalQuestionList = this.props.questionList;
    const _getQuestionList = this.props._getQuestionList;
    if (totalQuestionList.length == 0){
      // console.log("call questioniList");
      _getQuestionList();
    }
    return (
      <div className = 'container-board'>
        <div className = "container-sidebar">
          <div>
            {this.props.isLoggedIn ? "loggined in as " + this.props.user : null}
          </div>
          {this.props.isLogginedIn ? 
            <div>
              <Button bsPrefix="button" className="button-login" onClick = {() => this.signOut()}> LogOut </Button>
            </div>:
            <div>
              <Button bsPrefix="button" className="button-login" onClick = {() => this.loginButtonClick()}> Login </Button>
            </div>
          }
          <Nav defaultActiveKey="수능"
          className="flex-column"
          onSelect={(selectedKey) => this.changeListClick(selectedKey, totalQuestionList)}
          >
            <Nav.Item>
              <Nav.Link className = 'container-sidebar-item' eventKey="수능"> 수능 </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className = 'container-sidebar-item' eventKey="공시생"> 공시생 </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className = 'container-sidebar-item' eventKey="영어"> 영어 </Nav.Link>
            </Nav.Item>
            <Nav.Item> 
              <Nav.Link className = 'container-sidebar-item' eventKey="취업준비"> 취업준비 </Nav.Link>
            </Nav.Item>    
          </Nav>
        </div>
        <Forum history={this.props.history} selectedKey={this.state.selectedKey}/>
      </div>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);