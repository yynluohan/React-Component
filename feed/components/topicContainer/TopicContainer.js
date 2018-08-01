import React from 'react';
import { createForm } from 'rc-form';
import { Modal,TextareaItem } from 'antd-mobile';
import { create } from 'kqd-utils/lib/services';
import CollectionCom from '../../common/collectionComponent/Index';
import LikeComponent from '../../common/likeComponent/LikeComponent';
import comments from '../../icons/comment.png';

class TopicContainer extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        collectionStatus: false,
        likeStatus: false,
        topic: props.topic ? props.topic : '',
        topicId: props.topicId ? props.topicId : '',
        visible: false,
        content: '',
      }
  }

  //点击收藏
  addCollection = () => {
      create('/api/cms/favorites',{topic: this.state.topic,topicId: this.state.topicId}).then(({ code, data }) => {
        if(code == 200){
          this.setState({
            collectionStatus:this.state.collectionStatus == false ? true : false
          })
          if(this.state.collectionStatus == true){
            ToastTips('收藏成功', 2000, null);
          }else {
            ToastTips('取消收藏成功', 2000, null);
          }
        }
      })
  }

  //点击点赞
  addLike = () => {
    create('/api/cms/follower',{topic: this.state.topic,topicId: this.state.topicId}).then(({ code, data }) => {
      if(code == 200){
        this.setState({
          likeStatus:this.state.likeStatus == false ? true : false
        })
        if(this.state.likeStatus == true){
          ToastTips('点赞成功', 2000, null);
        }else {
          ToastTips('取消点赞成功', 2000, null);
        }
      }
    })
  }

  //点击评论
  onComment = () => {
    this.setState({
      visible: true,
    })
  }

  //点击评论确定
  onClose = () => {
    this.setState({
      visible:false
    })
    create('/api/cms/evaluation',{topic: this.state.topic,topicId: this.state.topicId,content:this.state.content}).then(({ code, data }) => {
      if(code == 200){
        ToastTips('评论成功', 2000, null);
      }
    })
  }

  //取消评论
  onCancel = () => {
    this.setState({
      visible:false
    })
  }

 //输入文字更新content
  onTextChange = (value) =>{
    console.log('hhhhhh value = ',value);
    this.setState({
      content: value
    })
  }

  render(){

    const { collectionStatus,likeStatus,visible  } = this.state;
    const { getFieldProps,getFieldsValue,validateFields } = this.props.form;

    const style = {
      display: 'flex',
      justifyContent: 'space-around',
      ...this.props.style,
    }

    const itemStyle = {
      display: 'flex',
      alignItems: 'center',
      width: `${100/3}%`,
      textAlign: 'center',
      justifyContent: 'center',
      borderRight:'1px solid rgb(198, 209, 221)',
      margin: '0.5em',
      ...this.props.itemStyle
    }

    const itemName = {
      ...this.props.itemName
    }

    const itemImage = {
      width:'1.5em',
      height: '1.5em',
      borderRadius: '50%',
      marginRight: '0.3em',
      ...this.props.itemImage
    }

    const itemLikeStyle = {
      display: 'flex',
      alignItems: 'center',
      width: `${100/3}%`,
      textAlign: 'center',
      margin: '0.5em',
      ...this.props.itemLikeStyle
    }

    const commentModalProps = {
      visible: visible
    }

    return(
      <div style={style}>
        <div style={itemStyle}>
          <CollectionCom key={1} onSwitch={() => this.addCollection()} status={collectionStatus}/>
          <span style={itemName}>收藏</span>
        </div>
        <div style={itemStyle} onClick={() =>this.onComment()}>
          <img src={comments} style={itemImage}/>
          <span style={itemName}>评论</span>
        </div>
        <div style={itemLikeStyle}>
          <LikeComponent key={1} onSwitch={() => this.addLike()} status={likeStatus}/>
          <span style={itemName}>点赞</span>
        </div>

        {/*点击评论弹出模块框*/}
        <Modal
         visible={this.state.visible}
         transparent
         maskClosable={false}
         footer={[
           { text: '取消', onPress: () => { this.onCancel()}},
           { text: '确定', onPress: () => { this.onClose()}},
           ]}
       >
         <div style={{ height: '200px'}}>
         <TextareaItem
            {...getFieldProps('content')}
            placeholder="我也说一句..."
            labelNumber={5}
            autoHeight
            value={this.state.content}
            style={{fontSize: '0.26rem',paddingRight: '0.5em'}}
            onChange={(e) => this.onTextChange(e)}
          />
         </div>
       </Modal>

      </div>
    )
  }

}

export default createForm()(TopicContainer);
