import React from 'react';
import LzEditor from 'react-lz-editor';

export default class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: typeof(props.value) === 'object' ? props.value[0].content : props.value,
      responseList: []
    }
    this.receiveHtml = this.receiveHtml.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  receiveHtml(content) {
    console.log("recieved HTML content", content);
    this.setState({responseList:[]});
    if(this.props.format === 'PLURAL'){
      this.props.onChange([ { content } ]);
    }else{
      this.props.onChange(content);
    }
  }
  componentDidMount() {}
  onChange(info) {
    console.log("onChange:", info);
    // console.log("upload onChange this.state.files",this.state.files,info)
  }
  render() {
    // const uploadConfig = {
    //   QINIU_URL: "/api/fs/uploadfile", //上传地址
    //   QINIU_IMG_TOKEN_URL: "", //请求图片的token
    // }
    const uploadProps = {
      action: "/api/fs/uploadfile",
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: (file) => { //自定义上传参数
        return {
          Authorization: "your Authorization",
        }
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }

    return (
      <div>
        <LzEditor
          active={true}
          video={false}
          audio={false}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadProps={ uploadProps }
          // uploadConfig={uploadConfig}
        />
      </div>
    );
  }
}