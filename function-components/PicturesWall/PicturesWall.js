import { Upload, Icon, Modal } from 'antd';
import token from '../../framework/utils/token';
import env from '../../env';
import { baseUrl } from '../../env';
import styles from './picturesWall.css';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    action: `${baseUrl}/api/uploadx?blur=false`,
    previewImage: '',
    number: this.props.number ? this.props.number : 1, //默认最多上传一张图片，也可传入参数
    fileList: this.props.fileList ? this.props.fileList : [],
  };

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    this.setState({
      fileList: nextProps.fileList,
    })
  }

  onSelect(fileList) {
    this.props.onSelect(fileList) //使用组件时传入onSelect()方法接收组件导出的数据
  }

  handleCancel = () => this.setState({ previewVisible: false })

  //点击视角查看图片
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  //onChange事件改变上传的图片列表
  handleChange = ({ fileList }) => {
    this.setState({
       fileList,
       uploadStyle:{
         width: 300,
         height:300
       }
      }),
    this.props.onSelect(fileList)
  }

  //点击移除图标的时候调用
  onRemove = (file) =>{
    console.log('qqqqqqq file = ',file);
    this.state.fileList.map((item,index) =>{
      if(item.url == file.url){
        const newFileList = this.state.fileList.splice(index,1);
        this.setState({
          fileList: newFileList
        })
      }
    })
  }


  render() {
    const { previewVisible, previewImage } = this.state;
    const header = {
      Authorization: 'Bearer ' + token.get(),
    }

    return (
      <div className={styles.uploads}>
        <Upload
          name='file'
          action={this.state.action}
          headers={header}
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove = {this.onRemove}
          className={styles.uploader}
        >
        {
          this.state.fileList.length >= this.state.number ?
          null
          :
          <div>
            <Icon type="plus" />
            <div>Upload</div>
          </div>
        }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
