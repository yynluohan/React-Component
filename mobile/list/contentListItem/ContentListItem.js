import React from 'react';

class ContentListItem extends React.Component {

   constructor(props){
     super(props);
     this.state = {

     }
   }

   onClick = (value) => {
     const id = this.props.id ? this.props.id : '';
     if(value){
       window.location.href = `#${value}?id=${id}`
     }
   }

   render(){

     const { image,title,content,stats,route } = this.props;
     const icon = stats && stats.icon ? stats.icon : '';
     const record = stats && stats.record !=undefined ? stats.record  : '';

     const style = {
        display:'flex',
        marginBottom:'2px',
        backgroundColor:'#fff',
        padding: '1em',
        ...this.props.style,
    }

    const itemImage = {
      backgroundImage: `url(${this.props.image})`,
      width: '90px',
      height:'90px',
      overflow:'hidden',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      ...this.props.itemImage
    }

    const itemContent = {
      display:'flex',
      marginLeft:'1em',
      flexDirection:'column',
      width:'100%',
      ...this.props.itemContent
    }

    const itemTitle = {
      ...this.props.itemTitle
    }

    const itemFooter = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...this.props.itemFooter
    }

    const itemIcon =  {
      width:'30px',
      height:'30px',
      ...this.props.itemIcon
    }

    const itemText = {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      ...this.props.itemText
    }

    const itemInfoButton = {
      border:'1px solid #000',
      display:'inline-block',
      padding: '0.1em 0.5em',
      borderRadius: '10px',
      ...this.props.itemInfoButton
    }


     return (
       <div>
         <div style={style} onClick={() => this.onClick(route)}>
            <div style={itemImage}></div>
            <div style={itemContent}>
              <div style={itemTitle}>{title}</div>
              <div style={itemText}>{content}</div>
              <div style={itemFooter}>
                <div>
                  <img src={icon} style={itemIcon}/>
                  <span>{record}</span>
                </div>
                <div style={itemInfoButton} onClick={() => this.onClick(route)}>详情</div>
              </div>
            </div>
         </div>
      </div>
     )
   }

}

export default ContentListItem
