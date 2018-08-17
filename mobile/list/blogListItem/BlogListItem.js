import React from 'react';

class BlogListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onClick = (value) => {
    const id = this.props.id ? this.props.id : '';
    console.log('iiiiii');
    if(value){
      window.location.href = `#${value}?id=${id}`
    }
  }

  render(){

    const { icon,name,subtitle,content,lives,tags,stats,route,livesImage } = this.props;

    const style = {
      display: 'flex',
      backgroundColor:'#fff',
      padding: '0.5em',
      ...this.props.style
    }

    const itemAvatar = {
      width: '2.68rem',
      height: '2.68rem',
      borderRadius:'0.2em',
      ...this.props.itemAvatar
    }

    const itemSection = {
      display: 'flex',
      flexDirection:'column',
      width:'100%',
      marginLeft: '1em',
      ...this.props.itemSection
    }

    const itemName = {
      fontWeight: 'bolder',
      marginBottom:'0.5em',
      ...this.props.itemName
    }

    const itemSubtitle = {
      marginBottom:'0.5em',
      ...this.props.itemSubtitle
    }

    const itemContent = {
      ...this.props.itemContent,
    }

    const itemLives = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'space-between',
      margin: '1em 0',
      ...this.props.itemLives
    }

    const itemTag =  {
      display:'flex',
      flexWrap: 'wrap',
      color: 'rgba(194, 131, 36, 1)',
      ...this.props.itemTag
    }

    const itemStats = {
      margin: '0.3em 0',
      marginRight: '1em',
      ...this.props.itemStats
    }

    const statsInfo = {
      float: 'right',
      ...this.props.statsInfo
    }

    const statsImg = {
      width: '1.2rem',
      height: '1.2rem',
      marginRight:'0.5em',
      ...this.props.statsImg
    }


    const liveStyle = (value) => {
      return {
        width: '5rem',
        height:'5rem',
        borderRadius: '0.2em',
        backgroundImage: `url(${value})`,
        overflow:'hidden',
        backgroundPosition:'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        ...this.props.livesImage
      }
    }

    return (
      <div style={style} onClick={() => this.onClick(route)}>
        <img src={icon} style={itemAvatar}/>
        <div style={itemSection}>
          <div style={itemName}>{ name }</div>
          <div style={itemSubtitle}>{ subtitle }</div>
          <div style={itemContent}>{ content }</div>

          <div style={itemLives}>
            {
              lives && lives.length > 0 && lives.map((item,index) => (
                <div key={index} style={liveStyle(item.url)}></div>
              ))
            }
          </div>

          <div style={itemTag}>
            {
              tags && tags.length > 0 && tags.map((item,index) => (
                <span key={index} style={{marginRight: '1.2em'}}>{item.tagName}</span>
              ))
            }
          </div>

          <div style={{margin: '0.5em 0'}}>
            <span style={{width:'75%'}}>
              {
                stats && stats.length > 0 && stats.map((item,index) => (
                  <span key={index} style={itemStats}>
                    <img src={item.icon} style={statsImg}/>
                    <span>{item.record}</span>
                  </span>
                ))
              }
            </span>
            <span style={statsInfo} onClick={() => this.onClick(route)}>详情</span>
          </div>

        </div>

      </div>
    )
  }

}

export default BlogListItem;
