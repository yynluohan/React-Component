import React from 'react';
import token from '../framework/utils/token';
import { Upload, message, Button, Icon, Modal } from 'antd';
import EduceExcel from './EduceExcel';

class ImportExcel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      typeName: this.props.typeName ? this.props.typeName : '导入',
      fileList: [],
    }
  }

  //展示modal
  onShowModal = () =>{
    this.setState({
      visible: true,
    });
  }

  //点击返回
  handleCancel = () => {
    this.setState({
      visible: false,
      fileList: []
    })
  }

 //点击确定按钮
  handleOk = () =>{
    const data = this.state.fileList;
    if(data.length == 0){
      message.error('上传文件不能为空');
      return
    }
    this.props.onSelected(data)   //传入onSelected方法接收数据
    this.setState({
      visible: false,
      fileList: [],
    })
  }

  //更新fileList的状态
  selected = (e) => {
    console.log('GGG E = ',e);
    this.setState({
      fileList: e.fileList
    })
  }

  render() {

    const func = (e) => {
      this.selected(e)
    }

    const props = {
      name: 'file',
      showUploadList: false,
      action: this.props.baseUrl + '/api/fs/uploadfile',
      headers: {
        Authorization: 'Bearer '+ this.props.getToken,
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          if(info.fileList.length > 1){
            info.fileList.splice(0,1);   //这里限制只能传入一个文件
          }
          if(info.fileList[0].response.data.extensionName != 'xlsx'){
            message.error('请上传excel表格')
          } else{
            message.success(`${info.file.name} file uploaded successfully`);
            ((info) =>this.selected(info) )
            func(info)
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const { typeName,visible,fileList } = this.state;

    return (
      <span>
        <Button type="primary" onClick={this.onShowModal}>{typeName}</Button>
        <Modal
          width={700}
          title = '导入'
          visible={visible}
          onOk= {this.handleOk}
          onCancel={this.handleCancel}
          style={{textAlign: 'center'}}
          >
          <div style={{marginBottom: '2em'}}>
            <EduceExcel
              name={this.props.name}
              apiUrl={this.props.apiUrl}
              size='large'
              queryStrExport={this.props.queryStrExport ? this.props.queryStrExport : ''}
            />
          </div>
          <Upload {...props}>
           <div style={{marginLeft: '0.6em'}}>
            <Button size='large'>
              <Icon type="upload"/> {typeName}
            </Button>
          </div>
          </Upload>
          {
            fileList.length > 0 ?
              <div style={{marginTop: '2em'}}>
               <a href={fileList[0].response.data.url}>{fileList[0].name}</a>
              </div>
              :''
          }
          <div style={{marginTop: '2em',textAlign:'center'}}>
            注意：导入的文件是从下载导如的模板里选择，下载模板之后，填写客户信息，再导入。
          </div>
        </Modal>
      </span>
    )
  }
}

export default ImportExcel;
