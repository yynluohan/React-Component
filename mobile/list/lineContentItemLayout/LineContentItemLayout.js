import React from 'react';

class LineContentItemLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){

    const { icon,title,content } = this.props;

    const style = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: '2px',
      padding: '1em 0.5em'
    }

    const itemImg = {
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: '50%',
    }

    const itemTitle = {
      margin: '0 2em 0 1em'
    }

    return (
      <div style={style}>
        <img src={ icon } style={itemImg}/>
        <div style={itemTitle}>{ title }</div>
        <div>{ content }</div>
      </div>
    )
  }

}

export default LineContentItemLayout
