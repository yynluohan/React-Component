/**
    * @author Yang,YN
    * @editor
    * @updated 2018-8-17
    * @desc 支持数据折叠功能
    * @eg
    <OrderCartListItem >
      list=[]
      defaultNumber=5
      icon = ''
      title = ''
      oderNumber = ''
      time = ''
      tableNumber = ''
      combineNumber = ''
    </OrderCartListItem>
 */

import React from 'react';
import ClapsedList from '../clapsedList/ClapsedList';

export default class OrderCartListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    const { list,defaultNumber,icon,title,oderNumber,time,tableNumber,combineNumber } = this.props;

    const clapsedListProps = {
      list,
      defaultNumber,
    }

    const style = {
      backgroundColor: '#fff',
      padding: '0.2em',
      borderRadius: '8px',
      marginBottom: '0.5em',
      ...this.props.style
    }

    const cardStyle = {
      display: 'flex',
      justifyContent:'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgb(195, 187, 187)',
      ...this.props.cardStyle
    }

    const ItemStore = {
      display: 'flex',
      alignItems: 'center',
      ...this.props.ItemStore
    }

    const storeImg = {
      width:'44px',
      ...this.props.storeImg
    }

    const imageStyle = {
      width: '100%',
      ...this.props.imageStyle
    }

    const priceTotal = {
      textAlign: 'right',
      padding: '1em',
      ...this.props.imageStyle
    }

    const itemTitle = {
      ...this.props.itemTitle
    }

    const itemOderNumber = {
      ...this.props.itemOderNumber
    }

    const itemTime = {
      ...this.props.itemTime,
    }

    const itemTableNumber = {
      ...this.props.itemTableNumber
    }

    const itemCombineNumber = {
      ...this.props.itemCombineNumber
    }

    return(
        <div style={style}>
          <div style={cardStyle}>
            <div style={ItemStore}>
              <div style={storeImg}>
                <img src={icon} style={imageStyle}/>
              </div>
              <div style={itemTitle}>{title}</div>
            </div>
            <div>
              <div style={itemOderNumber}>{oderNumber}</div>
              <div style={itemTime}>{time}</div>
              <div style={itemTableNumber}>{tableNumber}</div>
            </div>
          </div>
          <ClapsedList {...clapsedListProps}/>
          <div style={priceTotal}>
            合计：
            <span style={itemCombineNumber}>{combineNumber}</span>
          </div>
        </div>
    )
  }
}
