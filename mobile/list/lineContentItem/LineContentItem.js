import React from 'react';
import { Card } from 'antd-mobile';

class LineContentItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {

    const { icon,title,content } = this.props;

    const itemList = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      fontSize: '0.43em',
      ...this.props.itemList
    }

    const itemImg = {
      width: '2rem',
      height:'2rem',
      borderRadius: '50%',
      marginRight: '1em',
      ...this.props.itemImg
    }

    const itemTitle = {
      fontWeight:700,
      marginRight:'3em',
      ...this.props.itemTitle
    }

    const itemContent = {
      color: '#A5ABB0',
      ...this.props.itemContent
    }

    return (
        <div style={itemList}>
          { icon ? <img src={icon} style={itemImg}/> : null }
          { itemTitle ? <div style={itemTitle}>{title}</div> : null }
          { itemContent ? <div style={itemContent}>{content}</div> : null }
        </div>
    )
  }
}

export default LineContentItem
