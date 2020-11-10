import React from 'react';
import {connect} from 'react-redux';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { getQuestionList, filterQuestionList } from '../actions';
import Forum from './Forum';

//redux's state to this.props
const mapStateToProps = state => ({
  questionList: state.questionList,
  user: state.loginResult.value,
})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
      _updateQuestionList: (QuestionList) => dispatch(getQuestionList(QuestionList)),
      _getQuestionList: () => dispatch(getQuestionList()),
      _filterQuestionList: (key, QL) => dispatch(filterQuestionList(key, QL)),
    }
}

class Sidebar extends React.Component {
  constructor (props){
    super(props);
    this.loginButtonClick = this.loginButtonClick.bind(this);
    this.changeListClick = this.changeListClick.bind(this);
    this.state = {
      totalQL: this.props.questionList
    }
  }


  loginButtonClick() {
    this.props.history.push("/login");
  }

  changeListClick(selectedKey, totalQuestionList) {
    this.props._filterQuestionList(this.state.totalQL, selectedKey)
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
          LANStudy
          <div>
            <Button bsPrefix="button" className="button-login" onClick = {() => this.loginButtonClick()}> Login </Button>
          </div>
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
        <Forum history={this.props.history}/>
      </div>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);