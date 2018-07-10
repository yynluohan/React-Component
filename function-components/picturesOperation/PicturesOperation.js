import React from 'react';
import styles from './picturesOperation.css';
import { Grid,Checkbox,Radio,ImagePicker } from 'antd-mobile';
import {deleteData, query,createRaw,create } from '../../framework/service/index';
import arrowIcon from '../../icons/personal/arrow.png';

class PicturesOperation extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      radioChecked: false,                                   //是否点击全选
      columnNum: props.columnNum ? props.columnNum : 2,     //相册排布几列
      pictureList: [{'name':'upload'}],
      deleteVisible: false,
      pageNum: 1,
      manageVisible: props.manageVisible ? props.manageVisible : false,   //是否展示管理
    }
  }


  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    this.setState({
      deleteVisible:nextProps.deleteVisible,
      manageVisible: nextProps.manageVisible
    })
  }

  queryPictureList = () => {
    query( this.props.apiUrl,{orderBy:'id',sort:'desc',pageNum:this.state.pageNum} ).then(({ code, data }) => {
      console.log('55555555data = ',data)
      let list = this.state.manageVisible == true ? [] : [this.state.pictureList[0]];
      console.log('88888 list = ',list);
      this.setState({
        pictureList: list.concat(data.records)
      })

      for(let i = this.state.pageNum + 1; i <= data.pages; i++){
        console.log('--------------- ',this.state.pageNum);
        query( this.props.apiUrl,{orderBy:'id',sort:'desc',pageNum:i} ).then(({ code, data }) => {
          this.setState({
            pictureList: this.state.pictureList.concat(data.records),
            pageNum: this.state.pageNum + 1
          })
        })
      }
    })
  }

  componentDidMount() {
    if(this.manageVisible == true){
      this.setState({
        pictureList:[]
      })
    }
    //查询api，获得相册数据列表
    this.queryPictureList()
  }


  //选择单个图片时
  onChange = (e,index) => {
    console.log('0000000 index=',index)
    const pictureList = this.state.pictureList;
    pictureList[index].checked = e.target.checked;
    this.setState({
      pictureList,
      pageNum:1
    })
  }

  //点击全选时，将相册所有的checked设置为true
  onAllChange = (e) => {
    let list = this.state.pictureList;
    list.length > 0 && list.map((item,index) => {
      list[index].checked = e.target.checked
    })
    this.setState({
      radioChecked: e.target.checked == true ? true : false,
      pictureList: list
    })
  }

  //点击删除调用api，更新相册列表
  onDelete = () => {
    let deleteList = []
    const pictureList = this.state.pictureList;

    pictureList.length > 0 && pictureList.map((item,index) =>{
      if(item.checked != undefined && item.checked == true && index != 0){
        deleteList.push(item);
      }
    })
    console.log('-------------= deleteList = ',deleteList);
    let ids = [];
    deleteList.map(item =>{
      ids.push(item.id)
    })
    if(deleteList.length > 0){
      deleteData(this.props.deleteUrl,{ids}).then(({ code, data }) => {
        console.log('data = ',data)
        if(code == 200){
          let list = this.state.pictureList;
          for(let i = 0; i < list.length; i++){
            for(let j = 0; j < ids.length; j++){
              if(list[i].id == ids[j]){
                list.splice(i,1)
              }
            }
          }
          this.setState({
            pictureList: list,
            radioChecked: false,
            deleteVisible: false
          })
        }
      })
    }else{
      this.setState({
        radioChecked: false,
      })
    }
  }

  onImageChange = (value) => {
    console.log('777 value = ',value);
    const url = value[0].url;
    console.log('111111 url = ',url)
    createRaw('/api/upload64',url).then(({ code,data }) => {
      console.log('7777778888 data = ',data);
      if(code == 200){
        const imgUrl = data.url;
        create('/api/gallery/galleries',{url:imgUrl}).then(({ code,data }) =>{
          if(code == 200){
            this.setState({
              pageNum: 1
            })
            query( this.props.apiUrl,{orderBy:'id',sort:'desc'} ).then(({ code, data }) => {
              console.log('55555555data = ',data)
              console.log('kkkkkkkkkkkkk this.state.pictureList = ',this.state.pictureList)
              const firstList = this.state.manageVisible == true ? [] : [this.state.pictureList[0]] ;
              console.log('0000000000000 firstList = ',firstList);
              this.setState({
                pictureList: firstList.concat(data.records)
              })
            })
            this.queryPictureList()
          }
        })
      }
    })
  }

  onManagePhotos = () => {
    this.setState({
      deleteVisible: true
    })
  }

  onCancelMange = () => {
    this.setState({
      deleteVisible: false
    })
  }

  render(){

    const { radioChecked,pictureList,columnNum,deleteVisible,manageVisible } = this.state;
    const { goBack } = this.props;

    console.log('===========pictureList =',pictureList);
    return (
      <div>
        <div className={styles.titleStyle}>
          <img src={arrowIcon} className={styles.titleIcon} onClick={goBack}/>
          <div className={styles.titleText}>
            相册
            { manageVisible == false && deleteVisible ==false ? <span onClick={this.onManagePhotos}>管理</span> : null }
            { deleteVisible == true ? <span onClick={this.onCancelMange}>取消</span> : null }
          </div>
        </div>
        <div style={{paddingTop: '3.5em',overflowY: 'scroll',paddingBottom: '5em',backgroundColor:'#fff'}}>
            {
              pictureList.length > 0 ?
              <Grid data={pictureList}
                columnNum={3}
                renderItem={(renderItem,index) => (
                  <div>
                    {
                      index == 0 && manageVisible == false ?
                      <div className={styles.imagePicker}>
                        <ImagePicker
                            files={[]}
                            onChange={this.onImageChange}
                            onImageClick={(index, fs) => console.log('111111',index, fs)}
                            multiple={true}
                        />
                      </div>
                      :
                      <div style={{backgroundImage:`url(${renderItem.url})`}} className={styles.photoItem}>
                        {
                          deleteVisible == true ?
                          <Checkbox.CheckboxItem
                           onChange={(e) =>this.onChange(e,index)}
                           checked={ renderItem.checked }
                           />
                           : null
                         }
                      </div>
                    }
                  </div>

                )}
              hasLine={false}
           />
           : null
         }

         {
           deleteVisible == true ?
           <div className={styles.allSelect}>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <div className={styles.allSelectRadio}>
              <Checkbox.AgreeItem onChange={(e) =>this.onAllChange(e)} checked={radioChecked}/>
              <span style={{marginLeft: '0.5em',fontSize: '0.28rem',display:'inline-block',marginTop: '5px',position: 'relative',left: '1.5em'}}>全选</span>
              <span className={styles.deleteButton} onClick={() =>this.onDelete()}>
                删除
              </span>
            </div>
          </div>
        </div>
        : null
       }

      </div>
    </div>
    )
  }
}

export default PicturesOperation
