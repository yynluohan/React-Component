import  React from 'react';

class FlowItemLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      style:{
        borderBottom: '1px solid #e9e9e9',
        ...props.style
      }
    }
  }


  render(){

    const { style } = this.state;

    return(
      <div style={style}>
        { this.props.children }
      </div>
    )
  }
}

export default FlowItemLayout;
