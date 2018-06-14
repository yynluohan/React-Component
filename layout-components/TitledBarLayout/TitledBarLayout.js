import React from 'react';
import {} from 'antd';
import styles from './TitledBarLayout.css';

/*此组件的功能是显示一个边框、加上个title*/
const TitledBarLayout = ({
  children,
  title,
  padding,
  style=styles.style,
  titleStyle = styles.titleStyle,
  childrenStyle = styles.childrenStyle
}) => {

  return (
    <div className={style} style={{padding}}>
      <div className={titleStyle}>
        <span>当前位置：</span>
        {title}
      </div>
      <div className={childrenStyle}>
        {children}
      </div>
    </div>
  );
};

TitledBarLayout.PropTypes ={
};

export default TitledBarLayout;
