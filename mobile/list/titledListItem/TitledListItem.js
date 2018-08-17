import React from 'react';

class TitledListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      type: props.type ? props.type : 'column'
    }
  }

  render(){

    const { title,subtitle,value,status,icon } = this.props;
    const { type } = this.state;

    //纵向
    const columnStyle = {
      display: 'flex',
      justifyContent:'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #f2f2f2',
    }

    const itemFirst = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      marginBottom: '0.3em',
      ...this.props.itemFirst,
    }

    const itemTitle = {
      display: 'inline-block',
      ...this.props.itemTitle
    }

    const itemSecound = {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      ...this.props.itemSecound
    }

    //横向
    const itemFlex = {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      alignItems: 'center',
      ...this.props.itemFlex
    }

    const itemImgFlex = {
      display: 'flex',
      alignItems: 'center',
      ...this.props.itemImgFlex
    }

    const itemImg = {
      width: '2.5rem',
      height: '2.5rem',
      ...this.props.itemImg
    }

    const itemTransTitle = {
      marginBottom: '0.756em',
      ...this.props.itemTransTitle
    }

    const itemTransOderNumber = {
      fontSize: '0.26rem',
      ...this.props.itemTransOderNumber
    }

    const itemStatus = {
      ...this.props.itemStatus
    }

    const itemValue = (value) =>{
      return {
        color: value >= 0 ? '#F60303' : '#F39D0D',
        ...this.props.itemValue
      }
    }


    const createItem = () => {
      if(type == 'column'){
        return (
          <div style={columnStyle}>
            <div style={itemFirst}>
              <div style={itemTitle}>{title}</div>
              <div>{subtitle}</div>
            </div>
            <div style={itemSecound}>
              <div style={itemStatus}>{status}</div>
              <div style={itemValue(value)}>{value}</div>
            </div>
          </div>
        )
      }
      if(type == 'line'){
        return (
          <div style={ itemFlex }>
            <div style={itemStatus}>{status}</div>
            <div style={itemImgFlex}>
              { icon ? <img src={icon} style={itemImg}/> : null }
              <div style={{marginLeft: '1.2em'}}>
                  <div style={itemTransTitle}>{ title }</div>
                  <div style={itemTransOderNumber}>{ subtitle }</div>
              </div>
            </div>
            <div style={itemValue(value)}>{value}</div>
          </div>
        )
      }

    }


    return (
      <div style={{ paddingBottom: '2px',padding: '0.5em',backgroundColor:'#fff'}}>
        { createItem() }
      </div>
    )
  }

}

export default TitledListItem;
