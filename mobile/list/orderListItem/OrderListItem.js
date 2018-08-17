import React from 'react';

class OrderListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onClick = (value) => {
    console.log('uuuuuuu = value ',value);
    if(value){
      window.location.href = `#${value}`
    }
  }

  render(){

    const { icon,title,subtitle,orderNumber,type,timestamp,action,place,distance } = this.props;

    const itemHeader = {
      display: 'flex',
      justifyContent: 'space-between',
      ...this.props.itemHeader
    }

    const itemSection = {
      display: 'flex',
      padding: '1em 0',
      ...this.props.itemSection
    }

    const itemSectionImg = {
      backgroundImage: `url(${icon})`,
      width:'8rem',
      height:'5rem',
      overflow:'hidden',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize:'cover',
      ...this.props.itemSectionImg
    }

    const itemFooter = {
      display: 'flex',
      justifyContent: 'space-between',
      ...this.props.itemFooter
    }

    const itemContent = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginLeft: '1em',
      ...this.props.itemContent
    }

    const placeStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      ...this.props.placeStyle,
    }

    const itemPlace = {
      ...this.props.itemPlace
    }

    const itemDistance = {
      ...this.props.itemDistance
    }

    const sectionTitle = {
      ...this.props.sectionTitle
    }

    const sectionSubtitle = {
      ...this.props.sectionSubtitle
    }

    return (
      <div style={{backgroundColor: '#fff',marginBottom: '5px',paddingLeft: '1em'}} onClick={() =>this.onClick(action)}>
        {
          type || orderNumber ?
          <div style={itemHeader}>
            <div>{ type }</div>
            <div>{ orderNumber }</div>
          </div>
          : null
       }

        <div style={itemSection}>
          <div style={itemSectionImg}></div>
          <div style={itemContent}>
            <div style={sectionTitle}>{title}</div>
            <div style={sectionSubtitle}>{subtitle}</div>
            <div style={placeStyle}>
              <span style={itemPlace}>{place}</span>
              <span style={itemDistance}>{distance}</span>
            </div>
          </div>

        </div>

        {
          timestamp ?
          <div style={itemFooter}>
            <div>{timestamp}</div>
            {itemFooter ? <div>取消预约</div> : null}
          </div>
         : null
      }

      </div>
    )
  }

}

export default OrderListItem;
