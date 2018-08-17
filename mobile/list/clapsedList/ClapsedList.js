/**
    * @author Yang,YN
    * @editor
    * @updated 2018-8-17
    * @desc 支持数据折叠功能
    * @eg
    <ClapsedList >
      list=[]
      defaultNumber=5
    </ClapsedList>
 */

import React from 'react';
import { query } from 'kqd-utils/lib/services';
import { Icon } from 'antd-mobile';
import TitledListItem from '../titledListItem/TitledListItem';

export default class ClapsedList extends React.Component {

  constructor(props){
    super(props);
    let newList = [];
    if(props.list && props.list.length > 0){
      if(props.list.length > 3){
        newList = props.list.slice(0,3)
      } else {
        newList = props.list
      }
    }else {
      newList = []
    }
    this.state = {
      list: newList,
      defaultNumber: props.defaultNumber || 3,
      moreVisible: 'show',
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    let newList = [];
    if(nextProps.list && nextProps.list.length > 0){
      if(nextProps.list.length > this.state.defaultNumber){
        newList = nextProps.list.slice(0,this.state.defaultNumber)
      } else {
        newList = nextProps.list
      }
    }else {
      newList = []
    }
    this.setState({
      list: newList,
      defaultNumber: nextProps.defaultNumber || 3
    })
  }

  onViewMore = (value) => {
    console.log('hhh value = ',value);
    if(value == 'show'){
      this.setState({
        list: this.props.list,
        moreVisible: 'hidden',
      })
    } else {
      this.setState({
        list: this.state.list.slice(0,this.state.defaultNumber),
        moreVisible: 'show'
      })
    }
  }

  render(){

    const { list,moreVisible,defaultNumber } = this.state;

    const titledListItemProps = {
      itemStatus:{
        position: 'absolute',
        left: '50%',
      },
      itemValue:{
        color:'#000',
      }
    }

    const viewMoreStyle = {
      padding:'0.3em',
      border: '1px solid rgb(202, 196, 196)',
      borderRadius: '5px',
    }

    const iconStyle = {
      position: 'relative',
      top: '0.3em'
    }

    return(
      <div>
        {
          list.length > 0 && list.map((item,index) => (
            <div key={index}>
              <TitledListItem {...item}{...titledListItemProps}/>
             </div>
          ))
        }
        {
          list.length > defaultNumber-1 ?
          <div>
            {
              moreVisible == 'show' ?
              <div style={{backgroundColor: '#fff',textAlign: 'center',padding: '0.5em',}}>
                <span style={viewMoreStyle} onClick={() => this.onViewMore('show')}>
                  <span>查看更多</span>
                  <Icon type='down' style={iconStyle}/>
                </span>
              </div>
              :
              <div style={{backgroundColor: '#fff',textAlign: 'center',padding: '0.5em',}}>
                <span style={viewMoreStyle} onClick={() => this.onViewMore('hidden')}>
                  <span>点击收起</span>
                  <Icon type='up' style={iconStyle}/>
                </span>
              </div>
            }
          </div>
          : null
        }
      </div>
    )
  }
}
