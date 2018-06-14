import React from 'react';
import { Form, Input, Button, Row, Col, Spin, Table, Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';

const TableInSpin = ({ loading, current = 1, total, pageSize = 10, rowKey = record => record.id,
   columns = [], list = [], intlPrefix='', onPageChange,bordered=false,
   rowSelection }) => {

  const createByColumns = (columns) => columns.length>0 && columns.map((item, index) => {
    if(typeof(item) === 'object') {
      return item;
    } else {
      return ({
        title: <FormattedMessage id={`${intlPrefix}${item}`} />,
        dataIndex: item,
        key: item
      });
    }
  })

  const paginate = () => {
    if(total && onPageChange) {
      return <Pagination  className="ant-table-pagination" current={current} total={total} pageSize={pageSize}  onChange={onPageChange} />;
    }
  }

  return (
    <Spin spinning={loading}>
      <Table dataSource={list} columns={createByColumns(columns)} pagination={false}
              rowKey={rowKey} rowSelection={rowSelection} bordered={bordered}/>
      {paginate()}
    </Spin>
  )
};

export default Form.create()(TableInSpin);
