import React from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'dva';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_CHILD = TreeSelect.SHOW_CHILD;

class SelectTreeTranch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'selectTreeTranch/index',
      payload: {
        api: this.props.api,
      },
    });
  }

  onSelect(data) {
    this.props.onSelect(data); // 使用组件时传入onSelect()方法接收组件导出的数据
  }

  state = {
    value: this.props.value ? this.props.value : [], // 编辑操作的时候，要将查到的数据封装成Tree结构，传value进来
  }

  onChange = (value) => {
    this.setState({ value });
    const teamListData = [];
    const selectedData = [];
    value && value.map((item, index) => {
      teamListData.push(item.value);
    }); // 取出需要的值
    teamListData.map((item, index) => {
      const str = item.split('-');
      const teamId = str[0];
      const staffId = str[1];
      selectedData.push({ teamId, staffId }); // 取得选择后的数据
    });
    this.props.onSelect(selectedData);
  }
  render() {
    const { teamList } = this.props.selectTreeTranch;
    const teamListData = [];
    for (let i = 0; i < teamList.length; i++) {
      const staffList = [];
      for (let j = 0; j < teamList[i].staffs.length; j++) {
        const label = teamList[i].staffs[j].staffName;
        const value = `${teamList[i].teamId}-${teamList[i].staffs[j].staffId}`;
        const key = `${teamList[i].teamId}-${teamList[i].staffs[j].staffId}`;
        staffList.push({ label, value, key });
      }
      teamListData[i] = {
        label: teamList[i].teamName,
        value: teamList[i].teamId,
        key: teamList[i].teamId,
        children: staffList,
      }; // 把api返回的数据封装成符合组件需要的。
    }

    const tProps = {
      treeData: teamListData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      treeCheckStrictly: true,
      multiple: true,
      style: {
        width: 300,
      },
    };
    return <TreeSelect {...tProps} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectTreeTranch: state.selectTreeTranch,
  };
}

export default connect(mapStateToProps)(SelectTreeTranch);
