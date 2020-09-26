import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({

})

//redux's dispatch to this.props
const mapDispatchToProps = dispatch => {
    return {
    }
}

class Session extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div>
      hi  
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);