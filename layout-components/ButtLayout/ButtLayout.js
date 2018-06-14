import React from 'react';
import {} from 'antd';
import styles from './ButtLayout.css';

/*此组件功能，将传入的组件周围设置margin，对组件的布局效果更佳*/
const ButtLayout = ({
  padding='12px 5px',
  margin='12px 0',
  border='1px solid #E6E6E6',
  borderBottom='1px solid #E6E6E6',
  style=styles.style,
  children,
}) => {

return (
    <div className={style} style={{padding,border,margin,borderBottom}}>
      {children}
    </div>
  );
};

ButtLayout.PropTypes ={
};

export default ButtLayout;
