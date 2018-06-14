import React from 'react';
import {Row, Col} from 'antd';
import styles from './MultiseriateLayout.css';

//此组件功能： 对子组件进行flex布局，可根据需要传入几列。
const MultiseriateLayout = ({
  listNumber,
  children,
  border,
}) => {

  const createList = (children) => children.length >= 0 && children && children.map((item,index) => {
      return (
        <Col span={24/listNumber} key={index} style={{margin: '8px 0'}}>{item}</Col>
      )
  });

  return(
    <div className={styles.style} style={{border}}>
      <Row type='flex'align='top' justify="start" gutter={16}>
          {createList(children)}
      </Row>
    </div>
  )
};

export default MultiseriateLayout;
