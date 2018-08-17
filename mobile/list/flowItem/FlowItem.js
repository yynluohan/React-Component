import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './flowItem.css';
import 'antd-mobile/dist/antd-mobile.css';

class FlowItem  extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onOk = (path) => {
    console.log('path = ',path);
    window.location.href = `#${path}`
  }

  render(){

    const { icon,title,count,path } = this.props;

    const listItem = {
      display: 'flex',
      height: '2.625em',
      lineHeight: '2.625em',
      backgroundColor: '#ffffff',
      ...this.props.listItem
    }

    const itemIcon = {
      width: '2.25em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...this.props.itemIcon
    }

    const itemImage = {
      width: '1.375em',
      height: '1.375em',
      ...this.props.itemImage
    }

    const itemText = {
      flex: '1',
      fontSize: '1em',
      color:'#000',
      marginLeft: '0.3125em',
      ...this.props.itemText
    }

    const itemArrow = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '0.3em',
      paddingRight: '0.9em',
      ...this.props.itemArrow
    }

    return (
      <div style={listItem} onClick={() => this.onOk(path)}>
        <div styles={itemIcon}>
          <img src={icon} style={itemImage}/>
        </div>
        <div style={itemText}>
          {title}
        </div>
        <div style={itemArrow}>
          <Icon type='right' size='md' color='#6A6A6A' />
        </div>
      </div>
    )
  }
}

export default FlowItem;
