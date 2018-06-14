import React from 'react';
import { Menu,Dropdown,Button,Icon,notification,Table,Modal,Input,Pagination  } from 'antd';
import Filter from './Filter';

class Selection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[],              //list为表格数据源
      selectedData:[],      //选择表格某项或者多项的时候，用于组件导出
      selectedRowKeys:[],
      type: this.props.type ? this.props.type : 'radio',    //表格数据限制单选（也可传入'checkbox'设置多选）
      modalTitle: this.props.modalTitle ? this.props.modalTitle : '选择客户',  //modal框的标题
      total:1,
      pageSize: 10,
      size: this.props.size ? this.props.size : 'default',  //表格类型，也可传入'small'
      getDisabled: this.props.getDisabled ? this.props.getDisabled : false,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    this.setState({
      getDisabled: nextProps.getDisabled,
    })
  }

  //展示modal
  showModal = () => {
    this.setState({
      visible: true,
    });
    //调用api，获取数据（method表示传进来的方法，比如get，post方法），apiUrl表示调用的api
     this.props.method(this.props.apiUrl).then(({ code, data,message }) => {
       console.log('GGG dATA = ',data);
       let listData = [];
       if(data.records){      //判断api是否分页处理
         listData = data.records
       }else{
         listData=data
       }
       this.setState({
         list:listData,
         total:data.total,
         pageSize: data.size
       });
     })
  }

  //点击取消的时候，隐藏modal
  handleCancel = () => {
    this.setState({
      visible: false,
      selectedRowKeys:[]
    });
  }

  //点击确定时，导出所选数据
  handleOk = () => {
    this.setState({
      visible: false,
      selectedRowKeys:[]
    });
    this.props.selected(this.state.selectedData)
  }

  //查询功能
  onSearch = (e) => {
    //调用api，更新表格数据
    this.props.method(this.props.apiUrl,{...e}).then(({ code, data,message }) => {
      let listData = [];
      if(data.records){
        listData = data.records
      }else{
        listData=data
      }
      this.setState({
        list:listData,
        total: data.total
      });
    })
  }

  //选择表格项的时候，获取并更新selectedData
  onSelect = (data) =>{
    console.log('1111 data = ',data);
    this.setState({
      selectedData:data.selectedRows,
      selectedRowKeys: data.selectedRowKeys
    });
  }

  onPageChange = (e) => {
    console.log('e == ',e)
    this.props.method(this.props.apiUrl,{pageNum: e}).then(({ code, data,message }) => {
      let listData = [];
      if(data.records){
        listData = data.records
      }else{
        listData=data
      }
      this.setState({
        list:listData,
      });
    })
  }

  render() {

    //注：columns为表格表头；fields为搜索字段；intlPrefix为国际化；
    const { columns,fields,intlPrefix,butName } = this.props;
    const { list,selectedRowKeys,type,modalTitle,total,pageSize,size,getDisabled, } = this.state;


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('7777 selectedRows = ',selectedRows);
        console.log('8888 selectedRowKeys = ',selectedRowKeys)
        const data = {
          selectedRowKeys,
          selectedRows,
        }
        this.onSelect(data)
      },
      selectedRowKeys,
      type: type
    }

    return (
      <span>
        {
          this.props.isButton && this.props.isButton == true ?
          <Button onClick={this.showModal} disabled={getDisabled}>{butName ? butName : '请选择'}</Button>
          :
          <a onClick={this.showModal} style={{color:'#558eea'}}>{butName ? butName : '请选择'}</a>
        }
        <Modal
            title={modalTitle}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={1000}
          >
            <div>
              <div style={{marginBottom: '1.5em'}}>
                <Filter    //查询控件
                  fields={fields}
                  intlPrefix={intlPrefix}
                  onSearch={(e) =>this.onSearch(e)}
                />
              </div>
              <Table columns={columns} rowSelection={rowSelection} dataSource={list} bordered={true} pagination={false} size={size}/>
              <div style={{textAlign: 'right',marginTop: '1em'}}>
                <Pagination defaultCurrent={1} total={total} pageSize={pageSize} onChange={(e) => this.onPageChange(e)}/>
              </div>
          </div>
        </Modal>
      </span>
    )
  }
}

export default Selection
