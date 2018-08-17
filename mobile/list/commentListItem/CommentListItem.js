import React from 'react';

class CommentListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onDelete = (value) => {

  }

  render(){

    const { icon,name,commentName,content,subtitle,API } = this.props;

    const style = {
      display: 'flex',
      backgroundColor: '#fff',
      padding: '0.5em',
      ...this.props.style
    }

    const itemIcon = {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      ...this.props.itemIcon
    }

    const itemName = {
      color: 'rgba(128, 128, 128, 1)',
      ...this.props.itemName
    }

    const itemCommentName = {
      color: 'rgba(166, 166, 166, 1)',
      ...this.props.itemCommentName
    }

    const itemContent = {
      wordWrap:'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      lineClamp: '2',
      ...this.props.itemContent
    }

    const itemContentFirst = {
      wordWrap:'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      lineClamp: '2',
      ...this.props.itemContentFirst
    }

    const itemDelete = {
      ...this.props.itemDelete
    }

    return (
      <div style={style}>
        <img src={icon} style={itemIcon}/>
        <div style={{marginLeft: '1em'}}>
          <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '0.2em'}}>
            <span style={itemName}>{name}</span>
            <span>{subtitle}</span>
          </div>
          {
            commentName ?
            <div style={itemContentFirst}>
              回复 <span style={itemCommentName}>{commentName}</span> ：{content}
            </div>
            :
            <div style={{display: 'flex',justifyContent: 'space-between'}}>
              <span style={itemContent}>{content}</span>
              <span style={itemDelete} onClick={() => this.onDelete(API)}>删除</span>
            </div>
          }
        </div>
      </div>
    )
  }

}

export default CommentListItem;
