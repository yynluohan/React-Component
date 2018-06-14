import React from 'react';
import { Menu,Dropdown,Button,Icon,notification,Popconfirm } from 'antd';

class TableBatchActionWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

 //单击事件
  handleMenuClick = (e)=>{
    console.log('selected e = ',e)
     let action = '';
     let method = '';
     this.props.memuList.map((item,index) =>{
       if(item.key == e){
         action = item.action;   //拿到传入进来的action(即api)
         method = item.method;   //拿到点击传入的method(即方法类型)
       }
     })
     method(action,{ids:this.props.ids}).then(({ code, data,message }) => {  //method为传进来的方法
        if(code == 200){
          notification['success']({message: '操作成功'})
          const resultData = {
            code,
            data
          }
          this.props.onResult(resultData);   //导出api返回的data和code
          this.setState({
            ids:[]
          })
        }else{
          notification['error']({message})
        }
     })
 }

  render() {

    const { memuList,ids } = this.props;

    const menu = (
      <Menu>
          {
            memuList && memuList.length > 0 && memuList.map((item =>(
              <Menu.Item key={item.key}>
                <Popconfirm title={`确定要${item.value}吗?`} onConfirm={() =>this.handleMenuClick(item.key)}>
                  <div>{item.value}</div>
                </Popconfirm>
              </Menu.Item>
            )))
          }
      </Menu>
    );

    return (
      <span>
        <Dropdown overlay={menu} disabled={ids.length > 0 ? false : true}>
          <Button>批量操作<Icon type="down"/></Button>
        </Dropdown>
      </span>
    )
  }
}

export default TableBatchActionWrapper
